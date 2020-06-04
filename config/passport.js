const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const UserSB = require('../models/sbUserSchema');

module.exports = function(passport){
    passport.use(
        new localStrategy({ usernameField: 'username' }, (username, password, done) => {
            UserSB.findOne({ username: username })
            .then(user => {
                if(!user){
                    console.log('That username is not registered!');
                    };
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;
                        if(isMatch){
                            return done(null, user)
                        } else {
                            return done(null, false, {message: 'Password incorrect'}) 
                        };
                    })
            }).catch(err => console.log(err))
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        UserSB.findById(id, (err, user) => {
            done(err, user);
        });
    });
}