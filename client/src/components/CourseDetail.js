
import React, {  useContext  } from "react";
import CourseContext from '../CourseContext';

function CourseDetail() {
    // bring in course data, plug in below

    let {courses, setCourses}= useContext(CourseContext);
    let {currentCourse, setCurrentCourse  }= useContext(CourseContext);
    let courseContent = courses.find(course => course.id == currentCourse);

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href={`/courses/${courses.id}/update`}>Update Course</a>
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
                            <h4 className="course--name">{courseContent.title}</h4>
                            <p>By {courseContent.User.firstName} {courseContent.User.lastName}</p>
                            <p>{courseContent.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">{courseContent.estimatedTime}</h3>
                            <p>14 hours</p>

                            <h3 className="course--detail--title">{courseContent.materialsNeeded}</h3>
                            <ul className="course--detail--list">
                                {
                               //  split course.materialsNeeded and map over array
                                
                                }
                                <li>1/2 x 3/4 inch parting strip</li>
                           
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CourseDetail
