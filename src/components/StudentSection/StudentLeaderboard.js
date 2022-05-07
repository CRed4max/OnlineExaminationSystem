import React, { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getDatabase, ref, onValue, orderByChild, query, equalTo, get, set} from "firebase/database";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import "../../style/StudentLeaderboard.css";

const StudentLeaderboard = (props) => {
  const { examId } = useParams();
  // const [array, setArray] = useState([]);
  // const [indexRed, setindexRed] = useState(0);
  // const [state, setState] = useState({});
  // const [stateLength, setstateLength] = useState();
  const db = getDatabase();

  const [data, setData] = useState({});
  const [state, setState] = useState(["hello"]);
  // console.log(state);

  // const emailId = "emailId1";

  useEffect(() => {
    // console.log(examId);

    const dbref = ref(db, `response/` + examId);
    onValue(
      dbref,
      (snapshot) => {
        // data = snapshot.val();

        setData({ ...snapshot.val() });
        // console.log(data)
      },
      {
        onlyOnce: true,
      }
    );
  }, [examId, db]);

  // console.log(data);
  function func() {
    // console.log("hereee");
    return [...state, "hi"];
  }
  useEffect(() => {
    const ans = [];
    Object.keys(data).map((id, index) => {
      // console.log(id);
      const uid = id;
      let totalScore = 0;
      let slNo = index + 1;
      var name = "";

      var response = data[id];

      Object.keys(response).map((id1, index) => {
        if (response[id1].answer === response[id1].answered) {
          totalScore += Number(response[id1].marks);
        } else {
          if (response[id1].answered != null) {
            console.log("yes");
            totalScore -= Number(response[id1].negative);
          }
        }
      });

      const dbref = ref(db, `users/` + uid);
      onValue(
        dbref,
        (snapshot) => {
          // console.log(snapshot.val().name);
          name = snapshot.val().name;
          // console.log(totalScore);
          // console.log(name);

          var obj = { slNo: slNo, name: name, totalScore: totalScore };
          // console.log(obj);
          ans.push(obj);
          // setData({ ...snapshot.val() });
          // console.log(data)
        },
        {
          onlyOnce: true,
        }
      );

      // console.log(totalScore);
    });

    setTimeout(() => {
      ans.sort((a, b) => b.totalScore - a.totalScore);
      setState(ans);
    }, 2000);
  }, [examId, db, data]);

  return (
    <div className="studentLeaderboard">
      <Navbar
        emailId={props.emailId}
        profileName={props.profileName}
        profilePhoto={props.profilePhoto}
      ></Navbar>
      <div className="table-responsive">
        <div style={{ marginTop: "20px" }}>
          <table className="styled-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Student Name</th>
                <th>Student Score</th>
              </tr>
            </thead>
            <tbody>
              {/* <LeaderBoard state={state}></LeaderBoard> */}
              {Object.keys(state).map((id, index) => {
                return (
                  <tr key={id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{state[id].name}</td>
                    <td>{state[id].totalScore}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentLeaderboard;
