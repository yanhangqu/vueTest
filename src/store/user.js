import { defineStore } from "pinia";
import { ref } from "vue";

// 定义并到处一个名叫 useUserStroe 的仓库
// 第一个参数 'user' 是这个仓库的唯一 id
export const useUserStore = defineStore(
  "user",
  () => {
    //1.定义状态 （State）-> 相当于 java 类的属性
    const token = ref("");
    const username = ref("");

    // 2. 定义动作 （Actions） -> 相当于 java 类的 public 方法
    const setToken = (newToken) => {
      token.value = newToken;
    };

    const setUsername = (newName) => {
      username.value = newName;
    };

    const logout = () => {
      token.value = "";
      username.value = "";
    };

    // 3. 必须把外部需要用到的变量和方法 return 出去
    return {
      token,
      username,
      setToken,
      setUsername,
      logout,
    };
  },
  // 4. 【核心魔法】开启持久化
  // 只要写了这一行，token和username改变时会自动存入浏览器 LocalStorage，刷新不丢失
  {
    persist: true,
  },
);
