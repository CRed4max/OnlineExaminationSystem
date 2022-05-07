import React, { useEffect } from "react";
import image from "../images/loginImage.jpg";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../style/Login.css";
import app from "./firebase";
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const Login = () => {
  const db = getDatabase();
  const history = useHistory();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        history.push("/home");
      } else {
        console.log("no user is currently signed in");
      }
    });
  }, []);
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const userId = user.uid;
        const obj = {
          email: user.email,
          name: user.displayName,
          photoUrl: user.photoURL,
        };
        const dbref = ref(db, "users/" + userId);
        set(dbref, obj);
        setTimeout(() => {}, 2000);
        history.push("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div className="login" style={{ backgroundImage: image }}>
      {/* <header></header> */}
      {/* <img className="col-12" src={image} /> */}

      <div className="row">
        <div className="col-sm-4 text-center abc">
          <form action="#!">
            <p className="h4 mb-4 text-left">Login to continue</p>
            <p className="text-left">Signin to create, appear in test</p>
            <label for="mail" className="in">
              Username
            </label>{" "}
            <input
              type="email"
              id="defaultLoginFormEmail"
              className="form-control mb-4"
              placeholder="Enter Username"
            />{" "}
            <label for="pass" className="in">
              Password
            </label>{" "}
            <input
              type="password"
              id="defaultLoginFormPassword"
              className="form-control mb-4"
              placeholder="Enter Password"
            />
            <div className="d-flex justify-content-left">
              <div>
                <div className="custom-control custom-checkbox text-left">
                  {" "}
                  <input
                    type="checkbox"
                    className="custom-control-input"
                  />{" "}
                  <label
                    className="custom-control-label"
                    for="defaultLoginFormRemember"
                  >
                    Remember me
                  </label>{" "}
                </div>
              </div>
            </div>{" "}
          </form>
          <button
            onClick={signIn}
            className="btn btn-info btn-block "
            type="submit"
            style={{ backgroundImage: "https://i.imgur.com/6YuRxJA.png" }}
          >
            LOGIN
          </button>{" "}
          <button className="btn btn-info btn-block my" type="submit">
            Forgot Password?
          </button>
        </div>
        <div
          className="col-sm-8 xyz text-center"
          style={{ backgroundImage: "https://i.imgur.com/6YuRxJA.png" }}
        >
          {" "}
          <i className="fa fa-user-circle fa-5x" aria-hidden="true"></i>
          <h2 className="account-text">Create Your Account</h2>
          <h4 className="account-description">
            Signup to create, appear in test
          </h4>{" "}
          <button
            onClick={signIn}
            className="btn btn-info btn-block sign"
            type="submit"
          >
            SIGN UP
          </button>
        </div>
      </div>

      {/* <section>
        <button onClick={signIn} className="sign-in">
          LOGIN
        </button>
      </section> */}
    </div>
  );
};
