export interface TeacherWithClassData {
  avatar: string;
  classes: string[] | [];
  dateOfBirth: string;
  email: string;
  firstname: string;
  id: number;
  journalData:
    | {
        academicYear: number;
        className: string;
        subjectName: string[] | [];
      }[]
    | [];
  lastname: string;
  login: string;
  patronymic: string;
  phone: string;
  subjects: string[] | [];
}
