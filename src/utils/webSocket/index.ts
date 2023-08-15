import { WebSocketRequester } from './Requester';

import type { ConstructorConfig } from './types';

export function createWebSocketRequester(config: ConstructorConfig) {
  return new WebSocketRequester(config);
}
