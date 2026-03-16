import { useUserInfoStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import type { DirectiveBinding } from "vue";

// 自定义按钮权限指令
const buttonPermission = {
  mounted(el:HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    if (value) {
      const store = useUserInfoStore()
      const { buttonPermissCodes } = storeToRefs(store) // store解构保持响应式
      // 是否有权限
      const hasPermiss = buttonPermissCodes.value.includes(value)
      if (!hasPermiss) {
        el.parentNode?.removeChild(el) // 移除没有权限的按钮
      }
    } else {
      ElMessage.warning('无权限码')
    }
  }
}

export default buttonPermission