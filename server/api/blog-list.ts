import { IncomingMessage, ServerResponse } from 'http';
import blogList from '~/server/data/blog-list.json';

export default (res: Response, req: Request) => {
  return blogList;
}