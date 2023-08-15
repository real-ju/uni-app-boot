import type { ConstructorConfig, SubscribeFunc } from './types';

import { SendMsgType } from './types';
import { throttle } from '../index';
import { useUserStore } from '@/store/modules/user';

export class WebSocketRequester {
  // 配置
  config: ConstructorConfig;
  // WebSocket准备完成
  ready: boolean = false;
  // uni SocketTask https://uniapp.dcloud.net.cn/api/request/socket-task.html
  socketTask: UniApp.SocketTask | null = null;
  // @ts-ignore 刷新SocketTask
  refreshSocketTask: Function;
  // 心跳包发送定时器
  heartTimer: NodeJS.Timeout | null = null;
  // 心跳包回应超时处理定时器
  heartResponseTimer: NodeJS.Timeout | null = null;
  // 订阅消息回调函数列表
  subscribeFuncList: SubscribeFunc[] = [];

  constructor(config: ConstructorConfig) {
    this.throttleRefreshSocketTask();
    this.config = config;
    if (config.autoConnect !== false) {
      this.initSocketTask();
    }
  }

  /**
   * 节流化refreshSocketTask方法，因为该方法在多个地方调用，可能会引起死循环
   */
  throttleRefreshSocketTask() {
    const refreshSocketTask = () => {
      if (this.heartTimer) {
        clearInterval(this.heartTimer);
      }
      if (this.heartResponseTimer) {
        clearTimeout(this.heartResponseTimer);
      }
      this.heartTimer = null;
      this.heartResponseTimer = null;
      this.socketTask!.close({
        success: () => {
          this.socketTask = null;
          this.initSocketTask();
        }
      });
    };
    this.refreshSocketTask = throttle(refreshSocketTask, 5000);
  }

  /**
   * 初始化SocketTask
   */
  initSocketTask() {
    this.ready = false;
    this.createSocketTask();
  }

  /**
   * 创建SocketTask
   */
  createSocketTask() {
    const userStore = useUserStore();
    const { url } = this.config;
    const header: Recordable = {};
    if (userStore.isLogin) {
      const token = userStore.getToken;
      header['Authorization'] = token;
    }
    const socketTask = uni.connectSocket({
      url,
      header,
      success: () => {}, // uni api不加success默认使用Promise方式，但微信的该api不支持
      fail: () => {
        throw 'connectSocket:fail';
      }
    });

    if (socketTask) {
      socketTask.onOpen(this.onOpen.bind(this));
      socketTask.onClose(this.onClose.bind(this));
      socketTask.onError(this.onError.bind(this));
      socketTask.onMessage(this.onMessage.bind(this));

      this.socketTask = socketTask;
    }
  }

  /**
   * 定时发送心跳包
   */
  initHeartCheck() {
    this.heartTimer = setInterval(async () => {
      await this._send('connectTest', SendMsgType.HEART);
      this.heartResponseTimer = setTimeout(() => {
        this.refreshSocketTask();
      }, 10 * 1000);
    }, 60 * 1000);
  }

  /**
   * 心跳包回应成功后清除heartResponseTimer定时器
   */
  handleHeartCheckSuccess() {
    if (this.heartResponseTimer) {
      clearTimeout(this.heartResponseTimer);
    }
  }

  onOpen(result: UniNamespace.OnSocketOpenCallbackResult) {
    this.ready = true;
    // 连接成功后发送心跳包
    this.initHeartCheck();
  }

  onClose(result: any) {
    if (result.code !== 1000) {
      // code=1000时为调用接口正常关闭
      this.refreshSocketTask();
    }
  }

  onError(result: UniNamespace.GeneralCallbackResult) {
    this.refreshSocketTask();
  }

  onMessage(result: UniNamespace.OnSocketMessageCallbackResult) {
    const data = JSON.parse(result.data);

    if (data) {
      if (data.type === 'heart') {
        this.handleHeartCheckSuccess();
      } else if (data.type === 'message') {
        this.subscribeFuncList.forEach((func) => {
          func(JSON.parse(data.data));
        });
      }
    }
  }

  _send(data: any, type: SendMsgType = SendMsgType.MESSAGE): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.ready) {
        reject(new Error('WebSocket未准备完成'));
        return;
      }

      this.socketTask!.send({
        data: JSON.stringify({
          type,
          data
        }),
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          reject(res);
        }
      });
    });
  }

  /**
   * 手动连接
   */
  connect() {
    this.initSocketTask();
  }

  /**
   * 订阅消息回调
   */
  subscribe(func: SubscribeFunc | SubscribeFunc[]) {
    if (!Array.isArray(func)) {
      func = [func];
    }
    this.subscribeFuncList.push(...func);
  }

  /**
   * 取消订阅消息回调
   */
  cancelSubscribe(func: SubscribeFunc | SubscribeFunc[]) {
    if (!Array.isArray(func)) {
      func = [func];
    }
    this.subscribeFuncList = this.subscribeFuncList.filter((item) => {
      return !(func as SubscribeFunc[]).includes(item);
    });
  }

  /**
   * 发送消息
   */
  send(data: any): Promise<any> {
    return this._send(data, SendMsgType.MESSAGE);
  }
}
