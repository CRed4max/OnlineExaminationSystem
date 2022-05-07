import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { useHistory, Link } from "react-router-dom";
import Navbar from "../Navbar";
import "../../style/StudentExams.css";

const StudentExams = (props) => {
  const auth = getAuth();
  const history = useHistory();
  const [state, setState] = useState({});

  // useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //         if (user) {
  //             // console.log(user);
  //             email = user.email;
  //             console.log(email);
  //         } else {
  //           console.log("no user is currently signed in");
  //           history.push('/');
  //         }
  //       });
  //   }, [])

  // const temp = email;
  // let x = temp.length();
  // console.log(x);
  // const emailId = email.substring(0, emailLength);
  // console.log(emailId);
  const userId = props.userId;

  const db = getDatabase();
  // const history = useHistory();

  const [examDetail, setexamDetail] = useState([]);

  useEffect(() => {
    const dbref = ref(db, `student/` + userId);
    onValue(
      dbref,
      (snapshot) => {
        const data = snapshot.val();
        setState(data);
        setTimeout(() => {
          // setState(data);
        }, 2000);
        console.log(state);
      },
      {
        onlyOnce: true,
      }
    );
  }, [userId]);

  return (
    <div id="paperhai" className="studentExam">
      <Navbar
        emailId={props.emailId}
        profileName={props.profileName}
        profilePhoto={props.profilePhoto}
      ></Navbar>
      <div id="student-header" className="d-flex justify-content-md-center">
        <div>
          <h3 id="header">You Appeared In</h3>
        </div>
        <div>
          <Link to={"/giveExam"}>
            <button
              userId={props.userId}
              emailId={props.emailId}
              profileName={props.profileName}
              profilePhoto={props.profilePhoto}
              className="btn btn-give"
            >
              Give Exam
            </button>
          </Link>
        </div>
      </div>
      <div>
        {state == null ? (
          <>Loading..........</>
        ) : (
          <div class="table-responsive">
            <table className="styled-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "center" }}>Exam Name</th>
                  <th style={{ textAlign: "center" }}>Creator Email</th>
                  <th style={{ textAlign: "center" }}>Score</th>
                  <th style={{ textAlign: "center" }}>Response</th>
                  <th style={{ textAlign: "center" }}>Leaderboard</th>
                </tr>
              </thead>
              <tbody>
                {/* <LeaderBoard state={state}></LeaderBoard> */}
                {Object.keys(state).map((id, index) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{index + 1}.</th>
                      <td>{state[id].examName}</td>
                      <td>{state[id].creatorEmail}</td>
                      <td>
                        <Link to={"/studentScore/" + userId + "/" + id}>
                          <button className="btn btn-view">Check</button>
                        </Link>
                      </td>
                      <td>
                        <Link to={"/studentResponse/" + id + "/" + userId}>
                          <button className="btn btn-edit">Response</button>
                        </Link>
                      </td>
                      <td>
                        <Link to={"/studentLeaderboard/" + id}>
                          <button className="btn btn-delete">
                            LeaderBoard
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

export default StudentExams;
