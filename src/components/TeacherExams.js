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
import Navbar from "./Navbar";
import "../style/TeacherExams.css";

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
      <div id="teacher-header" className="d-flex justify-content-md-center">
        <h3 id="header">You Created</h3>
        <Link to="/createExam">
          <button className="btn btn-create">Create Exam</button>
        </Link>
      </div>

      <div style={{ marginTop: "20px" }}>
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
      </div>
    </div>
  );
};

export default TeacherExams;
