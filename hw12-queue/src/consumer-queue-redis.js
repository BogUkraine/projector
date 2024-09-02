const redis = require('redis')
const redisClient = redis.createClient()
redisClient.connect()

const QUEUE_NAME = 'test_queue'

;(async () => {
	console.log('started consumer')

	let counter = 0
	console.time('pubsub')
	while (true) {
		const message = await redisClient.lPop(QUEUE_NAME, 0)

		counter++
		if (counter % 1000000 == 0) {
			console.timeEnd('pubsub')
			console.time('pubsub')
		}
	}
})()
