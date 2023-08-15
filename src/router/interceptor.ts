import { routes } from './routes';
import { BasicPageEnum } from '@/enums/pageEnum';
import { useUserStore } from '@/store/modules/user';

/**
 * 路由拦截
 * 对navigateTo|redirectTo|switchTab|reLaunch四个路由跳转方法进行拦截，检查登录状态
 * 没有对navigateBack进行拦截，因为系统级返回无法拦截，故这里统一不作处理
 * 改变登录状态后建议使用reLaunch重启应用
 * 注意：拦截uni.switchTab本身没有问题。但是在微信小程序端点击tabbar的底层逻辑并不是触发uni.switchTab。所以误认为拦截无效，此类场景的解决方案是在tabbar页面的页面生命周期onShow中处理。
 * https://uniapp.dcloud.net.cn/api/interceptor.html
 */
export function setupRouteInterceptor() {
  const userStore = useUserStore();
  const intercept = (args: Recordable) => {
    const url = args.url;
    const route = routes.find((item) => {
      return item.path === url;
    });
    if (route && !route.public) {
      const isLogin = userStore.isLogin;
      if (!isLogin) {
        const apiSuccess = args.success;
        args.success = (res: any) => {
          apiSuccess && apiSuccess(res);
          uni.redirectTo({
            url: BasicPageEnum.LOGIN
          });
        };
      }
    }
  };

  uni.addInterceptor('navigateTo', {
    invoke(args) {
      intercept(args);
    }
  });

  uni.addInterceptor('redirectTo', {
    invoke(args) {
      intercept(args);
    }
  });

  uni.addInterceptor('switchTab', {
    invoke(args) {
      intercept(args);
    }
  });

  uni.addInterceptor('reLaunch', {
    invoke(args) {
      intercept(args);
    }
  });
}
