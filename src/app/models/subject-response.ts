import { SubjectData } from './subject-data';

export interface SubjectResponse {
  status: {
    code: number;
    message: string
  };
  data: SubjectData[];
}
