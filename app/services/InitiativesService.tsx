import { Api } from '#/packages/api/strapi';
import { Initiative } from '#/types/Initiatives';
import { FieldType, Form, FormSection } from '#/types/Forms';
import { isMoment, Moment } from 'moment';

class InitiativesService {

  static getInitiatives = () =>
    Api.publicGet<Initiative[]>('initiatives').then((res) => res.data);
    static get = async (
      startIndex: number,
      limit: number,
      filter?: {
        addressOrInitiativeName?: string;
        initiativeName?: string;
      },
    ) => {
      const query = {
        start: startIndex,
        limit,
        addressName: filter?.addressOrInitiativeName,
        initiativeName: filter?.initiativeName,
      };  
        const res = await Api.get<Initiative[]>('initiatives', query);
      return res.data;
  };

  static getInitiative = (initiativeId: number) =>
    Api.get<Initiative>(`initiatives/${initiativeId}`).then((res) => res.data);
  static getInitiativeForm = async (initiativeId: number | null): Promise<Form> => {
    let initiative;

    if (initiativeId) {
      initiative = await InitiativesService.getInitiative(initiativeId);
    }

      const sections: FormSection[] = [
      {
        label: 'Dados da Iniciativa',
        fields: [
          {
            property: 'InitiativeName',
            value: initiative?.InitiativeName,
            label: 'Nome da Iniciativa',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
            },
          },
          {
            property: 'Address',
            value: initiative?.Address,
            label: 'Endereço da iniciativa',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
    ];

    return { sections };
  };

  static saveInitiative = async (
    formData: {
      [key: string]: unknown;
    },
    initiativeId?: number | null,
  ): Promise<Initiative> => {
    const body = { ...formData };

    Object.keys(body).forEach((k) => {
      if (isMoment(body[k])) {
        const momentDate: Moment = body[k] as Moment;
        body[k] = momentDate.format('YYYY-MM-DD');
      }
    });

    const saveMethod =
      initiativeId !== null
        ? Api.put<Initiative>(`initiatives/${initiativeId}`, body)
        : Api.post<Initiative>('initiatives', body);

    const { status, data } = await saveMethod;

    if (status !== 200) throw new Error();

    return data;
  };

}

export default InitiativesService;
