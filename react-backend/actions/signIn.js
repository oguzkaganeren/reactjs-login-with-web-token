const db = require('../db');
const findUserById = username => {
	const query = `
	SELECT * FROM users WHERE username=$1`;
	return db.oneOrNone(query, [username]);
};
const verifyUser = username => {
	const query = `
	SELECT * FROM users WHERE username=$1`;
	return db.oneOrNone(query, [username]);
};
module.exports = {
	findUserById,
	verifyUser
};
