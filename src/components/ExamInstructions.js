import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../style/ExamInstructions.css";

const ExamInstructions = (props) => {
  const { examId, userId } = useParams();
  return (
    <div>
      <Navbar
        emailId={props.emailId}
        profileName={props.profileName}
        profilePhoto={props.profilePhoto}
      ></Navbar>
      <div className="d-flex justify-content-md-center my-2">
        {/* <div className="col-2"></div> */}
        <div className="instruction1 bg-light">
          <div>
            <h2>Please Read Complete Instructions Before You Start Exam</h2>
            <hr></hr>
            <hr></hr>
          </div>
          <div class="table-responsive">
            {/* <h3>Your Exam Id is {examId}</h3> */}
          </div>
          <div>
            <h3>Instructions:</h3>
            <ol>
              <li>This is instruction number 1 </li>
              <li>This is instruction number 2 </li>
              <li>This is instruction number 3 </li>
              <li>This is instruction number 4 </li>
              <li>This is instruction number 5 </li>
              <li>This is instruction number 6 </li>
              <li>This is instruction number 7 </li>
              <li>This is instruction number 8 </li>
              <li>This is instruction number 9 </li>
              <li>This is instruction number 10 </li>
              <li>This is instruction number 11 </li>
              <li>This is instruction number 12 </li>
            </ol>
          </div>
          <div>
            <p>
              If you have read complete instructions and you are sure to start
              your examination then click on the below Start Button.
            </p>
            <p>
              Make sure you are about to start examination. Once you click Start
              Exam, your timer can not be paused.
            </p>
          </div>
          <div>
            <Link to={"/examPaper/" + examId}>
              <button userId={userId} className="submit">
                Start Examination
              </button>
            </Link>
          </div>
        </div>
        {/* <div className="col-2"></div> */}
      </div>
    </div>
  );
};

export default ExamInstructions;
