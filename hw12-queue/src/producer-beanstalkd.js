const { Client } = require('node-beanstalk')
const beanstalkdClient = new Client()

const QUEUE_NAME = 'test_queue'
const MESSAGE_COUNT = 1000
const MESSAGE_BATCH = 1000
const MESSAGE = '50 quids for my bro'

;(async () => {
	console.log('started producer')
	await beanstalkdClient.connect()
	await beanstalkdClient.use(QUEUE_NAME)

	console.log('connected')
	console.time('pubsub')
	for (let i = 0; i < MESSAGE_COUNT; i++) {
		const callsToRedis = []

		for (let j = 0; j < MESSAGE_BATCH; j++) {
			callsToRedis.push(beanstalkdClient.put(MESSAGE, 0, 60))
		}

		await Promise.allSettled(callsToRedis)
	}

	console.timeEnd('pubsub')
	console.log('end')
})()
