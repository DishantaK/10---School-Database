const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Course, User } = require('../models');
const { authenticateUser } = require('../auth');
// return all courses including the User associated with each course and a 200 HTTP status code.

router.get('/', async function(req, res) {
    const courses =  await Course.findAll({
      include: [
        {
            model: User,
        }]
    });
    res.status(200).json(courses);
});

// return the corresponding course including the User associated with that course and a 200 HTTP status code.
router.get('/:id', async function(req, res) {
    const course = await Course.findByPk(req.params.id,
      {
        include: [
          {
              model: User,
          }]
      });
    if(course === null) {
        res.status(404);
      } else {
        res.status(200).json(course);
      }
   
});

// create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code
router.post('/', authenticateUser, async function(req, res) {
  let course;
    try {
      course = await Course.create(req.body);
      res.location(`/courses/${course.id}`).status(201).end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
});






// update the corresponding course and return a 204 HTTP status code 
router.put('/:id', authenticateUser, async function(req, res) {
    const course = await Course.findByPk(req.params.id);
   // if title and description null, reject
    if(course === null) {
        res.status(404).location('/').end();
      } else {
        try{
          if( req.currentUser.id === course.userId ){
              if(course){
                  console.log('Updating...')
                  await course.update(req.body)
                  res.status(204).end()
              }else{
                  res.status(404).end()
              }
          }else{
              res.status(403)
              .json({message: "Update Failed. No permissions."})
          }
        } catch(error) {
            if(error.name === "SequelizeValidationError" ||
            error.name === "SequelizeUniqueConstraintError") { 
              const errors = error.errors.map(error => error.message);
                // await course.update(req.body);
                res.status(400).json({ errors }).end()
              } else {
                throw error; 
              }  
        }
      }
});

// delete the corresponding course and return a 204 HTTP status code 
router.delete('/:id',  authenticateUser, async function(req, res) {
    const course = await Course.findByPk(req.params.id);

    if(course === null) {
        res.status(404);
      } else {
        await course.destroy();
        res.status(204).end(); 
      }
});


router.get('*', async function(req, res) {
    res.status(404);
  });


module.exports = router;