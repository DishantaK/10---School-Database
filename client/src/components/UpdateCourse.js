import React, {  useState, useEffect, useRef } from 'react'

function UpdateCourse({context}) {
    let grabCurrent = window.location.pathname.replace("/courses/","").replace("update","");  // grabs current course id from route selected
    let [currentCourse, setcurrentCourse] = useState([]);
    const {emailAddress, password} = context.authenticatedUser;
    const [errors, setErrors] = useState({})
    const [userId] = useState(
      context.authenticatedUser ? context.authenticatedUser.id : null
    );


    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${grabCurrent}`)
        .then((response) => response.json())
        .then((data) => setcurrentCourse(data))
        .catch(error => console.log(error))
     }, []); 
    
     const onChange = (e) => {
        setcurrentCourse(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value,
            userId:  context.authenticatedUser ? context.authenticatedUser.id : null
            }))
        }

    const form = useRef(null) 
    const submit = e => {

    //    if( currentCourse.userId == context.authenticatedUser) {
        context.data.updateCourse(grabCurrent, currentCourse, emailAddress, password)
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
     const redirect = (e) =>{

        window.location.pathname = '/courses';
     }

    // get course data from use effect
    // post req on submit 
    return (
        <main>
        <div className="wrap">
            <h2>Update Course</h2>
            <form onSubmit={submit} ref={form}> 
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" defaultValue={currentCourse.title}   onChange={onChange}/>

                        {/* <p>By {currentCourse.User.firstName} {currentCourse.User.lastName}</p>  */}

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" defaultValue={currentCourse.description}  onChange={onChange}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={currentCourse.estimatedTime}   onChange={onChange}/>

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={currentCourse.materialsNeeded}  onChange={onChange}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button><button type="button" className="button button-secondary" onClick={redirect}  onChange={onChange}>Cancel</button>
            </form>
        </div>
    </main>
    )
}

export default UpdateCourse
