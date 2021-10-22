import { Api } from '#/packages/api/strapi';
import { Initiative } from '#/types/Initiatives';

class InitiativesService {

  static getInitiatives = () =>
    Api.publicGet<Initiative[]>('initiatives').then((res) => res.data);
}

export default InitiativesService;
