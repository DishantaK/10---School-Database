
import React, {  useContext, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
 
function CourseDetail({ context  }) {
    const authUser = context.authenticatedUser;
    const {emailAddress, password} = context.authenticatedUser;
    // bring in course data, plug in below
    let grabCurrent = window.location.pathname.replace("/courses/","");  // grabs current course id from route selected
    let [currentCourse, setcurrentCourse] = useState([]);
    const [errors, setErrors] = useState({})

    // set current course state to data matching the course with the same id # as grabCurrent on component render
    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${grabCurrent}`)
        .then((response) => response.json())
        .then((data) => setcurrentCourse(data))
        .catch(error => console.log(error))
     }, []); 

     const redirect = (e) =>{
        e.preventDefault();
        window.location.pathname = '/courses';
     }
    
     const submit = e => {
        context.data.deleteCourse(currentCourse, {emailAddress, password})
        .then(errors => {
            if(errors.length){
                console.log(errors)
                setErrors({errors})
            } else {
                redirect();
            }
        })
        .catch(error => {
            console.log(error)
            redirect();
        })
        
     }

     return (
        
        <main>
         
            <div className="actions--bar">
                <div className="wrap">
                {authUser ? (
                     <React.Fragment>
                     <a className="button" href={`/courses/${grabCurrent}/update`}>Update Course</a>
                    <a className="button" href="#" onClick={submit}>Delete Course</a>
                    <a className="button button-secondary" href="/">Return to List</a>
                    </React.Fragment>
                ) : (
                    <a className="button button-secondary" href="/">Return to List</a>
                )}
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{currentCourse.title}</h4>
                            <p>By: </p>  
                            <p>  
                            <ReactMarkdown>
                                {currentCourse.description}
                            </ReactMarkdown>
                               
                                </p>
                        </div>
                        <div>
                            <h3 className="course--detail--title"> Estimated Time</h3>
                            <p>{currentCourse.estimatedTime}</p>

                            <h3 className="course--detail--title"> Materials Needed</h3>
                            <ul className="course--detail--list">
                            <ReactMarkdown>
                                {currentCourse.materialsNeeded}
                            </ReactMarkdown>
                           
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CourseDetail
