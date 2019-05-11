export interface SaveMark {
  idLesson: number;
  idStudent: number;
  mark: number | null;
  note: string | null;
  idMark?: number;
}
