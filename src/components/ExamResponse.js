import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useHistory, Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../style/ExamResponse.css";

const ExamResponse = () => {
  const { examId, userId } = useParams();
  // userId = "dkumar25212";
  const [array, setArray] = useState([]);
  const [indexRed, setindexRed] = useState(0);
  const [state, setState] = useState({});
  const [stateLength, setstateLength] = useState();
  const db = getDatabase();

  useEffect(() => {
    const dbref = ref(db, `response/` + examId + "/" + userId);
    var data;
    var arr = [];
    onValue(
      dbref,
      (snapshot) => {
        data = snapshot.val();

        let x = Object.keys(data).length;
        setstateLength(x);
        setState(data);
        Object.keys(data).map((id, index) => arr.push(id));
        setArray(arr);
        // console.log(data)
      },
      {
        onlyOnce: true,
      }
    );
  }, [examId, userId, db]);

  // console.log(array);

  const previousQuestion = () => {
    setindexRed((stateLength + indexRed - 1) % stateLength);
  };

  const nextQuestion = () => {
    setindexRed((indexRed + 1) % stateLength);
  };

  return (
    <div id="response" className="row justify-content-md-center">
      <Navbar></Navbar>
      {/* {console.log(array, state)} */}

      <div className="col-8">
        <div className="total-question">
          <h3>Total Number Of Questions = {stateLength}</h3>
        </div>
        {array.length === 0 ? (
          <>Loading..........</>
        ) : (
          <div className="middlehi">
            <ul>
              <h3>
                Q{indexRed + 1}. {state[array[indexRed]].questionStatement}
              </h3>
              <div>
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    id={indexRed + "op1"}
                    name="optradio"
                    disabled
                    value={indexRed + "op1"}
                  />
                  {state[array[indexRed]].option1}
                  <label class="form-check-label" for="radio1"></label>
                </div>
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="radio2"
                    name="optradio"
                    disabled
                    value={indexRed + "op2"}
                  />
                  {state[array[indexRed]].option2}
                  <label class="form-check-label" for="radio2"></label>
                </div>
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="radio2"
                    name="optradio"
                    disabled
                    value={indexRed + "op3"}
                  />
                  {state[array[indexRed]].option3}
                  <label class="form-check-label" for="radio2"></label>
                </div>
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="radio2"
                    name="optradio"
                    disabled
                    value={indexRed + "op4"}
                  />
                  {state[array[indexRed]].option4}
                  <label class="form-check-label" for="radio2"></label>
                </div>
              </div>
              <li>
                Full Marks For This Question: {state[array[indexRed]].marks}
              </li>
              <li>
                Marks Reduction For This Question:{" "}
                {state[array[indexRed]].negative}
              </li>
              <li>Correct Answer: {state[array[indexRed]].answer}</li>
              <li>Given Answer: {state[array[indexRed]].answered}</li>
            </ul>
          </div>
        )}
        <hr></hr>
        <div className="footerhi">
          <button
            id="button1"
            className="btn btn-primary"
            onClick={previousQuestion}
          >
            Previous
          </button>
          <button
            id="button2"
            className="btn btn-primary"
            onClick={nextQuestion}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamResponse;
