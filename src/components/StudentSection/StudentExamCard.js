import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BiLinkExternal } from "react-icons/bi";
import { Link } from "react-router-dom";

function StudentExamCards(props) {
  return (
    <Card className="project-card-view">
      {/* <Card.Img variant="top" src={props.imgPath} alt="card-img" /> */}
      {/* <Card.Img variant="top" style={{height: 200, width: 400 }} src={props.imgPath} alt="card-img" /> */}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          Exam Name Your: {props.examName}
        </Card.Text>
        <Card.Text style={{ textAlign: "justify" }}>
          Creator Email: <br/> {props.creatorEmail}
        </Card.Text>
        <Card.Text style={{ textAlign: "justify" }}>
          Your Score: {props.score}
        </Card.Text>


        {/* <Button variant="primary" href={props.viewExam} target="_blank">
            <BiLinkExternal /> &nbsp;
            View Exam
            <Link to={props.viewExam}>View Exam</Link>
        </Button> */}

        <Link to={props.response}>
            <Button variant="primary" >
                <span>View Response</span>
            </Button>
        </Link>
        <Link to={props.leaderboard}>
            <Button variant="primary" >
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
