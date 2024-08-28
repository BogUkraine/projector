const redis = require('redis')

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

class ProbabilisticCache {
	IS_WAITING_FOR_UPDATE_PREFIX = 'toBeUpdated'
	DEFAULT_EXPIRY = 30

	constructor({ probability = 0.8 }) {
		this.probability = probability
		this.currentProbability = probability

		this.client = redis.createClient({
			url: 'redis://localhost:6379',
		})

		this.client.on('error', (err) => {
			console.error('Redis client error:', err)
		})

		this.client.connect()
	}

	async set(key, value, expiry = this.DEFAULT_EXPIRY) {
		try {
			await this.client.set(key, value, {
				EX: expiry,
			})
			console.log(`Set key "${key}" with expiry ${expiry} seconds.`)

			return value
		} catch (error) {
			console.error('Error setting value in Redis:', error)
		}
	}

	async getProbabilistic(key) {
		const randomNum = Math.random()
		if (randomNum > this.probability) {
			const valueFromDb = 20
			await this.set(key, valueFromDb)

			this.currentProbability = this.probability
			return valueFromDb
		}

		const [value, ttl] = await this.client.multi().get(key).ttl(key).exec()

		if (!value) {
			const valueFromDB = 10 // here should be DB call.
			await this.set(key, valueFromDB)
			return valueFromDB
		}

		if (ttl < 60) {
			this.currentProbability -= 0.01
		}
		return value
	}

	async getOptimized(key, counter = 0) {
		try {
			// if we tried to get value 3 times with no response -> take from db and set to redis.
			// supposed a call to set from db in separate thread has failed
			if (counter >= 3) {
				await this.setValueFromDB(key)
			}

			// if cache is hit, return the value
			const value = await this.client.get(key)
			if (value) {
				console.log(`Cache hit for key "${key}".`)
				return value
			}

			console.log(`Cache miss for key "${key}".`)

			// if cache is going to be updated from a different thread -> wait and retry
			const isGoingToBeUpdated = await this.client.get(this.formToBeUpdatedKey(key))
			if (isGoingToBeUpdated) {
				await delay(50)
				return await this.getOptimized(key, ++counter)
			}

			// if cache is not going to be updated from a different thread -> update it here
			await this.set(this.formToBeUpdatedKey(key), 1) // mark this key to be updated
			return await this.setValueFromDB(key) // update the key and flush the mark
		} catch (error) {
			console.error('Error getting value from Redis:', error)
			return null
		}
	}

	async delete(key) {
		try {
			await this.client.del(key)
			console.log(`Deleted key "${key}".`)
		} catch (error) {
			console.error('Error deleting key in Redis:', error)
		}
	}

	async close() {
		await this.client.quit()
		console.log('Redis client disconnected.')
	}

	formToBeUpdatedKey(key) {
		return `${this.IS_WAITING_FOR_UPDATE_PREFIX}-${key}`
	}

	async setValueFromDB(key) {
		const valueFromDB = 10 // here should be DB call.
		await this.client
			.multi()
			.set(key, valueFromDB, {
				EX: this.DEFAULT_EXPIRY,
			})
			.set(this.formToBeUpdatedKey(key), 0)
			.exec() // transaction
		return valueFromDB
	}
}

module.exports = ProbabilisticCache
