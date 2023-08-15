export interface ConstructorConfig {
  // wss url
  url: string;
  // 是否自动连接
  autoConnect?: boolean;
}

export enum SendMsgType {
  MESSAGE = 'message',
  HEART = 'heart'
}

export type SubscribeFunc = (data: any) => void; // data 服务器返回的数据
