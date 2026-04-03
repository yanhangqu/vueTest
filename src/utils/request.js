import axios from "axios";

// 引入 store
import { useUserStore } from '../store/user';

// 1.创建axios实例（RestTemplate Bean）
const request = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

//2.请求拦截器(Filter)
request.interceptors.request.use(
  (config) => {
    console.log(`【请求拦截】发起请求：${config.url}`);

    // 实例化 Store
    const userStore = useUserStore();
    
    console.log("【l拦截器触发】当前的token是：",userStore.token);

    // 如果仓库右 Token ,就塞进请求头 Authorization 中
    if(userStore.token){
      // 这里的 'Bearer ' 后面带个空格，是国际标准的 JWT Token 格式
      // config.headers['Authorization'] = `Bearer ${userStore.token}`;
      // 建议改成这种写法，兼容性更好
      config.headers.Authorization = `Bearer ${userStore.token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

//3.响应拦截器
request.interceptors.response.use(
  (response) => {
    // 只有 HTTP 状态码是 2xx 时，才会走这里
    console.log(`[响应拦截] 接收成功:`, response);

    // 【核心精简】：剥离 Axios 的外层包装（status, headers 等）
    // 直接把后端真正的数据 (response.data) 返回给 .vue 页面！
    return response.data;
  },
  (error) => {
    // HTTP 状态码是非 2xx 时，走这里统一处理报错
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          console.error("Token 过期或未登录，请重新登录！");
          // 这里可以写跳转到登录页的逻辑，例如：router.push('/login')
          break;
        case 403:
          console.error("没有权限访问该接口！");
          break;
        case 404:
          console.error("请求的接口不存在！");
          break;
        case 500:
          console.error("Java 后端服务出错了！");
          break;
        default:
          console.error("未知网络错误！");
      }
    } else {
      console.error("网络连接超时或服务器宕机！");
    }

    // 把错误继续往外抛，让业务页面也能捕捉到
    return Promise.reject(error);
  },
);

// 暴露出去给别人用(相当于 public)
export default request;
