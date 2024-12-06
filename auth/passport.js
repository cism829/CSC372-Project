require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { google } = require('googleapis');



const userModel = require("../models/users.model");
passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/auth/google/callback'
}, (token, tokenSecret, profile, done) => {
    // console.log(profile);
    let accType ="";
    if(profile.emails[0].value == "collin042410@gmail.com"){
        accType = "admin";
    }
    else{
        accType = "user";
    }
    const newUser = {
        googleId: profile.id,
        name: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        accType
    }
    const user = userModel.getUserById(profile.id);
    if (!user) {
        console.log("user model data:");
        userModel.createNewUser(Object.values(newUser));
        console.log(newUser);
        let userId = userModel.getUserById(newUser.googleId);
        console.log(userId);
        userModel.createCart(userId.userId);
    }
    return done(null, profile);
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});


