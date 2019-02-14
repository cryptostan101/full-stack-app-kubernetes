const api = require('../api');


const mongoose = require("mongoose");
const Person = require('../person');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Person', () => {
	beforeEach((done) => { //Before each test we empty the database
		Person.remove({}, (err) => {
		   done();
		});
	});

  /*
 * Test the /GET route
 */
 describe('/GET person', () => {
   it('it should GET all the persons', (done) => {
     chai.request(server)
       .get('/api/person')
       .end((err, res) => {
         console.log(res.body);
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.an('object');
         res.body.persons.should.be.a('array');

         done();
       });
   });
 });




 /*
  * Test the /POST route
  */
  describe('/POST a person details', () => {

	  it('it should POST a person details ', (done) => {
	  	const person = {
	  		firstname: "amy",
	  		lastname: "sally",
	  		age: 44,
	  		gender: "female"
	  	}
			chai.request(server)
		    .post('/api/person')
		    .send(person)
		    .end((err, res) => {
          console.log(res.body);
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('confirmation');
          res.body.data.should.have.property('firstname');
			  	res.body.data.should.have.property('lastname');
			  	res.body.data.should.have.property('age');
			  	res.body.data.should.have.property('gender');
		      done();
		    });
	  });
  });


  /*
 * Test the /GET/:id route
 */
 describe('/GET/:id person', () => {
   it('it should GET a person details by the given id', (done) => {
     const person = new Person(
     {
       firstname: "james",
       lastname: "cordon",
       age: 30,
       gender: "male"

     });
     person.save((err, person) => {
       chai.request(server)
       .get('/api/person/' + person.id)
       .send(person)
       .end((err, res) => {
         console.log(res.body);
         res.should.have.status(200);
         res.body.should.be.a('object');
         res.body.persons.should.have.property('firstname');
         res.body.persons.should.have.property('lastname');
         res.body.persons.should.have.property('age');
         res.body.persons.should.have.property('gender');
         res.body.persons.should.have.property('_id');
         res.body.persons._id.should.equal(person.id);
         console.log(person.id)
         done();
       });
     });

   });
 });


 /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id person', () => {
	  it('it should UPDATE a person details given the id', (done) => {
      const person = new Person(
      {
        firstname: "james",
        lastname: "cordon",
        age: 30,
        gender: "male"

      });
	  	person.save((err, person) => {
				chai.request(server)
			    .put('/api/person/edit/' + person.id)
			    .send({firstname: "sarah", lastname: "wilson", age: 80, gender: "male"})
			    .end((err, res) => {
            console.log(res.body);
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('confirmation').eql('success');
				  	res.body.data.should.have.property('age').eql(80);
			      done();
			    });
		  });
	  });
  });

  /*
 * Test the /DELETE/:id route
 */
 describe('/DELETE/:id person', () => {
   it('it should DELETE a person details given the id', (done) => {
     const person = new Person(
     {
       firstname: "david",
       lastname: "woods",
       age: 40,
       gender: "male"

     });
     person.save((err, person) => {
       chai.request(server)
         .delete('/api/person/' + person.id)
         .end((err, res) => {
           console.log(res.body);
           res.should.have.status(200);
           res.body.should.be.a('object');
           res.body.should.have.property('confirmation').eql('success');
           done();
         });
     });
   });
 });











});
