
const express = require('express');
const router = express.Router();

// person model
const Person = require('./person');



// @route   GET /api/person
// @desc    GET All
// @access  Public
router.get('/person', (req, res) => {
	let filters = req.query
	if (req.query.age != null){
		filters = {
			age: {$gt: req.query.age}
		}
	}

	Person.find(filters)
	.then(persons => {
		res.json({
      persons
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
});

// @route   PUT /api/person/edit/:id
// @desc    Update by id
// @access  Public
router.put('/person/edit/:id', (req, res) => {

  const query = req.params.id
	Person.findByIdAndUpdate(query, {$set:req.body}, {new:true})
	.then(persons => {
		res.json({
			confirmation: 'success',
			data: persons

		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
});

// @route   DELETE /api/person/:id
// @desc    DELETE by id
// @access  Public

router.delete('/person/:id', (req, res) => {
  const query = req.params.id

  Person.findById(query)
    .then(persons => persons.remove()
    .then(() => res.json({
      confirmation: 'success',
      data: 'Person '+query+' successfully deleted.'
      })
    ))
    .catch(err => {
  		res.json({
  			confirmation: 'fail',
  			message: err.message
  		})
  	})
});


// @route   GET /api/person/:id
// @desc    GET by id
// @access  Public
router.get('/person/:id', (req, res) => {
	const id = req.params.id

	Person.findById(id)
	.then(persons => {
		res.json({
      persons
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Person ' + id + ' not found.'
		})
	})
});


// @route   POST /api/person
// @desc    POST all
// @access  Public
router.post('/person', (req, res) => {
  const newPerson = new Person({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender
  });

  newPerson.save()
  .then(persons => {
      res.json({
        confirmation: 'success',
        data: persons

      })
  })
  .catch(err => {
      res.json({
        confirmation: 'fail',
        message: err.message
      })
    })

});


module.exports = router;
