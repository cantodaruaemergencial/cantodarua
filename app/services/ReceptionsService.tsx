import { Api } from '#/packages/api/strapi';
import { Reception } from '#/types/Receptions';

class ReceptionsService {
  static getPeopleByInitiativeName = (
    startIndex: number,
    limit: number,
    initiativeName: string | undefined,
  ) => {
    const query = {
      start: startIndex,
      limit,
      filter: initiativeName,
    };

    return Api.get<Reception[]>('receptionsByInitiative', query).then((res) => res.data);
  };
}

export default ReceptionsService;
