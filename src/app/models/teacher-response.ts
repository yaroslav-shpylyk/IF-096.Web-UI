import { TeacherData } from './teacher-data';

export interface TeacherResponse {
  status: {
    code: number;
    message: string
  };
  data: TeacherData[];
}
