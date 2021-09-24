import React, {  useContext, useState, useEffect, useRef } from 'react';

function CreateCourse() {
    // works add validation and conditional rendering of errors
    let [currentCourse, setcurrentCourse] = useState([]);
    const form = useRef(null) 
    
    const submit = e => {
        e.preventDefault()
        const getData = new FormData(form.current);
        fetch('http://localhost:5000/api/courses/', {
          method: 'POST',
          body: JSON.stringify(getData),
          headers: { 'Content-Type': 'application/json' },
        })
        .then((data) => setcurrentCourse(data))
        .catch(error => console.log(error))
      }
     const redirect = (e) =>{
         e.preventDefault();
         window.location.pathname = '/courses';

     }
    return (
        <main>
        <div className="wrap">
            <h2>Create Course</h2>
            {/* <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    <li>Please provide a defaultValue for "Title"</li>
                    <li>Please provide a defaultValue for "Description"</li>
                </ul>
            </div> */}
            <form onSubmit={submit} ref={form}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" defaultValue="" />

                        <p>By Joe Smith</p> {/* come back to , to add/ populate user first and last name  */}

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription"></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" defaultValue="" />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button> <button type ="button" className="button button-secondary" onClick={redirect}>Cancel</button>
            </form>
        </div>
    </main>
    )
}

export default CreateCourse
