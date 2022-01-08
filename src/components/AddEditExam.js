import React, { useEffect, useState } from "react";
// import app from './firebase';
// import {Link} from 'react-router-dom';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useHistory } from "react-router-dom";
// import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { getAuth } from "firebase/auth";
import Navbar from "./Navbar";
import "../style/AddEditExam.css";

const AddEditExam = () => {
  const auth = getAuth();
  const { email, uid, photoURL } = auth.currentUser;
  const db = getDatabase();
  const history = useHistory();
  const [examName, setExamName] = useState("");
  const [password, setpassword] = useState("");
  const [gid, setgid] = useState("");
  useEffect(() => {
    const dbref = ref(db, "exams/");
    let temp = null;
    onValue(
      dbref,
      (snap) => {
        const data = snap.val();
        // console.log(data);
        temp = Object.keys(data).length;
      },
      {
        onlyOnce: true,
      }
    );
    setTimeout(() => {
      setgid(temp + 1);
      // console.log(temp);
    }, 2000);
  }, [db]);
  const changeExamName = (e) => {
    // console.log(e.target.value);
    setExamName(e.target.value);
  };
  const changePassword = (e) => {
    // console.log(e.target.value);
    setpassword(e.target.value);
  };
  const submitted = (e) => {
    e.preventDefault();
    if (!password || !examName) alert("Please provide both entries !!");
    else {
      // console.log(app);
      const user = auth.currentUser;
      // console.log(user);
      const date = new Date();
      const encDate = btoa(date);
      const roomKey = user.uid + encDate;
      // console.log(roomKey);
      const dbref = ref(db, "exams/" + roomKey);
      set(dbref, {
        examName: examName,
        examId: gid,
        creatorEmail: user.email,
        password: password,
      });
      history.push("/teacher");
    }
  };

  return (
    <div className="addEditExam">
      <Navbar></Navbar>
      <section className="d-flex justify-content-md-center">
        <form onSubmit={submitted}>
          <input type="text" value={gid}></input>
          <br></br>
          <input
            type="text"
            value={examName}
            onChange={changeExamName}
            placeholder="Enter Exam Name"
          ></input>
          <br />
          <input
            type="password"
            value={password}
            onChange={changePassword}
            placeholder="Enter Exam Password"
          ></input>
          <br />
          <br />
          <button type="submit" className="submit">
            {" "}
            Create{" "}
          </button>
          <br />
        </form>
      </section>
    </div>
  );
};

export default AddEditExam;
