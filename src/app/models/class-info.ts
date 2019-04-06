import { PupilData } from '../models/pupil-info';

export interface ClassData {
  id: number;
  classYear: number;
  className: string;
  classDescription: string;
  isActive: boolean;
  numOfStudents: number;
  pupilList?: PupilData[];
}
