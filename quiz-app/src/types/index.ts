export interface Question{
    question: string,
    _id:{
        $oid:string
    },
    similarity: number,
    student_answer:string,
    teacher_answer:string
}