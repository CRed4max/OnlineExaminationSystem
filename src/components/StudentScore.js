import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useHistory, Link, useParams } from "react-router-dom";
import "../style/StudentScore.css";

var StudentScore = (props) => {
  //   const userId = props.userId;
  //   const examId = props.examId;
  const { userId, examId } = useParams();
  const db = getDatabase();

  // console.log(userId);
  // console.log(examId);

  const [data, setData] = useState({});

  const [score, setscore] = useState(-10000000);

  useEffect(() => {
    const dbref = ref(db, `response/` + examId + "/" + userId);
    onValue(
      dbref,
      (snapshot) => {
        // data = snapshot.val();

        setData({ ...snapshot.val() });
        // console.log(data);
        setTimeout(() => {
          setData({ ...snapshot.val() });
        }, 2000);
        console.log(data);
        var totalScore = 0;
        console.log("yes");

        Object.keys(data).map((id1, index) => {
          // console("yes");
          if (data[id1].answer === data[id1].answered) {
            totalScore += Number(data[id1].marks);
          } else {
            if (data[id1].answered != null) {
              totalScore -= Number(data[id1].negative);
            }
          }
        });

        setscore(totalScore);

        // console.log(data)
      },
      {
        onlyOnce: true,
      }
    );
  }, [examId, db, userId, score === -10000000]);

  return (
    <div className="StudentScore">
      <section>
        <h1>Your Score is {score === -10000000 ? "Loading" : score} </h1>
      </section>
    </div>
  );
};

export default StudentScore;
