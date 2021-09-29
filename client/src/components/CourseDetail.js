
import React, {  useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown'
import {  Redirect } from 'react-router-dom'
 
function CourseDetail({ context  }) {


    const authUser = context.authenticatedUser;
    const [userId] = useState(
    context.authenticatedUser ? context.authenticatedUser.id : null
  );
    console.log(userId);
 
    const [user, setUser ]= useState({});
    let grabCurrent = window.location.pathname.replace("/courses/","");  // grabs current course id from route selected
    let [currentCourse, setcurrentCourse] = useState([]);

    const [errors, setErrors] = useState([])
    console.log(errors);
    // set current course state to data matching the course with the same id # as grabCurrent on component render
    useEffect(() => {
    
        fetch(`http://localhost:5000/api/courses/${grabCurrent}`)
        .then((response) => response.json())
        .then((data) => 
            setcurrentCourse(data)
            )
        .catch(error => console.log(error))

     }, [grabCurrent]); 
    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${grabCurrent}`)
        .then((response) => response.json())
        .then((data) => 
             
            setUser(data.User)
            )
      
        .then((currentCourse) => 
            setUser(currentCourse.User)
            )

        .catch(error => console.log(error))

     }, [grabCurrent]); 


     const redirect = (e) =>{
  
        window.location.pathname = '/courses';
     }
    
     const submit = e => {
        context.data.deleteCourse(grabCurrent, authUser.emailAddress, authUser.password)
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



     if(currentCourse === null){
        return <Redirect to="/NotFound" />
    } else {
     return (
        
        <main>
         
            <div className="actions--bar">
                <div className="wrap">

                {authUser && authUser.id === currentCourse.userId ? (
                     <React.Fragment>
                     <a className="button" href={`/courses/${grabCurrent}/update`}>Update Course</a>
                     <a className="button" href='/#' onClick={submit}>Delete Course</a>
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
                            <p>By: {user.firstName}  {user.lastName}</p> 
                        
                            <ReactMarkdown>
                                {currentCourse.description}
                            </ReactMarkdown>
                               
                           
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

}

export default CourseDetail
