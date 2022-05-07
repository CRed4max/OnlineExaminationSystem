import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ExamCards from "./ExamCards";
// import Particle from "../Particle";
import "../../style/ExamsAll.css";


function ExamsAll() {
  return (
    <Container fluid className="project-section">
      {/* <Particle /> */}
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Achievements </strong>
        </h1>
        {/* <p style={{ color: "white" }}>
          Here are a few things I'm interested in ......
        </p> */}
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ExamCards
            //   imgPath={coding}
              isBlog={false}
              title="Problem Solving"
              description="Solved 800+ Coding Problems"
              viewType="View Profile"
            />
          </Col>
          <Col md={4} className="project-card">
            <ExamCards
            //   imgPath={codeforces}
              isBlog={false}
              title="Coding Profile"
              description="Codeforces"
              viewType="View Profile"
              link="https://codeforces.com/profile/chhotelalk"
            />
          </Col>

          <Col md={4} className="project-card">
            <ExamCards
            //   imgPath={leetcode}
              isBlog={false}
              title="Coding Profile"
              description="LeetCode"
              viewType="View Profile"
              link = "https://leetcode.com/chhotelalk2509/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ExamCards
            //   imgPath={gfg}
              isBlog={false}
              title="Coding Profile"
              description="GeeksForGeeks"
              viewType="View Profile"
              link = "https://auth.geeksforgeeks.org/user/cred4max/profile"
            />
          </Col>

          <Col md={4} className="project-card">
            <ExamCards
            //   imgPath={interviewbit}
              isBlog={false}
              title="Coding Profile"
              description="InterviewBit"
              viewType="View Profile"
              link = "https://www.interviewbit.com/profile/chhote-lal-kumar"
            />
          </Col>

          <Col md={4} className="project-card">
            <ExamCards
            //   imgPath={codeforces}
              isBlog={false}
              title="Competitive Coding"
              description="Educational Codeforces Round 124"
              description1="Global Rank: 2424"
              viewType="View Contest"
              link = "https://codeforces.com/contest/1651"
            />
          </Col>

          <Col md={4} className="project-card">
            <ExamCards
            //   imgPath={hash22}
              isBlog={false}
              title="Competitive Coding"
              description="Google HashCode 2022"
              description1="Global Rank: 4064"
              viewType="View Certificate"
              link="https://drive.google.com/file/d/14bRkohOYo_0dZ1YU1EEFOx4CIPRirRBD/view?usp=sharing"
            />
          </Col>

          <Col md={4} className="project-card">
            <ExamCards
            //   imgPath={kick22}
              isBlog={false}
              title="Competitive Coding"
              description="Google KickStart 2022"
              description1="Global Rank: 4345"
              viewType="View Certificate"
              link="https://drive.google.com/file/d/1pkrtjZgZsygYQUAIiw5fDYWpoLPgyDDh/view?usp=sharing"
            />
          </Col>

          <Col md={4} className="project-card">
            <ExamCards
            //   imgPath={hash21}
              isBlog={false}
              title="Competitive Coding"
              description="Google HashCode 2021"
              description1="Global Rank: 6772"
              viewType="View Certificate"
              link="https://drive.google.com/file/d/1rt5jRUZ28D04nSlNkPNvCdN3aFUa73lp/view?usp=sharing"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ExamsAll;
