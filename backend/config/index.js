module.exports = {
	environment: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 5000,
	db: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		port: process.env.DOCKER_PORT || 5432,
		// port: process.env.DOCKER_PORT || 5433,
	},
	jwtConfig: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_EXPIRES_IN,
	},
};
