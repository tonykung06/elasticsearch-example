const ELASTICSEARCH = require('elasticsearch')
const elasticClient = new ELASTICSEARCH.Client({
	host: 'localhost:9200',
	apiVersion: '2.4'
})

elasticClient.get({
	index: 'simpsons',
	type: 'episode',
	id: 1
	// _sourceExclude: ['video_url']
	// _sourceInclude: ['video_url']
}).then(result => {
	console.log(result)
}).catch(err => {
	console.log(err)
})


