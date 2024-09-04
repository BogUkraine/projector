const express = require('express')
const { Client } = require('@elastic/elasticsearch')
const elasticClient = new Client({ node: 'http://localhost:9200' })

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/autocomplete', async (req, res) => {
	const { query } = req.query

	if (!query) {
		return res.status(400).send({ error: 'Query parameter is required' })
	}

	try {
		const result = await elasticClient.search({
			index: 'autocomplete',
			body: {
				query: {
					multi_match: {
						query,
						fields: ['name'],
						fuzziness: 'AUTO',
					},
				},
			},
		})

		console.log('🚀 ~ app.get ~ result.hits:', result.hits)
		res.send(result.hits.hits.map((hit) => hit._source).map((item) => item.name))
	} catch (error) {
		res.status(500).send({ error: error.message })
	}
})

process.on('SIGINT', async () => {
	process.exit(0)
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
