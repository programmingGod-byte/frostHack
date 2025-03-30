const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const fetch = require('node-fetch');
const User = require('../models/User')
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let email = profile.emails?.[0]?.value || null;

        if (!email) {
          const response = await fetch('https://api.github.com/user/emails', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const emails = await response.json();
          const primaryEmail = emails.find((email) => email.primary && email.verified);
          email = primaryEmail ? primaryEmail.email : null;
        }

        profile.email = email;




        let user = await User.findOne({
          $or: [{ githubId: profile.id }, { email: email }],
        });

        if (!user) {
          user = new User({
            githubId: profile.id,
            username: profile.username,
            email: email,
            avatar: profile.photos[0].value,
          });
          await user.save();
        }


        return done(null, profile);

      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;
