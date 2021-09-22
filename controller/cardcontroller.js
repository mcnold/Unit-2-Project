const express = require('express')

const router = express.Router()

// remember to import your models!
// the path will be different from server.js
const Card = require('../models/card')

//custom middleware to require authentication
const authRequired = (req, res, next) => {
    if (req.session.currentUser) {
        next()
        //next is part of express
        //it does what it says
        //i.e. go on to the next thing
    } else {
        res.send('You must be logged in to do that.')
    }
}
// set up index for fruits -- list all of the fruits
router.get('/', (req, res) => {
  // render and index.ejs template w/list of fruits

  // add a database query to get the fruits
  // in the callback render the template and pass the fruits from the database

  Fruit.find({}, (err, allFruits) => {
    // console.log(allFruits)
    res.render('index.ejs', {
      fruits: allFruits
    })
  })

})

// set up New ROUTE "new.ejs"
router.get('/new', (req, res) => {
  res.render('new.ejs')
})

router.get('/seed', (req, res) => {
  // seed our database -- adding data for testing

  // think about what we want in our database to start
  // in case lets just add 3 fruits to start

  Fruit.create([
    {
      name: 'grapefruit',
      color: 'pink',
      readyToEat: true
    },
    {
      name: 'grape',
      color: 'purple',
      readyToEat: false
    },
    {
      name: 'avocado',
      color: 'green',
      readyToEat: false 
    },
  ], (err, data) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/fruits')
  })
})


// set up show route -- GET /fruits/:id -- info about JUST ONE fruit
router.get('/:id', (req, res) => {
  Fruit.findById(req.params.id, (error, foundFruit) => {
    console.log(foundFruit)
    res.render('show.ejs', { fruit: foundFruit })
  })
})


// set up POST ROUTE "Create"
router.post('/', (req, res) => {
    //users can only add fruit if they are signed in
    if(req.session.currentUser) {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }
  console.log(req.body)
  // res.send(req.body)
  Fruit.create(req.body, (error, createdFruit) => {
    if (error){
      console.log(error)
      res.send(error)
    } else {
      console.log(createdFruit)
      res.redirect('/fruits')
    }
  })
} else {
    res.send("You must be logged in to do that!")
}
})
// setting up our DELETE route
router.delete('/:id', authRequired, (req, res) => {
  Fruit.findByIdAndDelete(req.params.id, (error, deletedFruit) => {
    // findByIdAndDelete will delete a document with a given id
    if (error) {
      console.log(error)
      res.send(error)
    } else {
     // redirect to the index page if the delete successful
     res.redirect('/fruits')
    }
  })
})

// make an edit page and a route to it
// create an edit.ejs view
// link to the edit page from each of the fruits
router.get('/:id/edit', authRequired, (req, res) => {
  Fruit.findById(req.params.id, (error, foundFruit) => {
    if (error) {
      console.log(error)
      res.send(error)
    } else {
      // make the edit form show the existing data
      res.render('edit.ejs', {
        fruit: foundFruit,
      })
    }
  })
})

router.put('/:id', (req, res) => {
  req.body.readyToEat = (req.body.readyToEat === 'on')
  // let's make our route actually update the model
  Fruit.findByIdAndUpdate(
    req.params.id, 
    req.body,
    {
      new: true,
    },
    (error, updatedFruit) => {
      // findByIdAndUpdate updates a fruit with a given id
      // the new option means we want the update fruit
      // without this flag, we'll get the fruit as it was
      // before the update

      if (error) {
        console.log(error)
        res.send(error)
      } else {
        // redirect to the index route
        res.redirect('/fruits')
      }
    } )
})

router.get('/signout', (req, res) => {
    req.session.destroy()
    //this destroys the session
    res.redirect('/fruits')
})


module.exports = router