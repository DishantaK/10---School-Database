
import React, {  useContext, useState, useEffect } from 'react';
// import CourseContext from '../CourseContext';



function CourseDetail() {
    // bring in course data, plug in below
    let grabCurrent = window.location.pathname.replace("/courses/","");
    let [currentCourse, setcurrentCourse] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${grabCurrent}`)
        .then((response) => response.json())
        .then((data) => setcurrentCourse(data))
        .catch(error => console.log(error))
     }, []); 
    
     

    // if(!currentCourse){
    //     console.log(grabCurrent)
    //  }
    
    // let materials = currentCourse.materialsNeeded.split("\n");

    //get data from matching course
     return (
        
        <main>
         
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href={`/courses/${grabCurrent}/update`}>Update Course</a>
                    <a className="button" href="#">Delete Course</a>
                    <a className="button button-secondary" href="/">Return to List</a>
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
                            <p>{currentCourse.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title"> Estimated Time</h3>
                            <p>{currentCourse.estimatedTime}</p>

                            <h3 className="course--detail--title"> Materials Needed</h3>
                            <ul className="course--detail--list">
                                {currentCourse.materialsNeeded}
                                {/* {materials.map( (material) => {
                                    <li> {material} </li>
                                }
                                )} */}
                           
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CourseDetail
