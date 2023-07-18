import { Requester } from './Requester';

import type { RequestOptions } from './types';

function createRequester(options: RequestOptions = {}) {
  return new Requester(options);
}

export const httpRequester = createRequester();
