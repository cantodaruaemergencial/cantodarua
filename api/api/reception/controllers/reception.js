"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	async findByInitiative(ctx) {
		const knex = strapi.connections.default;
		const filterFromQuery = ctx.query.filter;

		const params = {
			limit: Number(ctx.query.limit),
			offset: Number(ctx.query.start),
			filter: filterFromQuery ? "%" + filterFromQuery + "%" : "%",
			numericFilter: filterFromQuery ? filterFromQuery : "0",
			isFilter: filterFromQuery ? true : false,
			isNumeric: /^\d+$/.test(filterFromQuery),
		};

		const result = await knex.raw(
			"select " +
				"people.Id, people.Preferential, people.Name, people.SocialName, people.CardNumber, " +
				"(select pe1.datetime from person_entrances pe1 where pe1.person = people.id order by pe1.datetime desc limit 1) as LastEntranceDate, " +
				"least(cast((select count(1) from person_entrances pe2 where pe2.person = people.id and date(pe2.datetime) = date(now())) as unsigned),1) as EnteredToday, " +
				"greatest(0, cast((select count(1) from person_entrances pe3 where pe3.person = people.id) as unsigned)) as Entrances " +
				"from receptions " +
				"right join people on receptions.person = people.id " +
				"right join initiatives on receptions.initiative = initiatives.id " +
				"where ( " +
				"people.Id IS NOT NULL and " +
				"   initiatives.InitiativeName like :filter " +
				") " +
				"order by cast(people.CardNumber as unsigned) " +
				"limit :limit offset :offset;",
			params
		);

		ctx.send(result[0]);
	},
};
