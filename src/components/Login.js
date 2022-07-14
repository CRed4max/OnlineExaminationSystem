import React, { useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import google from "../images/google.png"
import "../style/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const Login = () => {
  const db = getDatabase();
  const history = useHistory();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        history.push("/student");
      } else {
        console.log("no user is currently signed in");
      }
    });
  }, []);
  const signIn = () => {
    console.log("yes herr")
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const userId = user.uid;
        console.log("inside")
        const obj = {
          email: user.email,
          name: user.displayName,
          photoUrl: user.photoURL,
        };
        const dbref = ref(db, "users/" + userId);
        set(dbref, obj);
        setTimeout(() => {}, 2000);
        history.push("/student");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div className="login">
      {/* <div><h1>Online Examination System</h1></div> */}
        <div className="rightside col-lg-6">
          <div className="login__box">
              <h3>Online Examination System</h3>

              <button 
              onClick={signIn}
                type="submit "
                className="btn btn-primary btn-lg btn-block"
              >
                <img src={google} alt="" />
              </button>
              
          </div>
        </div>
    </div>
  );
};

export default Login;


