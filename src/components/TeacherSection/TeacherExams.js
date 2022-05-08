import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  orderByChild,
  query,
  equalTo,
  get,
} from "firebase/database";
// import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
import Navbar from "../Navbar";
import ExamsAll from "./ExamsAll";
import "../../style/TeacherExams.css";

import { Container, Row, Col } from "react-bootstrap";
import ExamCards from "./ExamCards";
// import Particle from "../Particle";
// import "../../style/ExamsAll.css";




const TeacherExams = (props) => {
  const emailId = props.emailId;
  const [examsData, setExamsData] = useState();
  console.log(examsData);
  const db = getDatabase();
  useEffect(() => {
    console.log(emailId);
    const que = query(
      ref(db, "exams"),
      orderByChild("creatorEmail"),
      equalTo(emailId)
    );
    var data;
    get(que).then((snapshot) => {
      // console.log(snapshot.val());
      data = snapshot.val();
      console.log(data);
    });
    // console.log(data);

    setTimeout(() => {
      console.log("hello");
      setExamsData(data);
      console.log(data);
    }, 2000);
  }, [db, emailId]);

  return (
    <div className="teacherExam">
      <Navbar
        emailId={props.emailId}
        profileName={props.profileName}
        profilePhoto={props.profilePhoto}
      ></Navbar>

      {/* <Container fluid className="project-section"> */}
      <Container>
        <div id="teacher-header" className="d-flex justify-content-md-center">
          <h3 id="header">You Created</h3>
          <Link to="/createExam">
            <button className="btn btn-create">Create Exam</button>
          </Link>
        </div>

        {examsData == null ? (
          <>Loading..........</>
        ) : (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {Object.keys(examsData).map((id, index) => {
              return (
                <Col md={4} className="project-card">
                  <ExamCards
                    //   imgPath={coding}

                    isBlog={false}
                    examName={examsData[id].examName}
                    examId={examsData[id].examId}
                    examPass={examsData[id].password}
                    startTime={examsData[id].timeStart}
                    endTime={examsData[id].timeEnd}
                    viewExam={"/viewExam/" + id}
                    leaderboard={"/teacherLeaderboard/" + id}
                    title="Problem Solving"
                    description="Solved 800+ Coding Problems"
                    viewType="View Profile"
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
      {/* </Container> */}
    </div>
  );
};

export default TeacherExams;
