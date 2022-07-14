import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../../style/ExamCards.css";

function ExamCards(props) {
  return (
    <Card className="card-view">
      {/* <Card.Img variant="top" src={props.imgPath} alt="card-img" /> */}
      {/* <Card.Img variant="top" style={{height: 200, width: 400 }} src={props.imgPath} alt="card-img" /> */}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
        Exam Name : {" "}
          <span style={{ color: "blue" }}>{props.examName}</span>
        </Card.Text>
        <Card.Text>
          Exam Id: {" "}
          <span style={{ color: "blue" }}>{props.examId}</span>
        </Card.Text>
        <Card.Text>
          Exam Password: {" "}
          <span style={{ color: "blue" }}>{props.examPass}</span>
        </Card.Text>
        <Card.Text>
          Start Time: {" "}
          <span style={{ color: "green" }}>{props.startTime.substring(0, 10)}{" "}
          {props.startTime.substring(11, 16)}</span>
        </Card.Text>
        <Card.Text>
          End Time: {" "}
          <span style={{ color: "red" }}>{props.endTime.substring(0, 10)}{" "}
          {props.endTime.substring(11, 16)}</span>
        </Card.Text>


        <Link to={props.viewExam}>
          <Button variant="primary">
            <span>ViewExam</span>
          </Button>
        </Link>
        <Link to={props.leaderboard}>
          <Button variant="primary">
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
export default ExamCards;
