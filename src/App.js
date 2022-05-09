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
import { useSelector, useDispatch } from "react-redux";
import { storeCredential } from "./actions/index";

import AddEditExam from "./components/TeacherSection/AddEditExam";
import AddEditQuestion from "./components/TeacherSection/AddEditQuestion";
import ExamInstructions from "./components/TeacherSection/ExamInstructions";
import ExamPaper from "./components/TeacherSection/ExamPaper";
import ExamResponse from "./components/TeacherSection/ExamResponse";
import TeacherExams from "./components/TeacherSection/TeacherExams";
import TeacherLeaderboard from "./components/TeacherSection/TeacherLeaderboard";
import ViewExam from "./components/TeacherSection/ViewExam";


import GiveExam from "./components/StudentSection/GiveExam";
import StudentLeaderboard from "./components/StudentSection/StudentLeaderboard";
import StudentScore from "./components/StudentSection/StudentScore";
import StudentExams from "./components/StudentSection/StudentExams";



import { Login } from "./components/Login";
import Navbar from "./components/Navbar";


import { useHistory } from "react-router-dom";


function App() {
  const [userCurrent, setuserCurrent] = useState(
    useSelector((state) => state.StoreCredntials)
  );
  const dispatch = useDispatch();

  // console.log(userCurrent);

  const [userId, setUserId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [profileName, setprofileName] = useState("");
  const [profilePhoto, setprofilePhoto] = useState("");
  const auth = getAuth();

  const history = useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const obj = {
          userId: user.uid,
          emailId: user.email,
          profileName: user.displayName,
          profilePhoto: user.photoURL,
        };
        setuserCurrent(obj);
        // dispatch(storeCredential(obj));

        // console.log(userCurrent);

        setUserId(user.uid);
        setEmailId(user.email);
        setprofileName(user.displayName);
        setprofilePhoto(user.photoURL);
        // console.log("yesssssssssssssss");
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
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            />
          </Route>
          <Route exact path="/student">
            <StudentExams
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            />
          </Route>
          <Route exact path="/teacher">
            <TeacherExams
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            />
          </Route>
          <Route exact path="/createExam">
            <AddEditExam
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            />
          </Route>
          <Route exact path="/viewExam/:examId">
            <ViewExam
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></ViewExam>
          </Route>
          <Route exact path="/addQuestion/:examId/:qid">
            <AddEditQuestion
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></AddEditQuestion>
          </Route>
          <Route exact path="/addQuestion/:examId/:qid">
            <AddEditQuestion
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></AddEditQuestion>
          </Route>
          <Route exact path="/giveExam">
            <GiveExam
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></GiveExam>
          </Route>
          <Route exact path="/examInstructions/:examId/:userId">
            <ExamInstructions
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></ExamInstructions>
          </Route>
          <Route exact path="/examPaper/:examId">
            <ExamPaper
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></ExamPaper>
          </Route>
          <Route exact path="/studentResponse/:examId/:userId">
            <ExamResponse
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></ExamResponse>
          </Route>
          <Route exact path="/studentScore/:userId/:examId">
            <StudentScore
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></StudentScore>
          </Route>
          <Route exact path="/studentLeaderboard/:examId">
            <StudentLeaderboard
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></StudentLeaderboard>
          </Route>
          <Route exact path="/teacherLeaderboard/:examId">
            <TeacherLeaderboard
              userId={userId}
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
