const db = require('../db');
const createUser = (userID, username, password) => {
	const query = `
	INSERT INTO users(userID, username, password) 
	values ($1, $2, $3) 
	RETURNING *`;
	return db.one(query, [userID, username, password]);
};
module.exports = {
	createUser
};
