import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, query, get } from "firebase/database";
import { useHistory, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../Navbar";
import StudentExamCards from "./StudentExamCard";
import "../../style/StudentExams.css";

const StudentExams = (props) => {
  // const auth = getAuth();
  // const history = useHistory();
  const [state, setState] = useState();
  const [dict, setDict] = useState({});
  const userId = props.userId;
  // const userId = props.userId;
  const db = getDatabase();
  // const history = useHistory();
  // const [examDetail, setexamDetail] = useState([]);

  // useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //         if (user) {
  //             // console.log(user);
  //             setuserId(user.uid);
  //             // userId = user.uid;
  //             console.log(userId);
  //         } else {
  //           console.log("no user is currently signed in");
  //           history.push('/');
  //         }
  //       });
  //   }, [])

  useEffect(() => {
    console.log(userId);
    const que = query(ref(db, `student/` + userId));
    var data;
    get(que).then((snapshot) => {
      // console.log(snapshot.val());
      data = snapshot.val();


      Object.keys(data).map((id, index) => {
        var totalScore = 0;
        const dbref = ref(db, `response/` + id + "/" + userId);
        onValue(dbref, (snapshot) => {
          if (snapshot != null) {
            Object.keys(snapshot.val()).map((id1, index) => {
              if (snapshot.val()[id1].answer === snapshot.val()[id1].answered) {
                totalScore += Number(snapshot.val()[id1].marks);
              } else {
                if (snapshot.val()[id1].answered != null) {
                  totalScore -= Number(snapshot.val()[id1].negative);
                }
              }
            });
            console.log("yes here " + totalScore);
            var tmp = dict;
            tmp[id] = totalScore;
            setDict(tmp);
          }
        });
      });

      console.log(data);
    });
    // console.log(data);

    setTimeout(() => {
      console.log("hello");
      setState(data);
      console.log(data);
    }, 2000);
  }, [db, userId]);




  return (
    <div id="paperhai" className="studentExam">
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
              console.log(dict);
              return (
                <Col md={4} className="project-card">
                  <StudentExamCards
                    //   imgPath={coding}
                    isBlog={false}
                    examName={state[id].examName}
                    creatorEmail={state[id].creatorEmail}
                    score={dict[id]}
                    response={"/studentResponse/" + id + "/" + userId}
                    leaderboard={"/studentLeaderboard/" + id}
                    // title="Problem Solving"
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
