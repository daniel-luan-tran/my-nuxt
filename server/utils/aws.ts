import AWS from 'aws-sdk';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
console.log('region', process.env.REGION);
export const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

export const dynamoDbClient = new DynamoDBClient({
  region: process.env.REGION,
});
