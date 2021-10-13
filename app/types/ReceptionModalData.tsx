import { Moment } from 'moment';
import { BasePerson } from './People';

export interface ReceptionModalDate {
  open: boolean;
  person: BasePerson;
  callBack: (arg0: Moment) => void;
}
