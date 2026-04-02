<!-- <template>
  <div class="container">
    <h1>你好，Java 后端大佬！</h1>
    <p>当前状态：{{ message }}</p>
    
    <button @click="getData">点击模拟请求后端接口</button>
  </div>
</template>

<script setup>
// 引入 ref，这是 Vue3 用来定义响应式数据的核心
import { ref } from 'vue';

// 1. 定义一个响应式变量（相当于页面上的状态）
const message = ref("暂无数据，请点击按钮");

// 2. 定义一个箭头函数，模拟请求后端
const getData = async () => {
  // 模拟网络延迟 1 秒
  message.value = "正在加载数据中...";
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 重点避坑：在 JS 代码中修改 ref 变量的值，必须加上 .value！
  message.value = "请求成功！拿到了 Java 后端返回的 JSON 数据！";
};
</script>

<style scoped>
/* scoped 表示这里的样式只在这个文件生效，不会污染其他页面 */
.container {
  text-align: center;
  margin-top: 50px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
}
</style> -->

<!-- 模拟请求 -->

<!-- <template>
  <div class="container">
    <h2>系统用户列表</h2>

    <div v-if="loading" class="loading-text">
      正在拼命从 Java 后端加载数据...
    </div>

    <div v-else>
      <div v-if="userList.length === 0">暂无用户数据</div>

      <ul v-else class="user-list">
        <li v-for="user in userList" :key="user.id" class="user-item">
          <span class="id">#{{ user.id }}</span>
          <span class="name">{{ user.name }}</span>
          <span class="role">{{ user.role === 'admin' ? '管理员' : '普通用户' }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 这次我们多引入了一个 onMounted
import { ref, onMounted } from 'vue';

// 1. 定义状态
const loading = ref(false); // 是否正在加载
const userList = ref([]);   // 用户列表，初始为空数组（接收后端的 List）

// 2. 模拟一个调用 Java 接口获取 List<User> 的方法
const fetchUsersFromBackend = async () => {
  loading.value = true; // 开启 loading 状态
  
  try {
    // 模拟 1.5 秒的网络延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 模拟后端返回的 JSON 数组
    const responseData = [
      { id: 101, name: "张三", role: "admin" },
      { id: 102, name: "李四", role: "user" },
      { id: 103, name: "王五", role: "user" }
    ];
    
    // 把后端返回的数据赋值给我们的响应式变量
    userList.value = responseData;
    
  } catch (error) {
    console.error("请求报错了", error);
  } finally {
    loading.value = false; // 无论成功失败，关闭 loading
  }
};

// 3. 页面一加载，自动执行的方法！
onMounted(() => {
  console.log("页面 DOM 已就绪，准备拉取数据...");
  fetchUsersFromBackend();
});
</script>

<style scoped>
.container { padding: 20px; max-width: 400px; margin: 0 auto; }
.loading-text { color: #f39c12; font-weight: bold; }
.user-list { list-style: none; padding: 0; }
.user-item { 
  display: flex; 
  justify-content: space-between; 
  padding: 10px; 
  border-bottom: 1px solid #eee; 
}
.role { color: #888; font-size: 0.9em; }
</style> -->

<!-- ========================请求后端并动态渲染数据=============================== -->
<!-- 
<template>
  <div class="container">
    <h2>real api request</h2>

    <button @click="fetchUsersFromBackend" class="fetch-btn">
      click and send request to server
    </button>

    <div v-if="loading" class="loading-text">it is request data by Axios</div>

    <div v-else>
      <div v-if="userList.length === 0">there is no user data</div>

      <ul v-else class="user-list">
        <li v-for="user in userList" :key="user.id" class="user-item">
          <span class="id">{{ user.id }}</span>
          <span class="name">{{ user.name }}</span>
          <span class="email">{{ user.email }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
//【重点】引入我们自己封装的request工具
import request from "./utils/request";

const loading = ref(false);
const userList = ref([]);

// 真实的请求方法
const fetchUsersFromBackend = async () => {
  loading.value = true;

  try {
    //【核心代码】：使用await 等待 请求 返回结果，用我们封装的request请求
    const res = await request.get("/users");
    console.log("axios real response data:", res);

    userList.value = res;
  } catch (error) {
    console.log("http request error:", error);
  } finally {
    loading.value = false;
  }
};

// onMounted(() => {
//   fetchUsersFromBackend();
// });
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
}
.fetch-btn {
  height: 50px;
  margin-bottom: 20px;
  padding: 1opx 15px;
  background-color: #888;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.fetch-btn:hover {
  background-color: antiquewhite;
}
.loading-text {
  color: aqua;
  font-weight: bold;
}
.user-list {
  list-style: none;
  padding: none;
}
.user-item {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #eee;
}
.email {
  color: #888;
  font-size: 0.9em;
}
</style> -->

<!-- ==================使用ElementPlus============================= -->
<!-- <template>
  <div class="container">
    <h2>企业级高颜值数据表格</h2>

    <el-button
      type="primary"
      @click="fetchUserFromBackend"
      style="margin-bottom: 20px"
    >
      获取后端用户数据
    </el-button>
    <el-table
      v-loading="loading"
      :data="userList"
      :border
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="用户id" width="100" :align="center" />
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column prop="email" label="邮箱地址" width="250" />
      <el-table-column prop="phone" label="联系电话" />
      <el-table-column prop="website" label="个人网站" />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import request from "./utils/request";

const loading = ref(false);
const userList = ref([]);

const fetchUserFromBackend = async () => {
  loading.value = true;
  try {
    const res = await request.get("/users");
    userList.value = res;
  } catch (error) {
    console.error("请求报错:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.container {
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

h2 {
  color: aqua;
  margin-bottom: 30px;
}
</style> -->

<!-- ==============增加路由router=================== -->
<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="aside">
      <h3 class="logo">java 管理后台</h3>
      <el-menu
        router
        :default-active="$route.path"
        background-color="#304156"
        text-color="#fff"
      >
        <el-menu-item index="/home">
          <span>系统首页</span>
        </el-menu-item>
        <el-menu-item index="/users">
          <span>用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <span class="welcome">欢迎回来，超级管理员</span>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
/* 简单的骨架样式，保证撑满全屏 */
.layout-container {
  height: 100vh;
}
.aside {
  background-color: #304156;
}
.logo {
  color: white;
  text-align: center;
  padding: 20px 0;
  margin: 0;
}
.header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.welcome {
  color: #666;
  font-size: 14px;
}
.el-menu {
  border-right: none;
} /* 去除菜单默认的自带边框 */
</style>
