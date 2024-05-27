import { IncomingMessage, ServerResponse } from 'http';
import blogList from '~/server/data/blog-list.json'

export default (res: IncomingMessage, req: ServerResponse) => {
  return blogList
}