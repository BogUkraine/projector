const redis = require('redis')
const redisClient = redis.createClient()
redisClient.connect()

const MESSAGE_COUNT = 10000
const MESSAGE_BATCH = 1000
const QUEUE_NAME = 'test_queue'
const MESSAGE = '50 quids for my bro'

;(async () => {
	console.log('started producer')

	console.time('pubsub')
	for (let i = 0; i < MESSAGE_COUNT; i++) {
		const callsToRedis = []

		for (let j = 0; j < MESSAGE_BATCH; j++) {
			callsToRedis.push(redisClient.lPush(QUEUE_NAME, MESSAGE))
		}

		await Promise.allSettled(callsToRedis)
	}

	console.timeEnd('pubsub')
})()
