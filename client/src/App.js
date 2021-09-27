import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import CreateCourse from "./components/CreateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";
import NotFound from "./components/NotFound";

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {



  return (


    <Router>
      <div className="App">
        <HeaderWithContext />
        <Switch>
            <Route exact path="/" component={Courses}> <Redirect to="/courses" /></Route>
            <Route exact path="/courses" component={Courses} />
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
            <Route exact path="/courses/:id" component={CourseDetailWithContext} />
            <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route exact path="/signin" component={UserSignInWithContext} />
            <Route exact path="/signup" component={UserSignUpWithContext} />
            <Route exact path="/signout" component={UserSignOutWithContext} />
            <Route component={NotFound} />
          {/* 
              <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>

  );
}

export default App;
