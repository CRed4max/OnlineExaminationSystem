import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../style/ExamPaper.css";
import { QuestionRadio } from "./QuestionRadio";
import { useHistory } from "react-router-dom";

const ExamPaper = (props) => {
  const userId = props.userId;
  console.log(userId);
  const { examId } = useParams();
  const [currInd, setcurrInd] = useState(0);
  const [array, setArray] = useState([]);
  const [indexRed, setindexRed] = useState(0);
  const [state, setState] = useState({});
  const [responsestate, setresponseState] = useState({});
  const [stateLength, setstateLength] = useState();
  const db = getDatabase();
  const history = useHistory();

  useEffect(() => {
    const dbref = ref(db, `questions/` + examId);
    var data;
    var arr = [];
    onValue(
      dbref,
      (snapshot) => {
        data = snapshot.val();

        let x = Object.keys(data).length;
        setstateLength(x);
        setState(data);
        setresponseState(data);
        Object.keys(data).map((id, index) => arr.push(id));
        setArray(arr);
        // console.log(data)
      },
      {
        onlyOnce: true,
      }
    );
  }, [examId, db]);

  const changeresponseInput = (e) => {
    console.log(responsestate);
    // here sending qid was not possible so qid is sent with variable "name"
    // whereever the need of qid id, I am using "name"
    const { name, value, qid } = e.target;
    console.log(qid, name, value);
    const tempAns = {
      questionStatement: responsestate[name].questionStatement,
      option1: responsestate[name].option1,
      option2: responsestate[name].option2,
      option3: responsestate[name].option3,
      option4: responsestate[name].option4,
      answer: responsestate[name].answer,
      marks: responsestate[name].marks,
      negative: responsestate[name].negative,
      answered: value,
    };

    responsestate[name] = tempAns;
    // setresponseState({ ...responsestate, [responsestate[qid]]: tempAns });

    console.log(responsestate);
  };

  const submitResponse = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure to end test ?")) {
      const dbref = ref(db, "response/" + examId + "/" + userId);
      set(dbref, responsestate);

      const dbref1 = ref(db, "exams/" + examId);
      const dbref2 = ref(db, "student/" + userId + "/" + examId);
      onValue(
        dbref1,
        (snap) => {
          var data = snap.val();
          set(dbref2, data);
        },
        {
          onlyOnce: true,
        }
      );

      setTimeout(() => {
        history.push("/student");
      }, 1000);
    }
    // console.log(examId);
  };

  const previousQuestion = () => {
    document.getElementById(currInd).style.display = "none";
    document.getElementById(
      (stateLength + currInd - 1) % stateLength
    ).style.display = "block";
    setcurrInd((stateLength + currInd - 1) % stateLength);
  };

  const nextQuestion = () => {
    document.getElementById(currInd).style.display = "none";
    document.getElementById(
      (stateLength + currInd + 1) % stateLength
    ).style.display = "block";
    setcurrInd((currInd + 1) % stateLength);
  };

  const handleInputChange = (e) => {
    const [name, value] = e.target;
    console.log(name, value);
  };

  //   console.log(array);
  return (
    <div id="examPaper" className="row justify-content-md-center">
      <Navbar
        emailId={props.emailId}
        profileName={props.profileName}
        profilePhoto={props.profilePhoto}
      ></Navbar>
      {/* <QuestionRadio></QuestionRadio> */}
      {/* {console.log(array, state)} */}

      {/* {console.log(new Date().toISOString().slice(0, 10)); */}
      <div className="d-flex my-2">
        <div className="div1"></div>
        <div
          id="paper"
          className="justify-content-md-center temp111 col-8 bg-light"
        >
          <div className="d-flex bg-warning py-2">
            <div className="col-8">
              <h3>Total Number Of Questions = {stateLength}</h3>
            </div>
            <div className="col-4">
              <Link to={"/giveExam"}>
                <button
                  onClick={submitResponse}
                  className="btn btn-give btn-danger"
                >
                  End Test
                </button>
              </Link>
            </div>
          </div>
          <hr className="my-1"></hr>
          {array.length === 0 ? (
            <>Loading..........</>
          ) : (
            <div>
              {Object.keys(state).map((id, index) => {
                return (
                  <QuestionRadio
                    i={index}
                    id={id}
                    state={state}
                    func={changeresponseInput}
                  ></QuestionRadio>
                );
              })}
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
        <div className="div2"></div>
      </div>
    </div>
  );
};

export default ExamPaper;

// {Object.keys(state).map((id, index) => {
//     return (
//         <ol>
//             <ul>
//                 <h3>{index+1}.{state[id].questionStatement}</h3>
//                 <li>{state[id].option1}</li>
//                 <li>{state[id].option2}</li>
//                 <li>{state[id].option3}</li>
//                 <li>{state[id].option4}</li>
//                 <li>Full Marks For This Question: {state[id].marks}</li>
//                 <li>Marks Reduction For This Question: {state[id].negative}</li>
//             </ul>
//         </ol>
//     )
// })}

//   console.log(array);
// return (
//   <div>
//     <Navbar></Navbar>
//     {/* {console.log(array, state)} */}
//     <div className="d-flex my-2">
//       <div className="col-2"></div>
//       <div id="paper" className="justify-content-md-center col-8 bg-light">
//         <div className="d-flex bg-warning py-2">
//           <div className="col-8">
//             <h3>Total Number Of Questions = {stateLength}</h3>
//           </div>
//           <div className="col-4">
//             <Link to={"/giveExam"}>
//               <button className="btn btn-give btn-danger">End Test</button>
//             </Link>
//           </div>
//         </div>
//         <hr className="my-1"></hr>
//         {array.length === 0 ? (
//           <>Loading..........</>
//         ) : (
//           <div>
//             <ul>
//               <h3>
//                 Q{indexRed + 1}. {state[array[indexRed]].questionStatement}
//               </h3>
//               <div onChange={handleInputChange}>
//                 <div class="form-check">
//                   <input
//                     type="radio"
//                     class="form-check-input"
//                     id={"radio" + indexRed}
//                     name={[array[indexRed]]}
//                     value={indexRed + "op1"}
//                     onClick={() => {
//                       console.log("op1");
//                     }}
//                   />
//                   {state[array[indexRed]].option1}
//                   <label class="form-check-label" for={indexRed}></label>
//                 </div>
//                 <div class="form-check">
//                   <input
//                     type="radio"
//                     class="form-check-input"
//                     id={"radio" + indexRed}
//                     name={[array[indexRed]]}
//                     value={indexRed + "op2"}
//                   />
//                   {state[array[indexRed]].option2}
//                   <label class="form-check-label" for={indexRed}></label>
//                 </div>
//                 <div class="form-check">
//                   <input
//                     type="radio"
//                     class="form-check-input"
//                     id={"radio" + indexRed}
//                     name={[array[indexRed]]}
//                     value={indexRed + "op3"}
//                   />
//                   {state[array[indexRed]].option3}
//                   <label class="form-check-label" for={indexRed}></label>
//                 </div>
//                 <div class="form-check">
//                   <input
//                     type="radio"
//                     class="form-check-input"
//                     id={"radio" + indexRed}
//                     name={[array[indexRed]]}
//                     value={indexRed + "op4"}
//                   />
//                   {state[array[indexRed]].option4}
//                   <label class="form-check-label" for={indexRed}></label>
//                 </div>
//               </div>
//               <li>
//                 Full Marks For This Question: {state[array[indexRed]].marks}
//               </li>
//               <li>
//                 Marks Reduction For This Question:{" "}
//                 {state[array[indexRed]].negative}
//               </li>
//             </ul>
//           </div>
//         )}
//         <hr></hr>
//         <div className="footerhi">
//           <button
//             id="button1"
//             className="btn btn-primary"
//             onClick={previousQuestion}
//           >
//             Previous
//           </button>
//           <button
//             id="button2"
//             className="btn btn-primary"
//             onClick={nextQuestion}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//       <div className="col-2"></div>
//     </div>
//   </div>
// );
// };

// export default ExamPaper;
