import React, { useState, createContext, useContext } from "react";

const CourseContext = React.createContext(
    {
        courses: [],
        currentCourse: null,
    }
)

export default CourseContext
