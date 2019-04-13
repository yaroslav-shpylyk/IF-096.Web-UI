export interface Journal {
  studentFullName?: string;
  idStudent?: number;
  marks?: [{
    idLesson?: number;
    mark?: number | null;
    dateMark?: string;
    note?: string | null;
    typeMark?: string;
  }];
}
