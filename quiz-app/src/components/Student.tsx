import { useEffect, useState } from "react";
import axios from "axios";
import { useLoader } from "../context/loaderContext";
import { Question } from "../types";
import FormAnswer from "./FormAnswer";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../context/popupContext";
export default function Student() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const loader = useLoader();
  const popup = usePopup();
  const navigate = useNavigate();
  const [submittedQuestions, setSubmittedQuestions] = useState(0);

  const loadQuestions = async () => {
    loader.setLoading(true);
    const res = await axios.get("/get-questions");
    console.log(res.data.questions);
    setQuestions(res.data.questions);
    loader.setLoading(false);
  };

  const showPopup = async() => {
    loader.setLoading(true);
    const res = await axios.get("/aggregate");
    popup.updateSimilarity(res.data.aggregate);
    loader.setLoading(false);
    popup.updateStatus(true);
  };

  const addNewSubmittedQuestion = () => {
    setSubmittedQuestions(submittedQuestions + 1);
  };
  
  useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <div className={"grid gap-[10px] grid-rows-[auto_1fr] w-screen h-screen"}>
      <div className="grid place-self-center py-4 font-bold text-4xl">
        Student Portal
      </div>
      <div className={"grid w-[80%] place-self-center gap-[8px]"}>
        {questions.map((question, ind) => (
          <FormAnswer
            execWhenSubmit={addNewSubmittedQuestion}
            key={"quiz-form" + ind}
            question={question}
          />
        ))}
      </div>
      {submittedQuestions >= questions.length && (
        <div className="grid w-[80%] justify-self-center mt-">
          <div
            onClick={showPopup}
            className="grid place-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit your Quiz
          </div>
        </div>
      )}
    </div>
  );
}
