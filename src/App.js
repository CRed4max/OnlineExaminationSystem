import React, { useRef, useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import AddEditExam from './components/AddEditExam';
import { Login } from './components/Login';
import Navbar from './components/Navbar';
import StudentExams from './components/StudentExams';
import TeacherExams from './components/TeacherExams';

function App() {
  return (
    <div className="App">
      

    <BrowserRouter>
      <Switch>

        <Route exact path="/">
          <Login></Login>
        </Route>
        <Route exact path="/home">
          <Navbar/>
        </Route>  
        <Route exact path="/student">
          <StudentExams/>
        </Route> 
        <Route exact path="/teacher">
          <TeacherExams/>
        </Route>
        <Route exact path="/createExam">
          <AddEditExam/>
        </Route>
        
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
// This is a commit
// This is another commit