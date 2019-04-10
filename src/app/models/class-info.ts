import { PupilData } from '../models/pupil-info';

export interface ClassInfo {
  classDescription: string;
  className: string;
  classYear: number;
  id: number;
  isActive: boolean;
  numOfStudents: number;
}

export interface ClassData {
  id: number;
  classYear: number;
  className: string;
  classDescription: string;
  isActive: boolean;
  numOfStudents: number;
  pupilList?: PupilData[];
}
