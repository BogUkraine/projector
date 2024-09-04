const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200' })

const createIndex = async () => {
	try {
		await client.indices.delete({ index: 'autocomplete' }).catch((err) => {
			console.log(err)
		}) // delete if already exists

		await client.indices.create({
			index: 'autocomplete',
			body: {
				settings: {
					analysis: {
						filter: {
							autocomplete_filter: {
								type: 'edge_ngram',
								min_gram: 1,
								max_gram: 10,
							},
						},
						analyzer: {
							autocomplete: {
								type: 'custom',
								tokenizer: 'standard',
								filter: ['lowercase', 'autocomplete_filter'],
							},
						},
					},
				},
				mappings: {
					properties: {
						name: {
							type: 'text',
							analyzer: 'autocomplete',
							search_analyzer: 'standard',
						},
					},
				},
			},
		})

		console.log('Index created successfully')
	} catch (error) {
		console.error('Error creating index:', error)
	}
}

createIndex()
