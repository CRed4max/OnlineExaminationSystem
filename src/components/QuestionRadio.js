import React from "react";

export const QuestionRadio = (props) => {
  const id = props.id;
  const state = props.state;
  //   console.log(id);
  return (
      props.i===0?<>
          <div>
      <div id={props.i} style={{ display: "block" }}>
        <ul>
          <h3>
            Q{props.i + 1}. {state[id].questionStatement}
          </h3>
          <div>
            <div class="form-check">
              <input
                type="radio"
                class="form-check-input"
                id={id}
                name={id}
                value={"op1"}
                onClick={() => {
                  console.log("op1");
                }}
              />
              {state[id].option1}
              <label class="form-check-label" for={id}></label>
            </div>
            <div class="form-check">
              <input
                type="radio"
                class="form-check-input"
                id={id}
                name={id}
                value={"op2"}
              />
              {state[id].option2}
              <label class="form-check-label" for={id}></label>
            </div>
            <div class="form-check">
              <input
                type="radio"
                class="form-check-input"
                id={id}
                name={id}
                value={"op3"}
              />
              {state[id].option3}
              <label class="form-check-label" for={id}></label>
            </div>
            <div class="form-check">
              <input
                type="radio"
                class="form-check-input"
                id={id}
                name={id}
                value={"op4"}
              />
              {state[id].option4}
              <label class="form-check-label" for={id}></label>
            </div>
          </div>
          <li>Full Marks For This Question: {state[id].marks}</li>
          <li>Marks Reduction For This Question: {state[id].negative}</li>
        </ul>
      </div>
      
    </div>
      </>:
    <div>
      <div id={props.i} style={{ display: "none" }}>
        <ul>
          <h3>
            Q{props.i + 1}. {state[id].questionStatement}
          </h3>
          <div>
            <div class="form-check">
              <input
                type="radio"
                class="form-check-input"
                id={id}
                name={id}
                value={"op1"}
                onClick={() => {
                  console.log("op1");
                }}
              />
              {state[id].option1}
              <label class="form-check-label" for={id}></label>
            </div>
            <div class="form-check">
              <input
                type="radio"
                class="form-check-input"
                id={id}
                name={id}
                value={"op2"}
              />
              {state[id].option2}
              <label class="form-check-label" for={id}></label>
            </div>
            <div class="form-check">
              <input
                type="radio"
                class="form-check-input"
                id={id}
                name={id}
                value={"op3"}
              />
              {state[id].option3}
              <label class="form-check-label" for={id}></label>
            </div>
            <div class="form-check">
              <input
                type="radio"
                class="form-check-input"
                id={id}
                name={id}
                value={"op4"}
              />
              {state[id].option4}
              <label class="form-check-label" for={id}></label>
            </div>
          </div>
          <li>Full Marks For This Question: {state[id].marks}</li>
          <li>Marks Reduction For This Question: {state[id].negative}</li>
        </ul>
      </div>
      
    </div>
  );
};
