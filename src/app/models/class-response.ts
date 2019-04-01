import { ClassData } from './class-data';

export interface ClassResponse {
  status: {
    code: number;
    message: string
  };
  data: ClassData;
}
