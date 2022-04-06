import {Photo} from '..';

export interface Content {
  type: 'photo' | 'text';
  text?: string;
  data?: Photo;
}
