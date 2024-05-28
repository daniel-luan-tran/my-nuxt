import {
  handleGetRequest,
  handlePostRequest,
  handlePutRequest,
  handleDeleteRequest
} from '../utils/apiHandler';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const res = event.node.res;
  const req = event.node.req;

  if (method === 'GET') {
    // Handle GET request
    return await handleGetRequest(event, 'blog');
  } else if (method === 'POST') {
    // Handle POST request
    return await handlePostRequest(event, res, req, 'blog');
  } else if (method === 'PUT') {
    // Handle PUT request
    return await handlePutRequest(event, res, req, 'blog');
  } else if (method === 'DELETE') {
    // Handle DELETE request
    return await handleDeleteRequest(event, res, req, 'blog');
  } else {
    return { status: 405, message: 'Method Not Allowed' };
  }
});
