import { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { useLoader } from "../context/loaderContext";
export default function Teacher() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const loader = useLoader();
  const navigate = useNavigate();

  const submitQuestionAndClose = async () => {
    await submitQuestion();
    navigate("/");
  }

  const submitQuestion = async() => {
    loader.setLoading(true);
    const res = await axios.post('/insert-question',{
      "question": question,
      "teacher-answer":answer
    })
    loader.setLoading(false);
  }
    
    

  return (
    <div className="grid gap-[10px] grid-rows-[auto_1fr] w-screen h-screen ">
      <div className="grid place-self-center py-4 font-bold text-4xl">
        Teacher Portal
      </div>
      <div className="grid w-[60%] place-self-center gap-[8px]">
        <div className="grid gap-[8px]">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Question
            </label>
            <input
              type="text"
              onChange={(e) => {
                setQuestion(e.target.value)
              }}
              value={question}
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter the Question"
              required
            />
          </div>

          <div>
            <label
              htmlFor={"answer"}
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Answer
            </label>
            <textarea
            onChange={(e) => {
              setAnswer(e.target.value)
            }}
            value={answer}
              id="answer"
              rows={4}
              className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your answer here..."
            ></textarea>
          </div>
        </div>
        <div className="grid grid-flow-col gap-[8px] w-full h-fit">
          <div onClick={submitQuestionAndClose} className="grid place-self-start text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Submit
          </div>
          <div onClick={submitQuestion} className="grid place-self-end focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Next Question
          </div>
        </div>
      </div>
    </div>
  );
}
