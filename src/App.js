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
// import "./style/MiddleSection.css";
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

import Profile from "./components/Profile";

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
  const [isUser, setisUser] = useState(null);
  const auth = getAuth();

  const history = useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setisUser(user);
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
        // history.push("/home");
      } else {
        console.log("no user is currently signed in");
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* {!isUser ? (
          <></>
        ) : (
          <Navbar
            emailId={emailId}
            profileName={profileName}
            profilePhoto={profilePhoto}
          ></Navbar>
        )} */}

        <Switch className="middleSection">
          <Route exact path="/">
            <Login emailId={emailId}></Login>
          </Route>
          <Route exact path="/account">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <Profile
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            />
          </Route>
          <Route exact path="/student">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <StudentExams
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            />
          </Route>
          <Route exact path="/teacher">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <TeacherExams
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            />
          </Route>
          <Route exact path="/createExam">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <AddEditExam
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            />
          </Route>
          <Route exact path="/viewExam/:examId">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <ViewExam
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></ViewExam>
          </Route>
          <Route exact path="/addQuestion/:examId/:qid">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <AddEditQuestion
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></AddEditQuestion>
          </Route>
          <Route exact path="/addQuestion/:examId/:qid">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <AddEditQuestion
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></AddEditQuestion>
          </Route>
          <Route exact path="/giveExam">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <GiveExam
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></GiveExam>
          </Route>
          <Route exact path="/examInstructions/:examId/:userId">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <ExamInstructions
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></ExamInstructions>
          </Route>
          <Route exact path="/examPaper/:examId">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <ExamPaper
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></ExamPaper>
          </Route>
          <Route exact path="/studentResponse/:examId/:userId">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <ExamResponse
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></ExamResponse>
          </Route>
          <Route exact path="/studentScore/:userId/:examId">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <StudentScore
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></StudentScore>
          </Route>
          <Route exact path="/studentLeaderboard/:examId">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <StudentLeaderboard
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></StudentLeaderboard>
          </Route>
          <Route exact path="/teacherLeaderboard/:examId">
            <Navbar
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></Navbar>
            <TeacherLeaderboard
              userId={userId}
              emailId={emailId}
              profileName={profileName}
              profilePhoto={profilePhoto}
            ></TeacherLeaderboard>
          </Route>
        </Switch>

        {/* <Footer></Footer> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
// This is a commit
// This is another commit
