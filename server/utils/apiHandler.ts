import dynamoDb from '../utils/aws';
import type { Blog } from '~/types';
import { ServerResponse, IncomingMessage } from 'http';

async function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

export async function handleGetRequest(event: any, tableName: string) {
  const params = {
    TableName: tableName,
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    const blogList = data.Items as Blog[];
    return blogList;
  } catch (error: any) {
    return { status: 500, error: error.message };
  }
}

export async function handlePostRequest(event: any, res: ServerResponse<IncomingMessage>, req: IncomingMessage, tableName: string) {
  const body = await parseBody(req);

  const params = {
    TableName: tableName,
    Item: body,
  };

  try {
    await dynamoDb.put(params).promise();
    return { status: 200, message: 'Item created successfully' };
  } catch (error: any) {
    return { status: 500, error: error.message };
  }
}

export async function handlePutRequest(event: any, res: ServerResponse<IncomingMessage>, req: IncomingMessage, tableName: string) {
  const body = await parseBody(req);

  const params = {
    TableName: tableName,
    Key: {
      // Your key attributes
    },
    UpdateExpression: 'set #attr = :value',
    ExpressionAttributeNames: {
      '#attr': 'attributeName',
    },
    ExpressionAttributeValues: {
      ':value': body ,
    },
  };

  try {
    await dynamoDb.update(params).promise();
    return { status: 200, message: 'Item updated successfully' };
  } catch (error: any) {
    return { status: 500, error: error.message };
  }
}

export async function handleDeleteRequest(event: any, res: ServerResponse<IncomingMessage>, req: IncomingMessage, tableName: string) {
  const body = await parseBody(req);

  const params = {
    TableName: tableName,
    Key: {
      id: body.id,
    },
  };

  try {
    await dynamoDb.delete(params).promise();
    const data = await dynamoDb.scan(params).promise();
    const blogList = data.Items as Blog[];
    return blogList;
  } catch (error: any) {
    return { status: 500, error: error.message };
  }
}