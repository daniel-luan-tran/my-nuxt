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

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const res = event.node.res;
  const req = event.node.req

  if (method === 'GET') {
    // Handle GET request
    return await handleGetRequest(event);
  } else if (method === 'POST') {
    // Handle POST request
    return await handlePostRequest(event, res, req);
  } else if (method === 'PUT') {
    // Handle PUT request
    return await handlePutRequest(event, res, req);
  } else if (method === 'DELETE') {
    // Handle DELETE request
    return await handleDeleteRequest(event, res, req);
  } else {
    return { status: 405, message: 'Method Not Allowed' };
  }
});

async function handleGetRequest(event: any) {
  const params = {
    TableName: 'blog',
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    const blogList = data.Items as Blog[];
    return blogList;
  } catch (error: any) {
    return { status: 500, error: error.message };
  }
}

async function handlePostRequest(event: any, res: ServerResponse<IncomingMessage>, req: IncomingMessage) {
  const body = await parseBody(req);

  const params = {
    TableName: 'blog',
    Item: body,
  };

  try {
    await dynamoDb.put(params).promise();
    return { status: 200, message: 'Item created successfully' };
  } catch (error: any) {
    return { status: 500, error: error.message };
  }
}

async function handlePutRequest(event: any, res: ServerResponse<IncomingMessage>, req: IncomingMessage) {
  const body = await parseBody(req);

  const params = {
    TableName: 'blog',
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

async function handleDeleteRequest(event: any, res: ServerResponse<IncomingMessage>, req: IncomingMessage) {
  const params = {
    TableName: 'blog',
    Key: {
      // Your key attributes
    },
  };

  try {
    await dynamoDb.delete(params).promise();
    return { status: 200, message: 'Item deleted successfully' };
  } catch (error: any) {
    return { status: 500, error: error.message };
  }
}
