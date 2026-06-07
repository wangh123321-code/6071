<template>
  <div class="modal-overlay" @click.self="handleClose">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>📹 预约视频看猫</h3>
        <button class="close-btn" @click="handleClose">✕</button>
      </div>
      
      <div class="modal-body">
        <div class="cat-info-bar">
          <LazyImage :src="cat.avatar" :alt="cat.name" class="cat-avatar" />
          <div class="cat-basic">
            <h4>{{ cat.name }}</h4>
            <p>{{ cat.breed }} · {{ cat.ageText }}</p>
          </div>
        </div>
        
        <form @submit.prevent="handleSubmit" class="appointment-form">
          <div class="form-row">
            <div class="form-group">
              <label for="name">您的姓名 <span class="required">*</span></label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="请输入您的姓名"
                required
              />
            </div>
            <div class="form-group">
              <label for="phone">联系电话 <span class="required">*</span></label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                placeholder="请输入您的手机号"
                required
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="date">预约日期 <span class="required">*</span></label>
              <input
                id="date"
                v-model="form.date"
                type="date"
                :min="minDate"
                required
              />
            </div>
            <div class="form-group">
              <label for="time">预约时间 <span class="required">*</span></label>
              <select id="time" v-model="form.time" required>
                <option value="">请选择时间段</option>
                <option v-for="slot in timeSlots" :key="slot.value" :value="slot.value">
                  {{ slot.label }}
                </option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="method">视频方式 <span class="required">*</span></label>
            <div class="radio-group">
              <label class="radio-item">
                <input type="radio" v-model="form.method" value="wechat" />
                <span class="radio-custom"></span>
                <span>微信视频</span>
              </label>
              <label class="radio-item">
                <input type="radio" v-model="form.method" value="qq" />
                <span class="radio-custom"></span>
                <span>QQ视频</span>
              </label>
              <label class="radio-item">
                <input type="radio" v-model="form.method" value="other" />
                <span class="radio-custom"></span>
                <span>其他方式</span>
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label for="contactId">
              {{ form.method === 'wechat' ? '微信号' : form.method === 'qq' ? 'QQ号' : '联系方式' }}
              <span class="required">*</span>
            </label>
            <input
              id="contactId"
              v-model="form.contactId"
              type="text"
              :placeholder="form.method === 'wechat' ? '请输入微信号' : form.method === 'qq' ? '请输入QQ号' : '请输入联系方式'"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="remark">备注信息</label>
            <textarea
              id="remark"
              v-model="form.remark"
              rows="3"
              placeholder="有什么想了解的可以提前告诉我们..."
            ></textarea>
          </div>
          
          <div class="agreement">
            <label class="checkbox-item">
              <input type="checkbox" v-model="form.agreed" required />
              <span class="checkbox-custom"></span>
              <span>我已阅读并同意<a href="#" @click.prevent="showAgreement = true">《领养须知》</a></span>
            </label>
          </div>
          
          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="handleClose">
              取消
            </button>
            <button type="submit" class="submit-btn" :disabled="loading">
              <span v-if="loading" class="btn-spinner"></span>
              {{ loading ? '提交中...' : '提交预约' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <div v-if="showAgreement" class="agreement-modal" @click.self="showAgreement = false">
      <div class="agreement-content">
        <h3>📋 领养须知</h3>
        <div class="agreement-text">
          <h4>一、领养条件</h4>
          <ul>
            <li>年满18周岁，具有完全民事行为能力</li>
            <li>有稳定的住所和收入来源</li>
            <li>家人均同意饲养宠物</li>
            <li>了解养猫的基本常识和责任</li>
          </ul>
          
          <h4>二、领养人的责任</h4>
          <ul>
            <li>为猫咪提供安全、舒适的生活环境</li>
            <li>按时喂食、清洁，定期进行体检和疫苗接种</li>
            <li>不虐待、不遗弃猫咪，承担其生老病死的全部责任</li>
            <li>如遇特殊情况无法继续饲养，需及时联系救助站妥善处理</li>
          </ul>
          
          <h4>三、领养流程</h4>
          <ul>
            <li>填写领养问卷并提交申请</li>
            <li>工作人员审核申请并进行视频沟通</li>
            <li>确认领养意向后预约线下见面</li>
            <li>签订领养协议并支付领养押金</li>
            <li>将猫咪接回家，定期反馈猫咪生活状况</li>
          </ul>
          
          <h4>四、其他说明</h4>
          <ul>
            <li>本救助站会对领养家庭进行不定期回访</li>
            <li>领养押金会在6个月回访确认无问题后退还</li>
            <li>救助站保留对不合格领养家庭的猫咪收回权</li>
          </ul>
        </div>
        <button class="confirm-btn" @click="showAgreement = false">我已了解</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppointmentStore } from '@/stores/appointmentStore'
import LazyImage from '@/components/common/LazyImage.vue'

const props = defineProps({
  cat: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])

const appointmentStore = useAppointmentStore()

const loading = ref(false)
const showAgreement = ref(false)

const form = ref({
  name: '',
  phone: '',
  date: '',
  time: '',
  method: 'wechat',
  contactId: '',
  remark: '',
  agreed: false
})

const timeSlots = [
  { value: '10:00-11:00', label: '上午 10:00-11:00' },
  { value: '11:00-12:00', label: '上午 11:00-12:00' },
  { value: '14:00-15:00', label: '下午 14:00-15:00' },
  { value: '15:00-16:00', label: '下午 15:00-16:00' },
  { value: '16:00-17:00', label: '下午 16:00-17:00' },
  { value: '17:00-18:00', label: '下午 17:00-18:00' }
]

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const validateForm = () => {
  if (!form.value.name.trim()) {
    alert('请输入您的姓名')
    return false
  }
  if (!/^1[3-9]\d{9}$/.test(form.value.phone)) {
    alert('请输入正确的手机号')
    return false
  }
  if (!form.value.date) {
    alert('请选择预约日期')
    return false
  }
  if (!form.value.time) {
    alert('请选择预约时间')
    return false
  }
  if (!form.value.contactId.trim()) {
    alert('请输入联系方式')
    return false
  }
  if (!form.value.agreed) {
    alert('请先阅读并同意领养须知')
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  try {
    await appointmentStore.submitAppointment({
      catId: props.cat.id,
      catName: props.cat.name,
      ...form.value
    })
    emit('success')
  } catch (error) {
    alert('提交失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  if (loading.value) return
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  border-radius: $border-radius-lg;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 16px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  
  h3 {
    margin: 0;
    font-size: 1.3rem;
    color: $color-text-primary;
  }
  
  .close-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: $color-bg-primary;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(229, 115, 115, 0.1);
      color: $color-error;
    }
  }
}

.modal-body {
  padding: 24px;
}

.cat-info-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: $color-bg-primary;
  border-radius: 12px;
  margin-bottom: 24px;
  
  .cat-avatar {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .cat-basic h4 {
    margin: 0 0 4px;
    font-size: 1.1rem;
    color: $color-text-primary;
  }
  
  .cat-basic p {
    margin: 0;
    color: $color-text-secondary;
    font-size: 0.9rem;
  }
}

.appointment-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-size: 0.95rem;
    font-weight: 500;
    color: $color-text-primary;
    
    .required {
      color: $color-error;
      margin-left: 2px;
    }
  }
  
  input,
  select,
  textarea {
    padding: 12px 16px;
    border: 2px solid rgba(232, 168, 124, 0.2);
    border-radius: 12px;
    font-size: 1rem;
    background: $color-bg-primary;
    transition: all 0.3s ease;
    font-family: inherit;
    
    &:focus {
      border-color: $color-primary;
      background: white;
      outline: none;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 80px;
  }
}

.radio-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  input[type="radio"] {
    display: none;
  }
  
  .radio-custom {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgba(232, 168, 124, 0.4);
    position: relative;
    transition: all 0.2s ease;
  }
  
  input[type="radio"]:checked + .radio-custom {
    border-color: $color-primary;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: $color-primary;
    }
  }
}

.agreement {
  padding: 12px;
  background: $color-bg-primary;
  border-radius: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  input[type="checkbox"] {
    display: none;
  }
  
  .checkbox-custom {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 2px solid rgba(232, 168, 124, 0.4);
    position: relative;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }
  
  input[type="checkbox"]:checked + .checkbox-custom {
    background: $color-primary;
    border-color: $color-primary;
    
    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
  }
  
  a {
    color: $color-primary;
    text-decoration: underline;
    
    &:hover {
      color: $color-primary-dark;
    }
  }
}

.form-actions {
  display: flex;
  gap: 12px;
  padding-top: 8px;
  
  @include respond-to(mobile) {
    flex-direction: column-reverse;
  }
}

.cancel-btn,
.submit-btn {
  flex: 1;
  padding: 14px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  @include respond-to(mobile) {
    width: 100%;
  }
}

.cancel-btn {
  background: white;
  border: 2px solid rgba(0,0,0,0.1);
  color: $color-text-secondary;
  
  &:hover {
    border-color: $color-text-light;
  }
}

.submit-btn {
  @include button-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  .btn-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.agreement-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 20px;
}

.agreement-content {
  background: white;
  border-radius: $border-radius-lg;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 24px;
  
  h3 {
    margin: 0 0 16px;
    font-size: 1.3rem;
    color: $color-text-primary;
  }
}

.agreement-text {
  h4 {
    font-size: 1rem;
    color: $color-primary-dark;
    margin: 20px 0 12px;
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  ul {
    padding-left: 20px;
    margin: 0;
  }
  
  li {
    color: $color-text-secondary;
    line-height: 1.8;
    margin-bottom: 6px;
  }
}

.confirm-btn {
  width: 100%;
  margin-top: 24px;
  @include button-primary;
}
</style>
