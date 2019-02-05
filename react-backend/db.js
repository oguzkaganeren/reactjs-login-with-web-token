const pgp = require('pg-promise')({
	// Initialization Options
});

// Preparing the connection details:
const cn = 'postgres://oguz:@localhost:5432/myDB';

// Creating a new database instance from the connection details:
const db = pgp(cn);
db.none(
	`CREATE TABLE users
		(
			userID character varying(11) COLLATE pg_catalog."default" NOT NULL,
			name character varying(20) COLLATE pg_catalog."default",
			surname character varying(20) COLLATE pg_catalog."default",
			address character varying(75) COLLATE pg_catalog."default",
			gender integer,
			typeID integer DEFAULT 0,
			birth date,
			mail character varying(50) COLLATE pg_catalog."default",
			username character varying(50) NOT NULL,
			password character varying(350) COLLATE pg_catalog."default" NOT NULL,
			register TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			lastLogin date,
			lastLoginIP character varying(15) COLLATE pg_catalog."default",
			CONSTRAINT user_pkey PRIMARY KEY (userID)
		);`
)
	.then(function(data) {
		console.log('Tables was created successfully');
	})
	.catch(function(error) {
		console.log(error);
	});

// Exporting the database object for shared use:
module.exports = db;
