const { Client } = require('@elastic/elasticsearch')
const fs = require('fs')

const client = new Client({ node: 'http://localhost:9200' })

const bulkUpload = async () => {
	const data = fs.readFileSync('AWords.txt', 'utf8')
	const words = data.split('\n').filter((word) => word.trim() !== '')

	const bulkOps = []
	words.forEach((word) => {
		bulkOps.push({ index: { _index: 'autocomplete' } })
		bulkOps.push({ name: word.trim() })
	})

	try {
		await client.bulk({ refresh: true, body: bulkOps })
		console.log('Successfully indexed all words from the dictionary.')
	} catch (error) {
		console.error('Error during bulk upload:', error)
	}
}

bulkUpload()
