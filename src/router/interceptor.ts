import { routes } from './config';
import { BasicPageEnum } from '@/enums/pageEnum';

export function setupRouteInterceptor() {
  const intercept = (url: string, args: Recordable) => {
    const route = routes.find((item) => {
      return item.path === url;
    });
    if (route && !route.public) {
      const apiSuccess = args.success;
      args.success = (res: any) => {
        apiSuccess(res);
        uni.redirectTo({
          url: BasicPageEnum.LOGIN
        });
      };
    }
  };
  uni.addInterceptor('navigateTo', {
    invoke(args) {
      intercept(args.url, args);
    }
  });
  uni.addInterceptor('redirectTo', {
    success(args) {
      intercept(args.url, args);
    }
  });
  uni.addInterceptor('reLaunch', {
    success(args) {
      intercept(args.url, args);
    }
  });
  uni.addInterceptor('switchTab', {
    success(args) {
      intercept(args.url, args);
    }
  });
}
