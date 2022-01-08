import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getDatabase,
  ref,
  orderByChild,
  query,
  equalTo,
  get,
} from "firebase/database";
import "./App.css";
import AddEditExam from "./components/AddEditExam";
import AddEditQuestion from "./components/AddEditQuestion";
import ExamInstructions from "./components/ExamInstructions";
import ExamPaper from "./components/ExamPaper";
import ExamResponse from "./components/ExamResponse";
import GiveExam from "./components/GiveExam";
import { Login } from "./components/Login";
import Navbar from "./components/Navbar";
import StudentExams from "./components/StudentExams";
import TeacherExams from "./components/TeacherExams";
import ViewExam from "./components/ViewExam";
import { useHistory } from "react-router-dom";
import StudentLeaderboard from "./components/StudentLeaderboard";
import TeacherLeaderboard from "./components/TeacherLeaderboard";

function App() {
  const [emailId, setEmailId] = useState("");
  const [profileName, setprofileName] = useState("");
  const [profilePhoto, setprofilePhoto] = useState("");
  const auth = getAuth();

  const history = useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailId(user.email);
        setprofileName(user.displayName);
        setprofilePhoto(user.photoURL);
        history.push("/home");
      } else {
        console.log("no user is currently signed in");
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login emailId={emailId}></Login>
          </Route>
          <Route exact path="/home">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            />
          </Route>
          <Route exact path="/student">
            <StudentExams
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            />
          </Route>
          <Route exact path="/teacher">
            <TeacherExams
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            />
          </Route>
          <Route exact path="/createExam">
            <AddEditExam emailId={emailId} />
          </Route>
          <Route exact path="/viewExam/:examId">
            <ViewExam emailId={emailId}></ViewExam>
          </Route>
          <Route exact path="/addQuestion/:examId/:qid">
            <AddEditQuestion emailId={emailId}></AddEditQuestion>
          </Route>
          <Route exact path="/addQuestion/:examId/:qid">
            <AddEditQuestion emailId={emailId}></AddEditQuestion>
          </Route>
          <Route exact path="/giveExam">
            <GiveExam emailId={emailId}></GiveExam>
          </Route>
          <Route exact path="/examInstructions/:examId">
            <ExamInstructions emailId={emailId}></ExamInstructions>
          </Route>
          <Route exact path="/examPaper/:examId">
            <ExamPaper emailId={emailId}></ExamPaper>
          </Route>
          <Route exact path="/studentResponse/:examId/:userId">
            <ExamResponse></ExamResponse>
          </Route>
          <Route exact path="/studentLeaderboard/:examId">
            <StudentLeaderboard
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></StudentLeaderboard>
          </Route>
          <Route exact path="/teacherLeaderboard/:examId">
            <TeacherLeaderboard
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></TeacherLeaderboard>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
// This is a commit
// This is another commit
