// 节流：固定时间内执行一次
// 典型： 高频按钮点击，滚动条、拖拽

import { onUnmounted, ref } from "vue";

/**
 * 
 * @param fn 传入的事件，方法
 * @param delay 定时器延迟时间
 */
export function useThrottle(fn:Function, delay = 500) {
  const timer = ref<ReturnType<typeof setTimeout> | null>(null)

  const throttled = (...args: any[]) => {
    if (timer.value) return // 如果已经进入定时循环则返回

    timer.value = setTimeout(() => {
      fn.apply(args)
      timer.value = null
    }, delay)
  }

  onUnmounted(() => {
    if (timer.value) clearTimeout(timer.value)
  })

  return throttled
}
