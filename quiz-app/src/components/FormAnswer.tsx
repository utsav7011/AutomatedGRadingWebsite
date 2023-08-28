import { useState } from "react";
import { Question } from "../types";
import axios from "axios";
import { useLoader } from "../context/loaderContext";

export default function FormAnswer({ question,execWhenSubmit }: { question: Question,execWhenSubmit: () => void}) {
  const [answer, setAnswer] = useState("");
  const [answered,setAnswered] = useState(false);
  const [similarity,setSimilarity] = useState(0);
  const loader = useLoader();
    const submitAnswer = async() => {
        loader.setLoading(true);
        const res = await axios.post('/update-question',{
            "id": question._id.$oid,
            teacherAnswer: question.teacher_answer,
            studentAnswer: answer
        })
        setAnswered(true);
        setSimilarity(res.data.similarity);
        execWhenSubmit();
        loader.setLoading(false);
    }
  return (
    <div
      className={
        "grid gap-[8px] w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8"
      }
    >
      <div className="grid text-black font-bold text-2xl py-2 justify-self-start align-self-center">
        {question.question}
      </div>
      <div className={"grid"}>
        <label
          htmlFor={"answer"}
          className="grid place-self-start mb-2 text-sm font-medium text-gray-900"
        >
          Your Answer Here
        </label>
        <textarea
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
          value={answer}
          id="answer"
          rows={4}
          className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your answer here..."
        ></textarea>
      </div>
      <div className={"grid grid-flow-col"}>
        <div className="grid place-self-start text-green-600">
            {
                answered && "Similarity: " + similarity.toString()
            }
        </div>
        <div
          onClick={submitAnswer}
          className="grid place-self-end focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit your Answer
        </div>
      </div>
    </div>
  );
}
