const express = require('express')
const { faker } = require('@faker-js/faker')
const ProbabilisticCache = require('./probabilistic-cache')

const app = express()
const PORT = 3000

const cache = new ProbabilisticCache({ probability: 0.8 })

app.use(express.json())

app.post('/seed', async (req, res) => {
	await cache.set('aaa', 1000)
	await cache.set('bbb', 1000)
	res.send()
})

app.post('/', async (req, res) => {
	const key = faker.internet.userName().substring(0, 3)
	const value = faker.internet.email()
	await cache.set(key, value)
	res.send(`Successfully set key "${key}" with value "${value}"`)
})

app.get('/probabilistic/:key', async (req, res) => {
	const { key } = req.params
	const value = await cache.getProbabilistic(key)
	if (value) {
		res.send(`Value for key "${key}": ${value}`)
	} else {
		res.send(`Cache miss or key "${key}" not found`)
	}
})

app.get('/optimized/:key', async (req, res) => {
	const { key } = req.params
	const value = await cache.getOptimized(key)
	if (value) {
		res.send(`Value for key "${key}": ${value}`)
	} else {
		res.send(`Cache miss or key "${key}" not found`)
	}
})

app.delete('/:key', async (req, res) => {
	const { key } = req.params
	await cache.delete(key)
	res.send(`Key "${key}" deleted successfully`)
})

process.on('SIGINT', async () => {
	await cache.close()
	process.exit(0)
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
