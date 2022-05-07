import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import app from "../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar";

import "../../style/GiveExam.css";

const GiveExam = (props) => {
  const db = getDatabase();
  const history = useHistory();

  const [examName, setexamName] = useState("");
  const [examId, setexamId] = useState("");
  const [password, setpassword] = useState("");

  const changeExamName = (e) => {
    // console.log(e.target.value);
    setexamName(e.target.value);
  };
  const changeExamId = (e) => {
    // console.log(e.target.value);
    setexamId(e.target.value);
  };
  const changePassword = (e) => {
    // console.log(e.target.value);
    setpassword(e.target.value);
  };

  const submitted = (e) => {
    e.preventDefault();
    // console.log(app);
    const dbref = ref(db, "exams/");
    onValue(
      dbref,
      (snapshot) => {
        const data = snapshot.val();
        // console.log(data);
        const len = Object.keys(data).length;
        // console.log(len);
        let temp = 0;
        Object.keys(data).map((id) => {
          // console.log(data[id].examName,typeof(data[id].examId),data[id].password,examName,typeof(examId),password);

          // var x = data[id].date + data[id].timeStart;
          // console.log(x);
          if (
            data[id].examName === examName &&
            data[id].examId === Number(examId) &&
            data[id].password === password
          ) {
            temp += 1;
            // console.log("matched");
            history.push("/examInstructions/" + id + "/" + props.userId);
            // break;
          }
        });
        if (temp == 0) alert("use correct credentials");
      },
      {
        onlyOnce: true,
      }
    );
  };

  return (
    <div className="giveExam">
      <Navbar
        emailId={props.emailId}
        profileName={props.profileName}
        profilePhoto={props.profilePhoto}
      ></Navbar>
      <section className="d-flex justify-content-md-center">
        <h3>Fill Exam Credentials:</h3>
        <form onSubmit={submitted}>
          <input
            type="text"
            value={examName}
            onChange={changeExamName}
            placeholder="Enter Exam Name"
            required
          ></input>
          <br />
          <input
            type="number"
            value={examId}
            onChange={changeExamId}
            placeholder="Enter Exam Id "
            required
          ></input>
          <br />
          <input
            type="password"
            value={password}
            onChange={changePassword}
            placeholder="Enter Exam Password "
            required
          ></input>
          <br />
          <button type="submit" className="submit">
            Submit
          </button>
          <br />
        </form>
      </section>
    </div>
  );
};

export default GiveExam;
