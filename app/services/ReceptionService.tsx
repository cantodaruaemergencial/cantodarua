import { Api } from '#/packages/api/strapi';
import { BasePerson } from '#/types/People';
import { Reception } from '#/types/Reception';
import moment from 'moment';

class ReceptionService {
  static post = async (
    person: BasePerson,
    dateReception: moment.Moment,
    observation: string,
  ) => {
    const body: Reception = {
      person: person.Id,
      initiative: 0,
      ReceptionDate: dateReception.toDate(),
      Observation: observation,
    };

    return Api.post<Reception>('/receptions', body);
  };
}

export default ReceptionService;
