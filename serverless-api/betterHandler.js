'use strict'

const serverless = require('serverless-http');
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

module.exports = {

    get: async(event, context) => {      
        const params = {
            TableName: "todoTable",
          };
        
          const result = await db.scan(params).promise();
          return {
              statusCode: 200,
              body: JSON.stringify({ cars: result} )
          }
    },

    post: async(event, context) => {    
        var data = event.body;
        data = JSON.parse(data)

        const params = {
            TableName: "todoTable",
            Item: {
                id: uuidv4(),
                name: data.name
              },
          };
        
        try {
            await db.put(params).promise();
            return {
                statusCode: 201,
                body: JSON.stringify({todo: params.Item})
            }
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify({error: err.message})
            }
        }
    },

    delete: async(event, context) => {  
        const params = {
            TableName: "todoTable",
            Key: {
                id: event.pathParameters.id
            }
          };
        
          await db.delete(params).promise();
          return {
              statusCode: 200,
              body: JSON.stringify({ success: true} )
          }
    },

    update: async(event, context) => {  
        var data = event.body;
        data = JSON.parse(data)

        const params = {
            TableName: "todoTable",
            Item: {
                id: event.pathParameters.id,
                name: data.name
            }
          };
        
        try {
            await db.put(params).promise();
            return {
                statusCode: 201,
                body: JSON.stringify({todo: params.Item})
            }
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify({error: err.message})
            }
        }
    },

}
