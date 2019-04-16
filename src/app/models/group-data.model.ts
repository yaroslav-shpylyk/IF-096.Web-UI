export class Group {
  id: number;
  classYear: number;
  className: string;
  classDescription: string;
  isActive: boolean;
  numOfStudents: number;
  constructor(fields: any) {
    Object.assign(this, fields);
  }
}
