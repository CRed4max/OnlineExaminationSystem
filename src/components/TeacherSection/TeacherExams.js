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
import "../../style/ExamsAll.css";

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

      {/* <ExamsAll></ExamsAll> */}

      {/* <Container fluid className="project-section"> */}
        {/* <Particle /> */}
        <Container>
          {/* <h1 className="project-heading">
            Your <strong className="purple">All Created Exams </strong>
          </h1> */}
          {/* <p style={{ color: "white" }}>
          Here are a few things I'm interested in ......
        </p> */}
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

                // <tr key={id}>
                //   <th scope="row">{index + 1}</th>
                //   <td>{examsData[id].examName}</td>
                //   <td>{examsData[id].examId}</td>
                //   <td>{examsData[id].password}</td>
                //   <td>
                //     {examsData[id].timeStart} - {examsData[id].timeEnd}
                //   </td>
                //   <td>
                //     <Link to={"/viewExam/" + id}>
                //       <button className="btn btn-view">View Exam</button>
                //     </Link>
                //   </td>
                //   <td>
                //     <Link to={"/teacherLeaderboard/" + id}>
                //       <button className="btn btn-delete">
                //         Leaderboard
                //       </button>
                //     </Link>
                //   </td>
                // </tr>
              );
            })}

          </Row>
        )}
        </Container>
      {/* </Container> */}

      {/* <div id="teacher-header" className="d-flex justify-content-md-center">
        <h3 id="header">You Created</h3>
        <Link to="/createExam">
          <button className="btn btn-create">Create Exam</button>
        </Link>
      </div> */}

      {/* <div style={{ marginTop: "20px" }}>
        {examsData == null ? (
          <>Loading..........</>
        ) : (
          <div class="table-responsive">
            <table className="styled-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "center" }}>Exam Name</th>
                  <th style={{ textAlign: "center" }}>Exam Id</th>
                  <th style={{ textAlign: "center" }}>Exam Password</th>
                  <th style={{ textAlign: "center" }}>Exam Timing</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                  <th style={{ textAlign: "center" }}>Leaderboard</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(examsData).map((id, index) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{index + 1}</th>
                      <td>{examsData[id].examName}</td>
                      <td>{examsData[id].examId}</td>
                      <td>{examsData[id].password}</td>
                      <td>
                        {examsData[id].timeStart} - {examsData[id].timeEnd}
                      </td>
                      <td>
                        <Link to={"/viewExam/" + id}>
                          <button className="btn btn-view">View Exam</button>
                        </Link>
                      </td>
                      <td>
                        <Link to={"/teacherLeaderboard/" + id}>
                          <button className="btn btn-delete">
                            Leaderboard
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default TeacherExams;
