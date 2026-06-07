<template>
  <transition name="toast">
    <div
      v-if="visible"
      class="toast"
      :class="type"
    >
      <span class="icon">{{ icon }}</span>
      <span class="message">{{ message }}</span>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['close'])

const visible = ref(false)

const icons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️'
}

const icon = ref(icons[props.type])

let timer = null

watch(() => props.show, (newVal) => {
  if (newVal) {
    visible.value = true
    icon.value = icons[props.type]
    
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      visible.value = false
      emit('close')
    }, props.duration)
  }
})
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 90vw;
  
  &.success {
    border-left: 4px solid $color-success;
  }
  
  &.error {
    border-left: 4px solid $color-error;
  }
  
  &.warning {
    border-left: 4px solid $color-warning;
  }
  
  &.info {
    border-left: 4px solid $color-info;
  }
  
  .icon {
    font-size: 1.2rem;
  }
  
  .message {
    color: $color-text-primary;
    font-size: 0.95rem;
    font-weight: 500;
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}
</style>
