const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { findUserById, verifyUser } = require('../actions/signIn');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const localOptions = {
	usernameField: 'username'
};

const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
	return verifyUser(username)
		.then(validUser => {
			if (validUser) {
				bcrypt
					.compare(password, validUser.password)
					.then(validPassword => {
						if (validPassword) {
							return done(null, validUser);
						}
						return done(null, false);
					})
					.catch(err => done(err, false));
			} else {
				done({ message: 'invalid e-mail address or password' }, false);
			}
		})
		.catch(err => done(err, false));
});
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secret
};
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	return findUserById(payload.sub)
		.then(foundUser => {
			if (foundUser) {
				return done(null, foundUser);
			}
			return done(null, false);
		})
		.catch(err => done(err, false));
});
passport.use(jwtLogin);
passport.use(localLogin);
