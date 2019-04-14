export class SubjectData {
  subjectId: number;
  subjectName: string;
  subjectDescription: string;
  constructor(fields:Object){
    Object.assign(this, fields)
  }
}
