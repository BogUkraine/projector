const { Client } = require('node-beanstalk')
const beanstalkdClient = new Client()

const QUEUE_NAME = 'test_queue'
;(async () => {
	console.log('started consumer')

	await beanstalkdClient.connect()
	await beanstalkdClient.use(QUEUE_NAME)
	await beanstalkdClient.watch(QUEUE_NAME)

	let counter = 0
	console.time('pubsub')
	while (true) {
		await beanstalkdClient.reserve()

		counter++
		if (counter % 1000000 == 0) {
			console.timeEnd('pubsub')
			console.time('pubsub')
		}
	}
})()
