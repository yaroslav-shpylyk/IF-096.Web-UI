export interface Homework {
  idLesson: number;
  date?: string;
  homework: string | null;
  fileName: string| null;
  fileData?: string;
  fileType?: string;
}
