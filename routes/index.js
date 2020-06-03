const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

//Models
const UserSB = require('../models/sbUserSchema');
const InfoSB = require('../models/sbInfoSchema');

//Welcome Page
router.get('/', (req, res) => res.render('welcome'));

//Register Page
router.get('/register', (req, res) => res.render('register'));

//Login Page
router.get('/login', (req, res)=> res.render('login'));

//Home Page
router.get('/home', ensureAuthenticated, (req, res) => res.render('home'));

//Add Page
router.get('/add', ensureAuthenticated, (req, res) => res.render('add'));


//Register Handle
router.post('/register', (req, res) => {
    const { username, password, password2 } = req.body;
    UserSB.findOne({ username: username})
    .then(user => {
        if(user){
            res.render('register');
        }
        if(!user){
            const newUserSB = new UserSB({ username, password});
            bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUserSB.password, salt, (err, hash) => {
                if (err) throw err;
                newUserSB.password = hash;
                newUserSB.save()
                .then(user => {
                    res.redirect('login');
                })
                .catch(err => console.log(err));
            }));
        }
    });
});

//Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

//Add Handle
router.post('/add', (req, res) => {
    const { song, artist } = req.body    
    const newInfoSB = new InfoSB({
        song,
        artist
    });
    newInfoSB.save()
    .then(post => {
        res.render('home');
    })
});

router.get('/home', (req, res) => {
    InfoSB.find((err, docs) => {
        if(!err){
            console.log(docs);
            res.render('home', {list: docs})
        }
    })
})

module.exports = router;