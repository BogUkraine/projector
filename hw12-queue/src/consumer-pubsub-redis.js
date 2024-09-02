const redis = require('redis')
const redisClient = redis.createClient()
redisClient.connect()

const QUEUE_NAME = 'test_queue'

;(async () => {
	console.log('started consumer')

	let counter = 0
	console.time('pubsub')
	await redisClient.subscribe(QUEUE_NAME, (message) => {
		counter++
		if (counter % 1000000 == 0) {
			console.timeEnd('pubsub')
			console.time('pubsub')
		}
	})
})()
