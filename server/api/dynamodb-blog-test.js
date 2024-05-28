import dynamoDb from '../utils/aws';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    // Handle GET request
    return await handleGetRequest(event);
  } else if (method === 'POST') {
    // Handle POST request
    return await handlePostRequest(event);
  } else if (method === 'PUT') {
    // Handle PUT request
    return await handlePutRequest(event);
  } else if (method === 'DELETE') {
    // Handle DELETE request
    return await handleDeleteRequest(event);
  } else {
    return { status: 405, message: 'Method Not Allowed' };
  }
});

async function handleGetRequest(event) {
  const params = {
    TableName: 'blog',
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return data.Items;
  } catch (error) {
    return { status: 500, error: error.message };
  }
}

async function handlePostRequest(event) {
  const body = await useBody(event);

  const params = {
    TableName: 'blog',
    Item: body,
  };

  try {
    await dynamoDb.put(params).promise();
    return { status: 200, message: 'Item created successfully' };
  } catch (error) {
    return { status: 500, error: error.message };
  }
}

async function handlePutRequest(event) {
  const body = await useBody(event);

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
      ':value': body.value,
    },
  };

  try {
    await dynamoDb.update(params).promise();
    return { status: 200, message: 'Item updated successfully' };
  } catch (error) {
    return { status: 500, error: error.message };
  }
}

async function handleDeleteRequest(event) {
  const body = await useBody(event);

  const params = {
    TableName: 'blog',
    Key: {
      // Your key attributes
    },
  };

  try {
    await dynamoDb.delete(params).promise();
    return { status: 200, message: 'Item deleted successfully' };
  } catch (error) {
    return { status: 500, error: error.message };
  }
}
