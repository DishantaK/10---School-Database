import React, {useState  } from "react";
import Form from "./Form";

function CreateCourse({ context }) {
  // State

  let [currentCourse, setcurrentCourse] = useState({});
  const [errors, setErrors] = useState([]);
  const { emailAddress, password } = context.authenticatedUser;
  const [userId] = useState(
    context.authenticatedUser ? context.authenticatedUser.id : null
  );

  const onChange = (e) => {
    setcurrentCourse((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
      userId:  context.authenticatedUser ? context.authenticatedUser.id : null
    }));
  };

  const submit =   (e) => {
    // Submits course
 
   setcurrentCourse((prevValues) => ({
      ...prevValues,
      userId,
    }));
  context.data
      .createCourse(currentCourse, emailAddress, password)
      .then(errors => {
        if(errors.length){
            console.log(errors)
            setErrors({errors})
        } else {
           redirect();
        }})
      .catch((error) => {
        console.log(error);
        window.location.pathname = "/courses/create";
      });
  };

  const redirect = (e) => {
    window.location.pathname = "/courses";
  };
  return (
    <main>
      <div className="wrap">
        <h2> Create Course </h2>

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
          submitButtonText="Create Course"
          elements={() => (
            <div className="main--flex">
              <div>
                <label htmlFor="title"> Course Title </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={onChange}
                
                />
                <p>
                  By {context.authenticatedUser.firstName}{" "}
                  {context.authenticatedUser.lastName}
                </p>
                <label htmlFor="descirption"> Course Description </label>
                <textarea
                  id="description"
                  name="description"
                  onChange={onChange}
              
                />
              </div>
              <div>
                <label htmlFor="estimatedTime"> Estimate Time </label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  onChange={onChange}
                />

                <label htmlFor="materialsNeeded"> Materials Needed </label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  onChange={onChange}
                />
              </div>
            </div>
          )}
        />
      </div>
    </main>
  );
}

export default CreateCourse;
