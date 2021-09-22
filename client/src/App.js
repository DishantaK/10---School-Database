import React, { useEffect, useState, createContext, useContext} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import CreateCourse from "./components/CreateCourse";


import CourseContext from './CourseContext';

function App() {

  let [courses, setCourses] = useState([]);
  // let [currentCourse, setCurrentCourse] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);
  
  return (

    <CourseContext.Provider value={courses}>
    <Router>
      <div className="App">
        <Header />
        <Courses />

        <Switch>
          {/* <Route exact path="/" component={Public} />
              <PrivateRoute path="/authenticated" component={AuthWithContext} /> */}
              <Route path="/courses/:id" component={CourseDetail} />
              <Route path="/courses/:id/update" component={UpdateCourse} />
              <Route path="/courses/create" component={CreateCourse} />
          {/* <Route path="/signin" component={UserSignInWithContext} />
              <Route path="/signup" component={UserSignUpWithContext} />
              <Route path="/signout" component={UserSignOutWithContext} />
              <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
    </CourseContext.Provider>
  );
}

export default App;
