# uni-app-boot

vite + vue3 + ts + uni-app(cli) 项目模板

### 特性

- uni-app cli 模式，便于后期做 CI/CD
- 自动导入 Vue API
- 简单、官方的 Typescript+Eslint+Prettier 配置
- Git 提交代码校验
- 路由拦截
- Pinia 状态持久化
- 已引入 uview-plus 组件库
- 基于 uni.request 易用的 HTTP 请求库
- 基于 uni 官方 API 封装 WebSocket 库

### 安装

- vscode 安装工作区推荐的插件
- .vscode/settings.json 为工作区设置，不建议覆盖已有配置（可添加其他配置）

### 多人开发过程中禁止私人修改的文件

- .vscode，ts，eslint，prettier 相关配置文件
- build 文件夹下的配置文件

如果需要修改，请自行协商，否则可能会出现代码冲突

### 代码格式化

- js，ts 文件：通过 vscode 的 eslint 插件，在保存时自动 fix
- 其他文件：保存时使用 prettier 插件格式化
- 代码提交时会执行格式化校验

### 环境变量

用于整个项目的参数，包括编译阶段+运行时用到的参数

在运行时使用环境变量：utils/env -> getEnv()

- .env 通用
- .env.development 本地开发环境
- .env.production 生产环境
- .env.test 预发布环境

### 文件夹结构和命名

- 除了组件和资源文件，都使用首字母小写的驼峰式命名
- 组件需要使用文件夹包裹起来，且采用首字母大写的驼峰式命名（为了方便在 setup 中使用：https://cn.vuejs.org/api/sfc-script-setup.html#using-components）
- 资源文件建议按页面分文件夹

### 别名

- /@/xxxx => /src/xxxx
- /#/xxxx => /types/xxxx

### HTTP 请求库

/@/utils/http/requester -> httpRequester

- 初始化配置：index -> createRequester 中传入 RequestOptions，所有配置参考 config 文件
- 发起请求单独配置（优先级最高）：get/post/put/delete 第二个参数传入 RequestOptions

配置优先级：发起请求配置 > createRequester 配置 > config 文件配置 > uni.request 默认配置

### 全局组件注册

- 需要在 components/registerGlobComp 中手动注册

### 一些特殊文件夹含义

- enums：TS 枚举值
- logics：与业务和框架耦合的全局逻辑代码
- settings：运行时的参数设置
- utils：完全通用的工具代码（可直接拖到其他项目也能使用）
- hooks：Vue3 Hooks

### 路由拦截

请在 router/routes 中配置页面
