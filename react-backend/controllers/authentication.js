const jwt = require('jwt-simple');
const config = require('../config');
const { createUser } = require('../actions/signUp');
const bcrypt = require('bcrypt');

const tokenForUser = user => {
	const timestamp = new Date().getTime();
	//console.log(user);
	return jwt.encode(
		{
			sub: user.id,
			iat: timestamp
		},
		config.secret
	);
};
const signin = (req, res, next) => {
	const { username, password } = req.body;
	console.log('test');
	if (!username || !password) {
		res.status(422).send({
			error: 'You must provide a username and a password'
		});
	} else {
		res.send({
			token: tokenForUser(req.user)
		});
	}
};

const signup = (req, res, next) => {
	const { userID, username, password } = req.body;
	const saltRounds = 12; //for hash
	if (!userID || !username || !password) {
		res.status(422).send({
			error: 'You must provide a tc, an email and a password'
		});
	} else {
		if (isNaN(userID)) {
			res.status(422).send({
				error: 'kullanici id should be integer'
			});
		} else {
			//buraya kullanıcıyı kim ekliyor gibisinden bi kontrol at
			if (userID.trim().length === 11) {
				if (username.trim().length > 3) {
					bcrypt
						.hash(password, saltRounds)
						.then(pass => {
							return createUser(userID, username, pass).then(newUser => {
								res.json({
									token: tokenForUser(newUser)
								});
							});
						})
						.catch(err => {
							return next(err);
						});
				} else {
					res.status(422).send({
						error: 'username should be greater than 3'
					});
				}
			} else {
				res.status(422).send({
					error: 'id should be 11'
				});
			}
		}
	}
};

module.exports = {
	signup,
	signin
};
