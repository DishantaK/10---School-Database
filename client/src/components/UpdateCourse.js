import React, { useState, useEffect } from "react";
import Form from "./Form";

function UpdateCourse({ context }) {
  let grabCurrent = window.location.pathname
    .replace("/courses/", "")
    .replace("update", ""); // grabs current course id from route selected

  // set State
  let [currentCourse, setcurrentCourse] = useState([]);
  const { emailAddress, password } = context.authenticatedUser;
  const [errors, setErrors] = useState([]);
  const [userId] = useState(
    context.authenticatedUser ? context.authenticatedUser.id : null
  );

  console.log(userId);
  console.log(errors);
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${grabCurrent}`)
      .then((response) => response.json())
      .then((data) => setcurrentCourse(data))
      .catch((error) => console.log(error));
  }, [grabCurrent]);

  const onChange = (e) => {
    setcurrentCourse((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
      userId: context.authenticatedUser ? context.authenticatedUser.id : null,
    }));
  };

 
  const submit = (e) => {
    context.data
      .updateCourse(grabCurrent, currentCourse, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          console.log(errors);
          setErrors({ errors });
        } 
        // else {
        //   redirect();
        // }
      })
      .catch((error) => {
        console.log(error);
        redirect();
      });
  };
  const redirect = (e) => {
    window.location.pathname = "/courses";
  };

  // get course data from use effect
  // post req on submit
  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        {errors.errors ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.errors.map((err, i) => {
                return <li key={i}>{err}</li>;
              })}
            </ul>
          </div>
        ) : (
          <></>
        )}
        <Form
          cancel={redirect}
          errors={errors}
          submit={submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label> Course Title </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={currentCourse.title}
                    onChange={onChange}
                    // required='required'
                  />

                  <p>
                    By {context.authenticatedUser.firstName}{" "}
                    {context.authenticatedUser.lastName}
                  </p>

                  <label>Course Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={currentCourse.description}
                    onChange={onChange}
                    // required='required'
                  />
                </div>
                <div>
                  <label>Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={currentCourse.estimatedTime}
                    onChange={onChange}
                  />

                  <label>Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    value={currentCourse.materialsNeeded}
                    onChange={onChange}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        />
  
      </div>
    </main>
  );
}

export default UpdateCourse;
