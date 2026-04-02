<template>
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
import request from "../utils/request";

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
</style>
