import { Student } from './student';
import { MarkData } from './mark-data';

export interface StudentChartMarks {
  studentInfo: Student;
  marks: MarkData[];
}
