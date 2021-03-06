import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../style/ExamPaper.css";
import { QuestionRadio } from "./QuestionRadio";

const ExamPaper = () => {
  const { examId } = useParams();
  const [currInd, setcurrInd] = useState(0);
  const [array, setArray] = useState([]);
  const [indexRed, setindexRed] = useState(0);
  const [state, setState] = useState({});
  const [stateLength, setstateLength] = useState();
  const db = getDatabase();
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
        Object.keys(data).map((id, index) => arr.push(id));
        setArray(arr);
        // console.log(data)
      },
      {
        onlyOnce: true,
      }
    );
  }, [examId, db]);

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
    <div>
      <Navbar></Navbar>
      {/* <QuestionRadio></QuestionRadio> */}
      {/* {console.log(array, state)} */}
      <div className="d-flex my-2">
        <div className="col-2"></div>
        <div id="paper" className="justify-content-md-center col-8 bg-light">
          <div className="d-flex bg-warning py-2">
            <div className="col-8">
              <h3>Total Number Of Questions = {stateLength}</h3>
            </div>
            <div className="col-4">
              <Link to={"/giveExam"}>
                <button className="btn btn-give btn-danger">End Test</button>
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
        <div className="col-2"></div>
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
