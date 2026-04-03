<template>
  <div class="login-container">
    <el-card class="login-card" header="🚀 欢迎登录 Java 管理后台">
      <el-input 
        v-model="loginForm.username" 
        placeholder="请输入用户名 (随便输)" 
        style="margin-bottom: 20px;" 
      />
      <el-input 
        v-model="loginForm.password" 
        type="password" 
        placeholder="请输入密码 (随便输)" 
        style="margin-bottom: 20px;" 
        @keyup.enter="doLogin" 
      />
      
      <el-button type="primary" style="width: 100%;" @click="doLogin">
        立 即 登 录
      </el-button>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
// 1. 引入我们写的“金库”
import { useUserStore } from '../store/user';

const router = useRouter();
const userStore = useUserStore(); // 实例化金库

const loginForm = reactive({
  username: '',
  password: ''
});

const doLogin = () => {
  if (!loginForm.username) {
    alert("用户名不能为空！");
    return;
  }

  // 【模拟调用后端 Java 登录接口】
  // 现实中这里会是一个 await request.post('/login', loginForm)
  console.log("正在向后端发送账号密码...", loginForm);

  // 假设后端校验成功，返回了以下数据：
  const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9Token";
  const mockName = loginForm.username;

  // 2. 【核心动作】：把数据存进 Pinia！(它会自动帮你同步到硬盘 LocalStorage)
  userStore.setToken(mockToken);
  userStore.setUsername(mockName);

  // 3. 登录成功，强制跳转到系统首页
  router.push('/home');
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b; /* 经典的后台深色背景 */
}
.login-card {
  width: 400px;
}
</style>