const serverless = require('serverless-http');
const express = require("express");
const app = express();
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/cars", async (req, res) => {
  const data = req.body;
  const params = {
    TableName: "todoTable",
    Item: {
      id: uuidv4(),
      name: data.name
    },
  };

  try {
    await db.put(params).promise();
    res.status(201).json({ todo: params.Item });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/cars", async (req, res) => {
  const params = {
    TableName: "todoTable",
  };

  const result = await db.scan(params).promise();
  res.status(200).json({ cars: result });
});

app.patch("/cars/:id", async (req, res) => {
  const data = req.body;
  const params = {
    TableName: "todoTable",
    Item: {
      id: data.id,
      name: data.name
    },
  }
  await db.put(params).promise();
  res.status(200).json({ car: params.Item });
});

app.delete("/cars/:id", async (req, res) => {
  const params = {
    TableName: "todoTable",
    Key: {
      id: req.params.id
    },
  };

  await db.delete(params).promise();
  res.status(200).json({ success: true });

});

module.exports.app = serverless(app);