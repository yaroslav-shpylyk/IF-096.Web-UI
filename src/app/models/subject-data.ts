export class SubjectData {
  subjectId: number;
  subjectName: string;
  subjectDescription: string;
  constructor(fields: any) {
    Object.assign(this, fields);
  }
}
