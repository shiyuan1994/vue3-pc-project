// 防抖: 一段时间内，只执行最后一次，如果事件被重新触发，则重新开始计时
// 典型：输入框搜索/验证

import { onUnmounted, ref } from "vue";

/**
 * 
 * @param fn 传入的事件，方法
 * @param delay 定时器延迟时间
 * @param immediate 是否马上执行
 */
export function useDebounce(fn:Function, delay= 500, immediate = false) {
  const timer = ref<ReturnType<typeof setTimeout> | null>(null)
  const debounced = (...args: any[]) => {
    if (timer.value) clearTimeout(timer.value) // 如果开始计时了，则清除定时器重新计时
    timer.value = setTimeout(() => {
      timer.value = null
      if (!immediate) {
        // fn.apply(...args)
        fn.apply(args)
      }
    }, delay)
  }
  onUnmounted(() => {
    if (timer.value) clearTimeout(timer.value)
  })
  return debounced
}