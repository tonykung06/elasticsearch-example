'use strict';

const csv = require('csvtojson');
const ELASTICSEARCH = require('elasticsearch');
const path = require('path')
const Episodes = path.join(__dirname, '../dataset/simpsons_episodes.csv');
const ESCLUSTER = 'http://localhost:9200';
const INDEX = 'simpsons';
const TYPE = 'episode';
const BULK = [];
const CLIENT = new ELASTICSEARCH.Client({
    host: ESCLUSTER,
    apiVersion: '2.4'
});

console.log('Bulk import into Elasticsearch from file', Episodes);
module.exports = new Promise((resolve, reject) => {
    csv()
        .fromFile(Episodes)
        .on('json',(obj) => {
            BULK.push(
                {index: {_index: INDEX, _type: TYPE, _id: obj.id } },
                obj
            );
            console.log(`Adding ${obj.id} to array`);
        })
        .on('end',() => {
            CLIENT.bulk({
                body: BULK
            }, (err) => {
                if (err) {
                    console.log(err);
                    reject(err)
                    return
                } 
                resolve()
                console.log('Processing complete');
            })
        });
})
