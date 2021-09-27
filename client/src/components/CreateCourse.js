import React, {  useContext, useState, useEffect, useRef } from 'react';
import Form from './Form'



function CreateCourse({ context }) {

    // State
 
    let [currentCourse, setcurrentCourse] = useState([]);

    const [errors, setErrors] = useState({})

    const authUser = context.authenticatedUser;
    const {emailAddress, password} = context.authenticatedUser;
  
  
   const onChange = (e) => {
    setcurrentCourse(prevValues => ({
        ...prevValues,
        [e.target.name]: e.target.value ,
        }))
    }

 
    const submit = e => { // Submits course
        // currentCourse.userId = authenticatedUser.id
        context.data.createCourse(currentCourse, {emailAddress, password})
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
    return (
        <main>
            <div className='wrap'>
                <h2> Create Course </h2>
                <Form 
                    cancel={redirect}
                    errors={errors}
                    submit={submit}
                    submitButtonText='Create Course'
                    elements={ () =>(
                        <div className='main--flex'>
                            <div>
                                <label htmlFor='title'> Course Title </label>

                                <input
                                    id='title'
                                    name='title'
                                    type='text'
                                    onChange={onChange}
                                />

                                <label htmlFor='descirption'> Course Description </label>
                                <textarea
                                    id='description'
                                    name='description'
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor='estimatedTime'> Estimate Time </label>
                                <input
                                    id='estimatedTime'
                                    name='estimatedTime'
                                    type='text'
                                    onChange={onChange}
                                />

                                <label htmlFor='materialsNeeded'> Materials Needed </label>
                                <textarea
                                    id='materialsNeeded'
                                    name='materialsNeeded'
                                    onChange={onChange}
                                />
                                    
                            </div>
                        </div>                        
                    )}
                />
            </div>
        </main>
    )
}

export default CreateCourse
