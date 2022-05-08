import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { useHistory, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../Navbar";
import StudentExamCards from "./StudentExamCard";
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
        // console.log(state);
      },
      {
        onlyOnce: true,
      }
    );
  }, [userId]);


  function ScoreValue(userIdHai, examIdHai){
    var totalScore = 0;
    const dbref = ref(db, `response/` + examIdHai + "/" + userIdHai);
    onValue(
      dbref,
      (snapshot) => {

        Object.keys(snapshot.val()).map((id1, index) => {
          if (snapshot.val()[id1].answer === snapshot.val()[id1].answered) {
            totalScore += Number(snapshot.val()[id1].marks);
          } else {
            if (snapshot.val()[id1].answered != null) {
              totalScore -= Number(snapshot.val()[id1].negative);
            }
          }
        });
      }
    );


    return totalScore;
  }

  return (
    <div id="paperhai" className="studentExam">
      <Navbar
        emailId={props.emailId}
        profileName={props.profileName}
        profilePhoto={props.profilePhoto}
      ></Navbar>


      <Container>
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

        {state == null ? (
          <>Loading..........</>
        ) : (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {Object.keys(state).map((id, index) => {
              return (
                <Col md={4} className="project-card">
                  <StudentExamCards
                    //   imgPath={coding}
                    isBlog={false}
                    examName={state[id].examName}
                    creatorEmail={state[id].creatorEmail}
                    score={ScoreValue(userId, id)}
                    response={"/studentResponse/" + id + "/" + userId}
                    leaderboard={"/studentLeaderboard/" + id}
                    title="Problem Solving"
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>

    </div>
  );
};

export default StudentExams;
