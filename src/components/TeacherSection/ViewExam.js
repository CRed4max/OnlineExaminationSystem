import React, { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getDatabase, ref, onValue, orderByChild, query, equalTo, get, set} from "firebase/database";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import Navbar from "./Navbar";
import Navbar from "../Navbar";
import "../../style/ViewExam.css";

const ViewExam = (props) => {
  const { examId } = useParams();
  const [array, setArray] = useState([]);
  const [indexRed, setindexRed] = useState(0);
  const [state, setState] = useState({});
  const [stateLength, setstateLength] = useState();
  const db = getDatabase();

  // useEffect(() => {
  //   // console.log(examId);
  //   const dbref = ref(db, "questions/" + examId);
  //   var data = null;
  //   onValue(
  //     dbref,
  //     (snap) => {
  //       data = snap.val();

  //     },
  //     {
  //       onlyOnce: true,
  //     }
  //   );
  //   setTimeout(() => {
  //     setQuestionsData(data);
  //     // console.log(temp);
  //   }, 2000);

  // }, [examId, db]);

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

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete ?")) {
      console.log(examId, id);

      var dbref = ref(db, "questions/" + examId + "/" + id);

      set(dbref, null);

      dbref = ref(db, "questions/" + examId);
      var data = null;
      onValue(
        dbref,
        (snap) => {
          data = snap.val();
        },
        {
          onlyOnce: true,
        }
      );

      setTimeout(() => {
        setState(data);
        // console.log(temp);
      }, 2000);
    }
  };

  const previousQuestion = () => {
    setindexRed((stateLength + indexRed - 1) % stateLength);
  };

  const nextQuestion = () => {
    setindexRed((indexRed + 1) % stateLength);
  };

  return (
    <div id="viewExam" className="row justify-content-md-center">
      {/* {console.log(array, state)} */}

      <div id="view-header" className="d-flex justify-content-md-center">
        <div>
          <h3 id="header">Total Questions = {stateLength}</h3>
        </div>
        <div>
          {/* <Link to={"/addQuestion/" + examId + "/-1"}>
            <button id="addQuestion" className="btn btn-add">
              Add Question
            </button>
          </Link> */}

          <Link to={"/addQuestion/" + examId + "/-1"}>
            <button className="btn btn-add">Add Question</button>
          </Link>
        </div>
      </div>

      {/* <div id="viewExam-header" className="d-flex justify-content-md-center">
        <h3 id="header">Total Number Of Questions = {stateLength} &emsp;</h3>
        <Link to={"/addQuestion/" + examId + "/-1"}>
          <button id="addQuestion" className="btn btn-primary">
            Add Question
          </button>
        </Link>
      </div> */}
      <div className="d-flex justify-content-md-center">
        <div className="view">
          {array.length === 0 ? (
            <>Loading..........</>
          ) : (
            <div className="middlehi">
              <ul>
                <h3>
                  Q{indexRed + 1}. {state[array[indexRed]].questionStatement}
                </h3>
                <div>
                  <span>a. {state[array[indexRed]].option1}</span><br></br>
                  <span>b. {state[array[indexRed]].option2}</span><br></br>
                  <span>c. {state[array[indexRed]].option3}</span><br></br>
                  <span>d. {state[array[indexRed]].option4}</span>
                </div>
                <li>
                  Full Marks For This Question: {state[array[indexRed]].marks}
                </li>
                <li>
                  Marks Reduction For This Question:{" "}
                  {state[array[indexRed]].negative}
                </li>
                <li>Correct Answer: {state[array[indexRed]].answer}</li>
              </ul>
            </div>
          )}
          <hr></hr>
          <div className="footerhi">
            <button
              id="button1"
              className="btn btn-dark"
              onClick={previousQuestion}
            >
              Previous
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(array[indexRed])}
            >
              Delete
            </button>
            <Link to={"/addQuestion/" + examId + "/" + array[indexRed]}>
              <button className="btn btn-primary">Edit</button>
            </Link>
            <button
              id="button2"
              className="btn btn-dark"
              onClick={nextQuestion}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExam;

//   return (
//     <div>
//       <Navbar></Navbar>
//       <div>
//         <h1>All Added Questions For This Exam</h1>
//         <Link to={"/addQuestion/" + examId + "/-1"}>
//           <button className="submit">Add Question</button>
//         </Link>
//         <hr></hr>
//         <hr></hr>
//       </div>

//       <div style={{ marginTop: "100px" }}>
//         {questionsData == null ? (
//           <>Loading..........</>
//         ) : (
//           <table className="styled-table1">
//             <thead>
//               <tr>
//                 <th style={{ textAlign: "center" }}>No.</th>
//                 <th style={{ textAlign: "center" }}>Question Statement</th>
//                 <th style={{ textAlign: "center" }}>Option 1</th>
//                 <th style={{ textAlign: "center" }}>Option 2</th>
//                 <th style={{ textAlign: "center" }}>Option 3</th>
//                 <th style={{ textAlign: "center" }}>Option 4</th>
//                 <th style={{ textAlign: "center" }}>Answer</th>
//                 <th style={{ textAlign: "center" }}>Marks</th>
//                 <th style={{ textAlign: "center" }}>Negative</th>
//                 <th style={{ textAlign: "center" }}>Delete</th>
//                 <th style={{ textAlign: "center" }}>Update</th>
//               </tr>
//             </thead>

//             <tbody>
//               {Object.keys(questionsData).map((id, index) => {
//                 return (
//                   <tr key={id}>
//                     <th scope="row">{index + 1}.</th>
//                     <td>{questionsData[id].questionStatement}</td>
//                     <td>{questionsData[id].option1}</td>
//                     <td>{questionsData[id].option2}</td>
//                     <td>{questionsData[id].option3}</td>
//                     <td>{questionsData[id].option4}</td>
//                     <td>{questionsData[id].answer}</td>
//                     <td>{questionsData[id].marks}</td>
//                     <td>{questionsData[id].negative}</td>
//                     <td>
//                       <button className="submit" onClick={() => onDelete(id)}>
//                         Delete
//                       </button>
//                     </td>
//                     <td>
//                       <Link to={"/addQuestion/" + examId + "/" + id}>
//                         <button className="submit">Edit</button>
//                       </Link>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewExam;
