import { Student } from '../models/student';

export interface ClassInfo {
  classDescription: string;
  className: string;
  classYear: number;
  id: number;
  isActive: boolean;
  numOfStudents: number;
  pupilList?: Student[];
}
