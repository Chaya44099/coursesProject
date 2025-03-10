import { LessonType } from "./lessons";

	
    export class CourseType {
        constructor(
            public id: string,
            public title: string,
            public description: string,
            public teacherId: number,
            public lessons: LessonType[]
            ){}    
    }

