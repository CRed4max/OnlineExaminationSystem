import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../../style/ExamCards.css";

function StudentExamCards(props) {
  return (
    <Card className="card-view">
      {/* <Card.Img variant="top" src={props.imgPath} alt="card-img" /> */}
      {/* <Card.Img variant="top" style={{height: 200, width: 400 }} src={props.imgPath} alt="card-img" /> */}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          Your Exam Name :{" "}
          <span style={{ color: "red" }}>{props.examName}</span>
        </Card.Text>
        <Card.Text>
          Creator Email : <br />{" "}
          <span style={{ color: "blue" }}>{props.creatorEmail}</span>
        </Card.Text>
        <Card.Text>
          Your Score : <span style={{ color: "green" }}>{props.score}</span>
        </Card.Text>

        {/* <Button variant="primary" href={props.viewExam} target="_blank">
            <BiLinkExternal /> &nbsp;
            View Exam
            <Link to={props.viewExam}>View Exam</Link>
        </Button> */}

        <Link to={props.response}>
          <Button variant="primary" className="btn1">
            <span>View Response</span>
          </Button>
        </Link>
        <Link to={props.leaderboard}>
          <Button variant="primary" className="btn2">
            <span>Leaderboard</span>
          </Button>
        </Link>

        {/* <Button variant="primary" href={props.link} target="_blank">
          <BiLinkExternal /> &nbsp;
          {props.isBlog ? "View Blog" : props.viewType}
        </Button> */}
      </Card.Body>
    </Card>
  );
}
export default StudentExamCards;
