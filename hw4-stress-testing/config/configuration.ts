import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export default () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	database: {
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		db: process.env.POSTGRES_DB,
		port: process.env.POSTGRES_CONTAINER_PORT,
		host: process.env.POSTGRES_HOST,
	},
})
