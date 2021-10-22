"use strict";

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find2(ctx) {
    const knex = strapi.connections.default;

    const personName = ctx.query.personName;
    const initiativeName = ctx.query.initiativeName;

    const params = {
      limit: Number(ctx.query.limit),
      offset: Number(ctx.query.start),
      personName: personName ? "%" + personName + "%" : "%",
      initiativeName: initiativeName ? "%" + initiativeName + "%" : "%",
      numericFilter: personName ? personName : "0",
      isFilter: personName ? true : false,
      isNumeric: /^\d+$/.test(personName),
    };

    const result = await knex.raw(
      "select " +
      "p.Id, p.Preferential, p.Name, p.SocialName, p.CardNumber, " +
      "(select receptions.receptionDate from receptions join initiatives on receptions.initiative = initiatives.id where receptions.person = p.id and initiatives.InitiativeName like :initiativeName order by receptions.receptionDate desc limit 1) as LastEntranceDate, " +
      "least(cast((select count(1) from receptions right join initiatives on receptions.initiative = initiatives.id where receptions.person = p.id and date(receptions.receptionDate) = date(now()) and initiatives.InitiativeName like :initiativeName ) as unsigned),1) as EnteredToday, " +
      "greatest(0, cast((select count(1) from receptions right join initiatives on receptions.initiative = initiatives.id where receptions.person = p.id) as unsigned)) as Entrances " +
      "from people p " +
      "where ( " +
      "(:isFilter = 0) or " +
      "(:isFilter = 1 and :isNumeric = 1 and CardNumber like :numericFilter) or " +
      "(:isFilter = 1 and :isNumeric = 0 and ( " +
      "   Name like :personName " +
      "   or soundex(Name) like concat(soundex(:numericFilter), '%') " +
      "   or SocialName like :personName " +
      "   or soundex(SocialName) like concat(soundex(:numericFilter), '%') " +
      ")) " +
      ")" +
      "order by cast(p.CardNumber as unsigned) " +
      "limit :limit offset :offset;",
      params
    );

    ctx.send(result[0]);
  },

  async create(ctx) {
    const knex = strapi.connections.default;

    let inputEntity = ctx.request.body;
    const nextCardNumber = await knex.raw(
      "select max(cast(cardnumber as unsigned)) + 1 as nextCardNumber from people p"
    );
    if (
      nextCardNumber &&
      nextCardNumber[0] &&
      nextCardNumber[0][0] &&
      nextCardNumber[0][0]["nextCardNumber"]
    ) {
      inputEntity.CardNumber = nextCardNumber[0][0]["nextCardNumber"];
    }
    let outputEntity = await strapi.services.person.create(inputEntity);
    return sanitizeEntity(outputEntity, { model: strapi.models.person });
  },
};
