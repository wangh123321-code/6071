<template>
  <div class="adoption-form">
    <div class="form-header">
      <h3>📝 领养申请表</h3>
      <p class="form-subtitle">
        请认真填写以下信息，我们会尽快审核您的申请
      </p>
    </div>

    <form
      class="application-form"
      @submit.prevent="handleSubmit"
    >
      <div class="cat-info-bar">
        <LazyImage
          :src="cat.avatar"
          :alt="cat.name"
          class="cat-avatar"
        />
        <div class="cat-basic">
          <h4>{{ cat.name }}</h4>
          <p>{{ cat.breed }} · {{ cat.ageText }}</p>
        </div>
      </div>

      <div class="form-section">
        <h4 class="section-title">
          👤 基本信息
        </h4>
        <div class="form-row">
          <div
            class="form-group"
            :class="{ error: errors.applicantName }"
          >
            <label for="applicantName">申请人姓名 <span class="required">*</span></label>
            <input
              id="applicantName"
              v-model="form.applicantName"
              type="text"
              :class="{ 'input-error': errors.applicantName }"
              placeholder="请输入您的真实姓名"
              @blur="validateField('applicantName')"
            >
            <span
              v-if="errors.applicantName"
              class="error-message"
            >{{ errors.applicantName }}</span>
          </div>
          <div
            class="form-group"
            :class="{ error: errors.phone }"
          >
            <label for="phone">联系电话 <span class="required">*</span></label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              :class="{ 'input-error': errors.phone }"
              placeholder="请输入您的手机号"
              @blur="validateField('phone')"
            >
            <span
              v-if="errors.phone"
              class="error-message"
            >{{ errors.phone }}</span>
          </div>
        </div>

        <div class="form-row">
          <div
            class="form-group"
            :class="{ error: errors.idCard }"
          >
            <label for="idCard">身份证号 <span class="required">*</span></label>
            <input
              id="idCard"
              v-model="form.idCard"
              type="text"
              :class="{ 'input-error': errors.idCard }"
              placeholder="请输入身份证号码"
              @blur="validateField('idCard')"
            >
            <span
              v-if="errors.idCard"
              class="error-message"
            >{{ errors.idCard }}</span>
          </div>
          <div
            class="form-group"
            :class="{ error: errors.email }"
          >
            <label for="email">电子邮箱 <span class="required">*</span></label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              :class="{ 'input-error': errors.email }"
              placeholder="请输入您的邮箱地址"
              @blur="validateField('email')"
            >
            <span
              v-if="errors.email"
              class="error-message"
            >{{ errors.email }}</span>
          </div>
        </div>
      </div>

      <div
        class="form-group"
        :class="{ error: errors.address }"
      >
        <label for="address">居住地址 <span class="required">*</span></label>
        <input
          id="address"
          v-model="form.address"
          type="text"
          :class="{ 'input-error': errors.address }"
          placeholder="请输入您的详细居住地址"
          @blur="validateField('address')"
        >
        <span
          v-if="errors.address"
          class="error-message"
        >{{ errors.address }}</span>
      </div>

      <div class="form-section">
        <h4 class="section-title">
          🏠 居住环境
        </h4>
        <div class="form-row">
          <div
            class="form-group"
            :class="{ error: errors.housingType }"
          >
            <label for="housingType">住房类型 <span class="required">*</span></label>
            <select
              id="housingType"
              v-model="form.housingType"
              :class="{ 'input-error': errors.housingType }"
              @change="validateField('housingType')"
            >
              <option value="">
                请选择住房类型
              </option>
              <option value="apartment">
                公寓
              </option>
              <option value="house">
                独栋房屋
              </option>
              <option value="villa">
                别墅
              </option>
              <option value="rental">
                出租房
              </option>
            </select>
            <span
              v-if="errors.housingType"
              class="error-message"
            >{{ errors.housingType }}</span>
          </div>
          <div
            class="form-group"
            :class="{ error: errors.familyMembers }"
          >
            <label for="familyMembers">家庭人数 <span class="required">*</span></label>
            <select
              id="familyMembers"
              v-model="form.familyMembers"
              :class="{ 'input-error': errors.familyMembers }"
              @change="validateField('familyMembers')"
            >
              <option value="">
                请选择家庭人数
              </option>
              <option value="1">
                1人（独居）
              </option>
              <option value="2">
                2人
              </option>
              <option value="3">
                3人
              </option>
              <option value="4">
                4人及以上
              </option>
            </select>
            <span
              v-if="errors.familyMembers"
              class="error-message"
            >{{ errors.familyMembers }}</span>
          </div>
        </div>

        <div
          class="form-group"
          :class="{ error: errors.hasOtherPets }"
        >
          <label>是否有其他宠物 <span class="required">*</span></label>
          <div class="radio-group">
            <label class="radio-item">
              <input
                v-model="form.hasOtherPets"
                type="radio"
                value="no"
                @change="validateField('hasOtherPets')"
              >
              <span class="radio-custom" />
              <span>没有</span>
            </label>
            <label class="radio-item">
              <input
                v-model="form.hasOtherPets"
                type="radio"
                value="cat"
                @change="validateField('hasOtherPets')"
              >
              <span class="radio-custom" />
              <span>有猫</span>
            </label>
            <label class="radio-item">
              <input
                v-model="form.hasOtherPets"
                type="radio"
                value="dog"
                @change="validateField('hasOtherPets')"
              >
              <span class="radio-custom" />
              <span>有狗</span>
            </label>
            <label class="radio-item">
              <input
                v-model="form.hasOtherPets"
                type="radio"
                value="other"
                @change="validateField('hasOtherPets')"
              >
              <span class="radio-custom" />
              <span>其他宠物</span>
            </label>
          </div>
          <span
            v-if="errors.hasOtherPets"
            class="error-message"
          >{{ errors.hasOtherPets }}</span>
        </div>
      </div>

      <div class="form-section">
        <h4 class="section-title">
          📋 养猫经验
        </h4>
        <div class="form-row">
          <div
            class="form-group"
            :class="{ error: errors.catExperience }"
          >
            <label for="catExperience">养猫经验 <span class="required">*</span></label>
            <select
              id="catExperience"
              v-model="form.catExperience"
              :class="{ 'input-error': errors.catExperience }"
              @change="validateField('catExperience')"
            >
              <option value="">
                请选择养猫经验
              </option>
              <option value="none">
                从未养过
              </option>
              <option value="beginner">
                养过1-2只
              </option>
              <option value="experienced">
                养过多只，经验丰富
              </option>
              <option value="expert">
                非常有经验，可照顾特殊需求猫咪
              </option>
            </select>
            <span
              v-if="errors.catExperience"
              class="error-message"
            >{{ errors.catExperience }}</span>
          </div>
          <div
            class="form-group"
            :class="{ error: errors.monthlyBudget }"
          >
            <label for="monthlyBudget">月均预算 <span class="required">*</span></label>
            <select
              id="monthlyBudget"
              v-model="form.monthlyBudget"
              :class="{ 'input-error': errors.monthlyBudget }"
              @change="validateField('monthlyBudget')"
            >
              <option value="">
                请选择月均预算
              </option>
              <option value="300_500">
                300-500元
              </option>
              <option value="500_1000">
                500-1000元
              </option>
              <option value="1000_2000">
                1000-2000元
              </option>
              <option value="2000_plus">
                2000元以上
              </option>
            </select>
            <span
              v-if="errors.monthlyBudget"
              class="error-message"
            >{{ errors.monthlyBudget }}</span>
          </div>
        </div>

        <div
          class="form-group"
          :class="{ error: errors.adoptionReason }"
        >
          <label for="adoptionReason">领养原因 <span class="required">*</span></label>
          <textarea
            id="adoptionReason"
            v-model="form.adoptionReason"
            :class="{ 'input-error': errors.adoptionReason }"
            rows="4"
            placeholder="请详细描述您的领养原因、对猫咪的了解以及未来的照顾计划..."
            @blur="validateField('adoptionReason')"
          />
          <span
            v-if="errors.adoptionReason"
            class="error-message"
          >{{ errors.adoptionReason }}</span>
          <span class="char-count">{{ form.adoptionReason.length }}/500字</span>
        </div>

        <div
          class="form-group"
          :class="{ error: errors.agreed }"
        >
          <label class="checkbox-item">
            <input
              v-model="form.agreed"
              type="checkbox"
              @change="validateField('agreed')"
            >
            <span class="checkbox-custom" />
            <span>我已阅读并同意<a
              href="#"
              @click.prevent="showAgreement = true"
            >《领养协议》</a>，承诺会爱护猫咪，不虐待、不遗弃</span>
          </label>
          <span
            v-if="errors.agreed"
            class="error-message"
          >{{ errors.agreed }}</span>
        </div>
      </div>

      <div class="form-actions">
        <button
          type="button"
          class="cancel-btn"
          @click="handleCancel"
        >
          取消
        </button>
        <button
          type="submit"
          class="submit-btn"
          :disabled="loading"
        >
          <span
            v-if="loading"
            class="btn-spinner"
          />
          {{ loading ? '提交中...' : '提交申请' }}
        </button>
      </div>
    </form>

    <div
      v-if="showAgreement"
      class="agreement-modal"
      @click.self="showAgreement = false"
    >
      <div class="agreement-content">
        <h3>📋 领养协议</h3>
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
        <button
          class="confirm-btn"
          @click="showAgreement = false"
        >
          我已了解
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
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

const form = reactive({
  applicantName: '',
  phone: '',
  idCard: '',
  email: '',
  address: '',
  housingType: '',
  familyMembers: '',
  hasOtherPets: '',
  catExperience: '',
  monthlyBudget: '',
  adoptionReason: '',
  agreed: false
})

const errors = reactive({
  applicantName: '',
  phone: '',
  idCard: '',
  email: '',
  address: '',
  housingType: '',
  familyMembers: '',
  hasOtherPets: '',
  catExperience: '',
  monthlyBudget: '',
  adoptionReason: '',
  agreed: ''
})

const validationRules = {
  applicantName: {
    required: true,
    validator: (value) => {
      if (!value.trim()) return '请输入申请人姓名'
      if (value.trim().length < 2) return '姓名至少2个字符'
      return ''
    }
  },
  phone: {
    required: true,
    validator: (value) => {
      if (!value.trim()) return '请输入联系电话'
      if (!/^1[3-9]\d{9}$/.test(value)) return '请输入正确的手机号码'
      return ''
    }
  },
  idCard: {
    required: true,
    validator: (value) => {
      if (!value.trim()) return '请输入身份证号'
      if (!/^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/.test(value)) {
        return '请输入正确的身份证号码'
      }
      return ''
    }
  },
  email: {
    required: true,
    validator: (value) => {
      if (!value.trim()) return '请输入电子邮箱'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '请输入正确的邮箱地址'
      return ''
    }
  },
  address: {
    required: true,
    validator: (value) => {
      if (!value.trim()) return '请输入居住地址'
      if (value.trim().length < 10) return '请输入详细地址（至少10个字符）'
      return ''
    }
  },
  housingType: {
    required: true,
    validator: (value) => {
      if (!value) return '请选择住房类型'
      return ''
    }
  },
  familyMembers: {
    required: true,
    validator: (value) => {
      if (!value) return '请选择家庭人数'
      return ''
    }
  },
  hasOtherPets: {
    required: true,
    validator: (value) => {
      if (!value) return '请选择是否有其他宠物'
      return ''
    }
  },
  catExperience: {
    required: true,
    validator: (value) => {
      if (!value) return '请选择养猫经验'
      return ''
    }
  },
  monthlyBudget: {
    required: true,
    validator: (value) => {
      if (!value) return '请选择月均预算'
      return ''
    }
  },
  adoptionReason: {
    required: true,
    validator: (value) => {
      if (!value.trim()) return '请填写领养原因'
      if (value.trim().length < 20) return '领养原因至少20个字符'
      if (value.length > 500) return '领养原因不能超过500字'
      return ''
    }
  },
  agreed: {
    required: true,
    validator: (value) => {
      if (!value) return '请阅读并同意领养协议'
      return ''
    }
  }
}

function validateField(fieldName) {
  const rule = validationRules[fieldName]
  if (!rule) return true
  
  const value = form[fieldName]
  const errorMessage = rule.validator(value)
  errors[fieldName] = errorMessage
  return !errorMessage
}

function validateAllFields() {
  let isValid = true
  for (const fieldName of Object.keys(validationRules)) {
    if (!validateField(fieldName)) {
      isValid = false
    }
  }
  return isValid
}

async function handleSubmit() {
  if (!validateAllFields()) {
    return
  }
  
  loading.value = true
  try {
    await appointmentStore.submitAdoptionApplication({
      catId: props.cat.id,
      catName: props.cat.name,
      catAvatar: props.cat.avatar,
      ...form
    })
    emit('success')
  } catch (error) {
    alert('提交失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

function handleCancel() {
  if (loading.value) return
  emit('close')
}
</script>

<style lang="scss" scoped>
.adoption-form {
  background: white;
  border-radius: $border-radius-lg;
  max-height: 85vh;
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

.form-header {
  padding: 24px 24px 16px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  text-align: center;

  h3 {
    margin: 0 0 8px;
    font-size: 1.4rem;
    color: $color-text-primary;
  }

  .form-subtitle {
    margin: 0;
    color: $color-text-secondary;
    font-size: 0.95rem;
  }
}

.application-form {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cat-info-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: $color-bg-primary;
  border-radius: 12px;
  margin-bottom: 8px;
  
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

.form-section {
  .section-title {
    margin: 0 0 16px;
    font-size: 1.1rem;
    color: $color-primary-dark;
    display: flex;
    align-items: center;
    gap: 8px;
  }
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
  position: relative;
  
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

    &.input-error {
      border-color: $color-error;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }

  &.error {
    input,
    select,
    textarea {
      border-color: $color-error;
    }
  }

  .error-message {
    color: $color-error;
    font-size: 0.85rem;
    margin-top: 4px;
    display: block;
  }

  .char-count {
    position: absolute;
    right: 12px;
    bottom: 8px;
    font-size: 0.8rem;
    color: $color-text-light;
    pointer-events: none;
  }
}

.radio-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 4px;
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

.checkbox-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  padding: 12px;
  background: $color-bg-primary;
  border-radius: 12px;
  
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
    margin-top: 2px;
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
