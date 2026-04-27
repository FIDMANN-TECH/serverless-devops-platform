const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

const USERS_TABLE = process.env.USERS_TABLE;

exports.createUser = async (user) => {
  await db.put({
    TableName: USERS_TABLE,
    Item: user
  }).promise();
};

exports.getUserByEmail = async (email) => {
  const result = await db.query({
    TableName: USERS_TABLE,
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email
    }
  }).promise();

  return result.Items[0];
};