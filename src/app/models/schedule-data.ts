import { ClassData } from './class-data';
import { LessonData } from './lesson-data';

export class ScheduleData {
    startOfSemester: string;
    endOfSemester: string;
    classId: number;
    className: ClassData;
    mondaySubjects: LessonData[];
    tuesdaySubjects: LessonData[];
    wednesdaySubjects: LessonData[];
    thursdaySubjects: LessonData[];
    fridaySubjects: LessonData[];
    saturdaySubjects: LessonData[];
}
