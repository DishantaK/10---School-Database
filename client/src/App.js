import React, { useEffect, useState, createContext, useContext} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import CreateCourse from "./components/CreateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";


// import Context from './Context';

function App() {



  return (

    // <Context.Provider value={{}} >
    <Router>
      <div className="App">
        <Header />
        <Switch>
            <Route exact path="/" component={Courses}> <Redirect to="/courses" /></Route>
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/courses/create" component={CreateCourse} />
            <Route exact path="/courses/:id" component={CourseDetail} />
            <Route exact path="/courses/:id/update" component={UpdateCourse} />
            <Route exact path="/signin" component={UserSignIn} />
            <Route exact path="/signup" component={UserSignUp} />
            <Route exact path="/signout" component={UserSignOut} />
          {/* 
              <PrivateRoute path="/authenticated" component={AuthWithContext} /> 
              <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
    // </CourseContext.Provider>
  );
}

export default App;
