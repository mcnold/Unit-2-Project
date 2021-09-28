const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const router = express.Router()
router.use(express.static('public'))
const authRequired = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.send('You must be logged in to do that.')
    }
}
router.get('/register', (req, res) => {
    res.render('register.ejs')
})
router.get('/landing', (req, res) => {
  //  console.log(`Here is ${req.session.currentUser._id}`)
    let currentUserID = req.session.currentUser._id
    res.render('landing.ejs', {id: currentUserID})
})
router.get('/myStudyList', (req, res) => {
    res.render('myStudyList.ejs')
})
router.get('/spreads', (req, res) => {
    res.render('spreads.ejs')
})
router.get('/suits', (req, res) => {
    res.render('suits.ejs')
})
router.get('/ranks', (req, res) => {
    res.render('ranks.ejs')
})
router.get('/astrology', (req, res) => {
    res.render('astrology.ejs')
})
router.get('/major', (req, res) => {
    res.render('major.ejs')
})
router.get('/minor', (req, res) => {
    res.render('minor.ejs')
})
router.get('/horoscope', (req, res) => {
    res.render('horoscope.ejs')
})
router.post('/register', (req,res) => {
    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    console.log(req.body)
    User.findOne({username: req.body.username}, (error, userExists)=>{
        if (userExists) {
            res.send('That username is taken.')
        } else {
            User.create(req.body, (error, createdUser) => {
                req.session.currentUser = createdUser
                res.redirect('/user/landing')
              }  
            )}
        })
    })

router.get('/signin', (req, res) => {
    res.render('signin.ejs')
})

router.post('/signin', (req, res) => {
    User.findOne({username: req.body.username}, (error, foundUser) => {
        if (foundUser) {
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
                if (validLogin) {
                    req.session.currentUser = foundUser
                    res.redirect('/user/landing')
                } else {
                    res.send('Invalid Username or Password.')
                }
        } else {
            res.send('Invalid Username or Password')
        }
    })
})
router.get('/:id/edit', authRequired, (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
      if (error) {
        console.log(error)
        res.send(error)
      } else {
        res.render('editUser.ejs', {
          user: foundUser,
        })
      }
    })
  })
  
  router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(
      req.params.id, 
      req.body,
      {
        new: true,
      },
      (error, updatedUser) => {
        if (error) {
          console.log(error)
          res.send(error)
        } else {
          res.redirect('/user/landing')
        }
      } )
  })
  
// DESTROY session route
router.get('/signout', (req, res) => {
	req.session.destroy()
	res.redirect('/')
})

module.exports = router