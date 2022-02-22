import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useHistory } from "react-router-dom";
// import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../style/AddEditQuestion.css";

const intialState = {
  questionStatement: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  answer: "",
  marks: "",
  negative: "",
};

const AddEditQuestion = (props) => {
  const { examId, qid } = useParams();
  // console.log(examId);

  const auth = getAuth();
  // const { email, uid, photoURL } = auth.currentUser;
  const db = getDatabase();
  const history = useHistory();

  const [question, setQuestion] = useState(intialState);
  // const [pquestion, setpQuestion] = useState();
  const {
    questionStatement,
    option1,
    option2,
    option3,
    option4,
    answer,
    marks,
    negative,
  } = question;

  const changeInput = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  useEffect(() => {
    if (qid !== "-1") {
      console.log(qid);
      const dbref = ref(db, "questions/" + examId + "/" + qid);
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
        console.log(data);
        setQuestion(data);
      }, 2000);

      // console.log(pquestion);
    }
  }, [db, examId, qid]);

  // useEffect(() => {

  //     if(qid !== "-1")
  //     {
  //         setTimeout(()=>{
  //             console.log(pquestion)
  //             setQuestion(pquestion);
  //             // console.log(temp);
  //         },2000);

  //         // console.log(question);
  //     }

  // }, [examId, qid, pquestion])

  const submitted = (e) => {
    e.preventDefault();
    if (qid === "-1") {
      const user = auth.currentUser;
      // console.log(user);
      const date = new Date();
      const encDate = btoa(date);
      const roomKey = user.uid + encDate;
      const dbref = ref(db, "questions/" + examId + "/" + roomKey);
      set(dbref, question);
    } else {
      const dbref = ref(db, "questions/" + examId + "/" + qid);
      set(dbref, question);
    }
    // console.log(examId);
    setTimeout(() => {
      history.push("/viewExam/" + examId);
    }, 1000);
  };

  return (
    <div className="addEditQuestion">
      <Navbar
        emailId={props.emailId}
        profileName={props.profileName}
        profilePhoto={props.profilePhoto}
      ></Navbar>
      <section className="d-flex justify-content-md-center">
        <form onSubmit={submitted}>
          <label>Enter Question Statement: </label>
          <br />
          <textarea
            rows="4"
            type="text-area 2"
            name="questionStatement"
            value={questionStatement}
            onChange={changeInput}
            placeholder="Enter Question Statement"
            required
          ></textarea>
          <br />
          <label>Enter Option 1: </label>
          <br />
          <textarea
            type="text"
            name="option1"
            value={option1}
            onChange={changeInput}
            placeholder="Enter Option 1"
            required
          ></textarea>
          <br />
          <label>Enter Option 2: </label>
          <br />
          <textarea
            type="text"
            name="option2"
            value={option2}
            onChange={changeInput}
            placeholder="Enter Option 2"
            required
          ></textarea>
          <br />
          <label>Enter Option 3: </label>
          <br />
          <textarea
            type="text"
            name="option3"
            value={option3}
            onChange={changeInput}
            placeholder="Enter Option 3"
            required
          ></textarea>
          <br />
          <label>Enter Option 4: </label>
          <br />
          <textarea
            type="text"
            name="option4"
            value={option4}
            onChange={changeInput}
            placeholder="Enter Option 4"
            required
          ></textarea>
          <br />
          <label>Enter Answer: </label>
          <br />
          <textarea
            className="same-line"
            type="text"
            name="answer"
            value={answer}
            onChange={changeInput}
            placeholder="Enter Answer"
            required
          ></textarea>
          <br />
          <label>Enter Marks: </label>
          <br />
          <textarea
            className="same-line"
            type="number"
            name="marks"
            value={marks}
            onChange={changeInput}
            placeholder="Enter Marks"
            required
          ></textarea>
          <br />
          <label>Enter Negative: </label>
          <br />
          <textarea
            className="same-line"
            type="number"
            name="negative"
            value={negative}
            onChange={changeInput}
            placeholder="Enter Negative"
            required
          ></textarea>
          <br />
          <br />
          <button type="submit" className="submit">
            {" "}
            {qid === "-1" ? "Add" : "Update"}{" "}
          </button>
          <br />
        </form>
      </section>
    </div>
  );
};

export default AddEditQuestion;
