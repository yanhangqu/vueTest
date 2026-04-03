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
</style> -->



<!-- ===========前端分页============ -->
<!-- 
<template>
  <div class="user-container">
    
    <div class="search-box">
      <el-input 
        v-model="queryParams.name" 
        placeholder="请输入姓名搜索" 
        style="width: 250px; margin-right: 15px;" 
        clearable 
      />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button @click="resetQuery">重置</el-button>
    </div>

    <el-table v-loading="loading" :data="userList" border stripe style="width: 100%">
      <el-table-column prop="id" label="用户ID" width="100" align="center" />
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column prop="email" label="邮箱地址" width="250" />
      <el-table-column prop="phone" label="联系电话" />
    </el-table>

    <div class="pagination-box">
      <el-pagination
        v-model:current-page="queryParams.page"
        v-model:page-size="queryParams.limit"
        :page-sizes="[2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import request from '../utils/request';

// 1. 定义查询参数 (相当于 Java 的 QueryDTO)
// 【新知识点】：reactive 专门用来定义"对象"，比 ref 更适合处理表单数据。不需要写 .value！
const queryParams = reactive({
  name: '', // 搜索关键字
  page: 1,  // 当前页码
  limit: 5  // 每页条数 (为了演示分页，我们默认设为 5 条)
});

const loading = ref(false);
const userList = ref([]);
const total = ref(10); // JSONPlaceholder 的 /users 接口总共只有 10 条测试数据

// 2. 核心拉取数据方法
const fetchUsers = async () => {
  loading.value = true;
  try {
    // 【后端避坑指南】：
    // 在 Axios 中，发送 GET 请求带参数，必须包在 { params: {} } 对象里。
    // Axios 会自动帮你拼成 /users?_page=1&_limit=5 这种格式。
    const res = await request.get('/users', {
      params: {
        _page: queryParams.page,      // 对应接口的页码参数
        _limit: queryParams.limit,    // 对应接口的每页条数参数
        name_like: queryParams.name || undefined // 对应接口的模糊搜索 (如果是空字符串则传 undefined 忽略)
      }
    });
    
    // 把当前页的数据赋给表格
    userList.value = res;
    
    // 【真实的业务场景】：如果是你自己写的 Java 后端，通常会这么接数据：
    // userList.value = res.records; // 拿到 List
    // total.value = res.total;      // 拿到总条数
    
  } catch (error) {
    console.error("请求失败", error);
  } finally {
    loading.value = false;
  }
};

// 3. 定义各种交互事件方法
const handleSearch = () => {
  // 搜索时有一个铁律：必须把页码重置为第 1 页！
  // 否则如果你在第 5 页搜一个只有 1 条结果的名字，就会查不到数据。
  queryParams.page = 1; 
  fetchUsers();
};

const resetQuery = () => {
  queryParams.name = '';
  queryParams.page = 1;
  fetchUsers();
};

const handleSizeChange = (newSize) => {
  // 当用户在下拉框选择 "每页 10 条" 时，这个方法会被触发
  queryParams.limit = newSize;
  queryParams.page = 1; // 改变条数后，也建议回到第 1 页
  fetchUsers(); // 重新发请求
};

const handleCurrentChange = (newPage) => {
  // 当用户点击 "第 2 页" 时，这个方法会被触发
  queryParams.page = newPage;
  fetchUsers(); // 重新发请求拉取第 2 页数据
};

// 4. 页面加载完毕，自动查一次数据 (第 1 页，每页 5 条)
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.user-container {
  padding: 20px;
  background-color: #fff;
}
.search-box {
  margin-bottom: 20px;
  display: flex; /* 让输入框和按钮在一行 */
}
.pagination-box {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end; /* 让分页条靠右侧对齐，这是后台系统的标准规范 */
}
</style> -->


<!-- ==============增删改查================= -->

<template>
  <div class="user-container">
    
    <div class="search-box">
      <el-input v-model="queryParams.name" placeholder="请输入姓名搜索" style="width: 250px; margin-right: 15px;" clearable />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button @click="resetQuery">重置</el-button>
      <el-button type="success" plain @click="handleAdd" style="margin-left: auto;">+ 新增用户</el-button>
    </div>

    <el-table v-loading="loading" :data="userList" border stripe style="width: 100%">
      <el-table-column prop="id" label="用户ID" width="100" align="center" />
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column prop="email" label="邮箱地址" width="250" />
      <el-table-column prop="phone" label="联系电话" />
      
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template #default="scope">
          <el-button size="small" type="primary" link @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" link @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-box">
      <el-pagination v-model:current-page="queryParams.page" v-model:page-size="queryParams.limit" :page-sizes="[2, 5, 10]" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="500px" @close="resetForm">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话号码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import request from '../utils/request';
// 引入 Element 的消息提示组件
import { ElMessage, ElMessageBox } from 'element-plus'; 

// ================= 1. 原有的查询逻辑 =================
const queryParams = reactive({ name: '', page: 1, limit: 5 });
const loading = ref(false);
const userList = ref([]);
const total = ref(10);

const fetchUsers = async () => {
  loading.value = true;
  try {
    const res = await request.get('/users', { params: { _page: queryParams.page, _limit: queryParams.limit, name_like: queryParams.name || undefined } });
    userList.value = res;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => { queryParams.page = 1; fetchUsers(); };
const resetQuery = () => { queryParams.name = ''; queryParams.page = 1; fetchUsers(); };
const handleSizeChange = (newSize) => { queryParams.limit = newSize; queryParams.page = 1; fetchUsers(); };
const handleCurrentChange = (newPage) => { queryParams.page = newPage; fetchUsers(); };

// ================= 2. 🌟 新增的增删改查逻辑 =================

const dialogVisible = ref(false); 
const dialogTitle = ref('');      
const formRef = ref(null);        

// 表单绑定的对象 (DTO)
const form = reactive({
  id: null,
  name: '',
  email: '',
  phone: ''
});

// 前端参数校验规则
const rules = reactive({
  name: [
    { required: true, message: '姓名不能为空', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
  ]
});

// 点击新增按钮
const handleAdd = () => {
  dialogTitle.value = '新增用户';
  Object.assign(form, { id: null, name: '', email: '', phone: '' }); // 清空表单
  dialogVisible.value = true;
};

// 点击编辑按钮
const handleEdit = (row) => {
  dialogTitle.value = '编辑用户';
  Object.assign(form, row); // 将当前行数据回显到表单
  dialogVisible.value = true;
};

// 点击删除按钮
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要永久删除用户【${row.name}】吗？`, '系统提示', {
    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning',
  }).then(async () => {
    ElMessage.success('删除成功！(模拟)');
    fetchUsers(); 
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

// 关闭弹窗时清空红色的校验报错
const resetForm = () => {
  if (formRef.value) formRef.value.clearValidate();
};

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return;
  // 触发所有校验规则
  await formRef.value.validate(async (valid) => {
    if (valid) {
      // 校验通过，发送请求
      if (form.id != null) {
        ElMessage.success('修改成功！(模拟)');
      } else {
        ElMessage.success('新增成功！(模拟)');
      }
      dialogVisible.value = false;
      fetchUsers();                
    } else {
      console.log('表单校验不通过！');
      return false;
    }
  });
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.user-container { padding: 20px; background-color: #fff; }
.search-box { margin-bottom: 20px; display: flex; }
.pagination-box { margin-top: 20px; display: flex; justify-content: flex-end; }
</style>