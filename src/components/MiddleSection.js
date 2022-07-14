import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../style/MiddleSection.css"

import AddEditExam from "./TeacherSection/AddEditExam";
import AddEditQuestion from "./TeacherSection/AddEditQuestion";
import ExamInstructions from "./TeacherSection/ExamInstructions";
import ExamPaper from "./TeacherSection/ExamPaper";
import ExamResponse from "./TeacherSection/ExamResponse";
import TeacherExams from "./TeacherSection/TeacherExams";
import TeacherLeaderboard from "./TeacherSection/TeacherLeaderboard";
import ViewExam from "./TeacherSection/ViewExam";


import GiveExam from "./StudentSection/GiveExam";
import StudentLeaderboard from "./StudentSection/StudentLeaderboard";
import StudentScore from "./StudentSection/StudentScore";
import StudentExams from "./StudentSection/StudentExams";

import Navbar from "./Navbar";
import { Login } from "./Login";
import Footer from "./Footer";



const MiddleSection = (props) => {
    const userId = props.userId;
    const emailId = props.emailId;
    const profileName = props.profileName;
    const profilePhoto = props.profilePhoto;
    
    return (
      <div className="middleSection">
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Login emailId={emailId}></Login>
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
  };
  
  export default MiddleSection;
