<template>
  <div class="my-applications">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">
          📋 我的领养申请
        </h1>
        <p class="page-subtitle">
          查看和管理您的领养申请记录
        </p>
      </div>

      <div class="filter-tabs">
        <button
          v-for="tab in filterTabs"
          :key="tab.value"
          class="filter-tab"
          :class="{ active: currentFilter === tab.value }"
          @click="handleFilterChange(tab.value)"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
          <span
            v-if="getCountByStatus(tab.value) > 0"
            class="tab-count"
          >
            {{ getCountByStatus(tab.value) }}
          </span>
        </button>
      </div>

      <div
        v-if="filteredList.length > 0"
        class="application-list"
      >
        <div
          v-for="app in filteredList"
          :key="app.applicationId"
          class="application-card"
        >
          <div class="card-header">
            <div class="cat-info">
              <LazyImage
                :src="app.catAvatar"
                :alt="app.catName"
                class="cat-avatar"
              />
              <div class="cat-basic">
                <h3 class="cat-name">
                  {{ app.catName }}
                </h3>
                <p class="apply-time">
                  申请时间：{{ formatDate(app.createdAt) }}
                </p>
              </div>
            </div>
            <span
              class="status-badge"
              :class="app.status"
            >
              {{ ADOPTION_STATUS_TEXT[app.status] }}
            </span>
          </div>

          <div class="card-body">
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">申请人</span>
                <span class="info-value">{{ app.applicantName }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">联系电话</span>
                <span class="info-value">{{ app.phone }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">住房类型</span>
                <span class="info-value">{{ housingTypeText[app.housingType] }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">养猫经验</span>
                <span class="info-value">{{ experienceText[app.catExperience] }}</span>
              </div>
            </div>

            <div class="reason-preview">
              <span class="info-label">领养原因</span>
              <p class="reason-text">
                {{ app.adoptionReason }}
              </p>
            </div>
          </div>

          <div class="card-footer">
            <div class="update-time">
              更新时间：{{ formatDate(app.updatedAt) }}
            </div>
            <div class="card-actions">
              <button
                class="action-btn detail"
                @click="showDetail(app)"
              >
                查看详情
              </button>
              <button
                v-if="canCancel(app.status)"
                class="action-btn cancel"
                @click="handleCancel(app)"
              >
                撤销申请
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="empty-state"
      >
        <div class="empty-icon">
          📭
        </div>
        <h3>暂无申请记录</h3>
        <p>您还没有提交过领养申请</p>
        <router-link
          to="/cats"
          class="go-cats-btn"
        >
          去看看猫咪
        </router-link>
      </div>
    </div>

    <div
      v-if="selectedApp"
      class="modal-overlay"
      @click.self="selectedApp = null"
    >
      <div
        class="detail-modal"
        @click.stop
      >
        <div class="modal-header">
          <h3>📋 申请详情</h3>
          <button
            class="close-btn"
            @click="selectedApp = null"
          >
            ✕
          </button>
        </div>
        <div class="modal-body">
          <div class="detail-section">
            <h4>猫咪信息</h4>
            <div class="cat-detail-bar">
              <LazyImage
                :src="selectedApp.catAvatar"
                :alt="selectedApp.catName"
                class="detail-cat-avatar"
              />
              <div>
                <h4>{{ selectedApp.catName }}</h4>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h4>基本信息</h4>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-label">申请人姓名</span>
                <span class="detail-value">{{ selectedApp.applicantName }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">联系电话</span>
                <span class="detail-value">{{ selectedApp.phone }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">身份证号</span>
                <span class="detail-value">{{ selectedApp.idCard }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">电子邮箱</span>
                <span class="detail-value">{{ selectedApp.email }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">居住地址</span>
                <span class="detail-value">{{ selectedApp.address }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h4>居住环境</h4>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-label">住房类型</span>
                <span class="detail-value">{{ housingTypeText[selectedApp.housingType] }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">家庭人数</span>
                <span class="detail-value">{{ selectedApp.familyMembers }}人</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">其他宠物</span>
                <span class="detail-value">{{ otherPetsText[selectedApp.hasOtherPets] }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h4>养猫经验</h4>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-label">养猫经验</span>
                <span class="detail-value">{{ experienceText[selectedApp.catExperience] }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">月均预算</span>
                <span class="detail-value">{{ budgetText[selectedApp.monthlyBudget] }}</span>
              </div>
            </div>

            <div class="detail-section">
              <h4>领养原因</h4>
              <p class="reason-full">
                {{ selectedApp.adoptionReason }}
              </p>
            </div>

            <div class="timeline-section">
              <h4>申请进度</h4>
              <div class="timeline">
                <div class="timeline-item active">
                  <div class="timeline-dot" />
                  <div class="timeline-content">
                    <span class="timeline-title">提交申请</span>
                    <span class="timeline-time">{{ formatDate(selectedApp.createdAt) }}</span>
                  </div>
                </div>
                <div
                  v-if="selectedApp.status !== 'pending'"
                  class="timeline-item"
                  :class="{ active: selectedApp.status !== 'pending' }"
                >
                  <div class="timeline-dot" />
                  <div class="timeline-content">
                    <span class="timeline-title">开始审核</span>
                    <span class="timeline-time">
                      {{ selectedApp.status === 'pending' ? '等待中...' : formatDate(selectedApp.updatedAt) }}
                    </span>
                  </div>
                </div>
                <div
                  v-if="['approved', 'rejected'].includes(selectedApp.status)"
                  class="timeline-item"
                  :class="{ active: ['approved', 'rejected'].includes(selectedApp.status) }"
                >
                  <div class="timeline-dot" />
                  <div class="timeline-content">
                    <span class="timeline-title">
                      {{ selectedApp.status === 'approved' ? '申请已通过' : '申请已拒绝' }}
                    </span>
                    <span class="timeline-time">{{ formatDate(selectedApp.updatedAt) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                v-if="canCancel(selectedApp.status)"
                class="footer-btn cancel"
                @click="handleCancel(selectedApp)"
              >
                撤销申请
              </button>
              <button
                class="footer-btn close"
                @click="selectedApp = null"
              >
                关闭
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="showCancelConfirm"
          class="modal-overlay"
          @click.self="showCancelConfirm = false"
        >
          <div
            class="confirm-modal"
            @click.stop
          >
            <div class="confirm-icon">
              ⚠️
            </div>
            <h3>确认撤销申请？</h3>
            <p>撤销后将无法恢复，确定要撤销这份领养申请吗？</p>
            <div class="confirm-actions">
              <button
                class="confirm-btn cancel"
                @click="showCancelConfirm = false"
              >
                再想想
              </button>
              <button
                class="confirm-btn confirm"
                @click="confirmCancel"
              >
                确认撤销
              </button>
            </div>
          </div>
        </div>

        <Toast
          :show="toast.show"
          :message="toast.message"
          :type="toast.type"
          @close="toast.show = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  useAppointmentStore,
  ADOPTION_STATUS_TEXT,
  ADOPTION_STATUS
} from '@/stores/appointmentStore'
import LazyImage from '@/components/common/LazyImage.vue'
import Toast from '@/components/common/Toast.vue'
import { formatDate as formatDateUtil } from '@/utils'

const appointmentStore = useAppointmentStore()

const selectedApp = ref(null)
const showCancelConfirm = ref(false)
const appToCancel = ref(null)

const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

const filterTabs = [
  { value: 'all', label: '全部', icon: '📋' },
  { value: ADOPTION_STATUS.PENDING, label: '待审核', icon: '⏳' },
  { value: ADOPTION_STATUS.REVIEWING, label: '审核中', icon: '🔍' },
  { value: ADOPTION_STATUS.APPROVED, label: '已通过', icon: '✅' },
  { value: ADOPTION_STATUS.REJECTED, label: '已拒绝', icon: '❌' },
  { value: ADOPTION_STATUS.CANCELLED, label: '已撤销', icon: '↩️' }
]

const housingTypeText = {
  apartment: '公寓',
  house: '独栋房屋',
  villa: '别墅',
  rental: '出租房'
}

const experienceText = {
  none: '从未养过',
  beginner: '养过1-2只',
  experienced: '养过多只，经验丰富',
  expert: '非常有经验，可照顾特殊需求猫咪'
}

const otherPetsText = {
  no: '没有',
  cat: '有猫',
  dog: '有狗',
  other: '其他宠物'
}

const budgetText = {
  '300_500': '300-500元',
  '500_1000': '500-1000元',
  '1000_2000': '1000-2000元',
  '2000_plus': '2000元以上'
}

const currentFilter = computed({
  get() {
    return appointmentStore.currentFilter
  },
  set(value) {
    appointmentStore.setFilter(value)
  }
})

const filteredList = computed(() => {
  return appointmentStore.filteredApplications
})

function getCountByStatus(status) {
  if (status === 'all') {
    return appointmentStore.adoptionApplications.length
  }
  return appointmentStore.adoptionApplications.filter(a => a.status === status).length
}

function handleFilterChange(status) {
  currentFilter.value = status
}

function canCancel(status) {
  return [ADOPTION_STATUS.PENDING, ADOPTION_STATUS.REVIEWING].includes(status)
}

function showDetail(app) {
  selectedApp.value = app
}

function handleCancel(app) {
  appToCancel.value = app
  showCancelConfirm.value = true
}

function confirmCancel() {
  if (appToCancel.value) {
    appointmentStore.cancelApplication(appToCancel.value.applicationId)
    showCancelConfirm.value = false
    selectedApp.value = null
    toast.value = {
      show: true,
      message: '申请已撤销',
      type: 'success'
    }
  }
}

function formatDate(dateStr) {
  return formatDateUtil(dateStr, 'YYYY-MM-DD HH:mm')
}

onMounted(() => {
  appointmentStore.setFilter('all')
})
</script>

<style lang="scss" scoped>
.my-applications {
  padding: 24px 0 48px;
  min-height: calc(100vh - 70px);
  background: $color-bg-primary;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  text-align: center;
  padding: 40px 0 32px;

  .page-title {
    margin: 0 0 8px;
    font-size: 2rem;
    color: $color-text-primary;
  }

  .page-subtitle {
    margin: 0;
    color: $color-text-secondary;
    font-size: 1.05rem;
  }
}

.filter-tabs {
  display: flex;
  gap: 8px;
  background: white;
  padding: 12px;
  border-radius: $border-radius-lg;
  margin-bottom: 24px;
  overflow-x: auto;
  @include card-shadow;
}

.filter-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: $color-text-secondary;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
  min-width: 100px;

  &:hover {
    background: rgba(232, 168, 124, 0.1);
  }

  &.active {
    background: linear-gradient(135deg, $color-primary-light 0%, $color-secondary-light 100%);
    color: $color-primary-dark;
  }

  .tab-count {
    background: rgba(0, 0, 0, 0.1);
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.8rem;
  }
}

.application-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.application-card {
  background: white;
  border-radius: $border-radius-lg;
  overflow: hidden;
  @include card-shadow;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .cat-info {
    display: flex;
    align-items: center;
    gap: 16px;

    .cat-avatar {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      overflow: hidden;
    }

    .cat-basic {
      .cat-name {
        margin: 0 0 4px;
        font-size: 1.15rem;
        color: $color-text-primary;
      }

      .apply-time {
        margin: 0;
        color: $color-text-secondary;
        font-size: 0.9rem;
      }
    }
  }

  .status-badge {
    padding: 6px 14px;
    border-radius: 16px;
    font-size: 0.9rem;
    font-weight: 500;

    &.pending {
      background: rgba(255, 183, 77, 0.15);
      color: $color-warning;
    }

    &.reviewing {
      background: rgba(100, 181, 246, 0.15);
      color: #1976D2;
    }

    &.approved {
      background: rgba(123, 196, 127, 0.15);
      color: $color-success;
    }

    &.rejected {
      background: rgba(229, 115, 115, 0.15);
      color: $color-error;
    }

    &.cancelled {
      background: rgba(154, 154, 154, 0.15);
      color: $color-text-light;
    }
  }
}

.card-body {
  padding: 20px 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;

  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: $color-bg-primary;
  border-radius: 10px;

  .info-label {
    color: $color-text-secondary;
    font-size: 0.9rem;
  }

  .info-value {
    color: $color-text-primary;
    font-weight: 500;
  }
}

.reason-preview {
  .info-label {
    display: block;
    color: $color-text-secondary;
    font-size: 0.9rem;
    margin-bottom: 8px;
  }

  .reason-text {
    margin: 0;
    padding: 12px 14px;
    background: $color-bg-primary;
    border-radius: 10px;
    color: $color-text-primary;
    line-height: 1.6;
    font-size: 0.95rem;
  }
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: $color-bg-primary;
  border-top: 1px solid rgba(0, 0, 0, 0.03);

  .update-time {
    color: $color-text-light;
    font-size: 0.85rem;
  }

  .card-actions {
    display: flex;
    gap: 12px;
  }
}

.action-btn {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  &.detail {
    background: rgba(232, 168, 124, 0.1);
    color: $color-primary;

    &:hover {
      background: $color-primary;
      color: white;
    }
  }

  &.cancel {
    background: rgba(229, 115, 115, 0.1);
    color: $color-error;

    &:hover {
      background: $color-error;
      color: white;
    }
  }
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: $border-radius-lg;
  @include card-shadow;

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0 0 8px;
    color: $color-text-primary;
    font-size: 1.3rem;
  }

  p {
    margin: 0 0 24px;
    color: $color-text-secondary;
  }

  .go-cats-btn {
    @include button-primary;
    text-decoration: none;
    display: inline-block;
  }
}

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

.detail-modal {
  background: white;
  border-radius: $border-radius-lg;
  width: 100%;
  max-width: 700px;
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

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

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

.detail-section {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  h4 {
    margin: 0 0 16px;
    font-size: 1.1rem;
    color: $color-primary-dark;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '';
      width: 4px;
      height: 20px;
      background: linear-gradient(180deg, $color-primary 0%, $color-secondary 100%);
      border-radius: 2px;
    }
  }
}

.cat-detail-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: $color-bg-primary;
  border-radius: 12px;

  .detail-cat-avatar {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    overflow: hidden;
  }

  h4 {
    margin: 0;
    font-size: 1.2rem;
    color: $color-text-primary;

    &::before {
      display: none;
    }
  }
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: $color-bg-primary;
  border-radius: 10px;

  .detail-label {
    color: $color-text-secondary;
    font-size: 0.9rem;
  }

  .detail-value {
    color: $color-text-primary;
    font-weight: 500;
    text-align: right;
    word-break: break-all;
    max-width: 60%;
  }
}

.reason-full {
  margin: 0;
  padding: 16px;
  background: $color-bg-primary;
  border-radius: 12px;
  color: $color-text-primary;
  line-height: 1.8;
}

.timeline-section {
  .timeline {
    position: relative;
    padding-left: 30px;
  }

  .timeline-item {
    position: relative;
    padding-bottom: 24px;
    opacity: 0.5;
    transition: opacity 0.3s ease;

    &:last-child {
      padding-bottom: 0;
    }

    &.active {
      opacity: 1;
    }

    .timeline-dot {
      position: absolute;
      left: -30px;
      top: 4px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: $color-primary-light;
      border: 3px solid white;
      box-shadow: 0 0 0 2px $color-primary;
    }

    &.active .timeline-dot {
      background: $color-primary;
    }

    .timeline-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .timeline-title {
        font-weight: 500;
        color: $color-text-primary;
      }

      .timeline-time {
        color: $color-text-secondary;
        font-size: 0.9rem;
      }
    }

    &::before {
      content: '';
      position: absolute;
      left: -24px;
      top: 20px;
      width: 2px;
      height: calc(100% - 10px);
      background: $color-primary-light;
    }

    &:last-child::before {
      display: none;
    }

    &.active::before {
      background: $color-primary;
    }
  }
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  justify-content: flex-end;
}

.footer-btn {
  padding: 12px 28px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;

  &.close {
    background: $color-bg-primary;
    color: $color-text-secondary;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  &.cancel {
    background: $color-error;
    color: white;

    &:hover {
      opacity: 0.9;
    }
  }
}

.confirm-modal {
  background: white;
  border-radius: $border-radius-lg;
  width: 100%;
  max-width: 400px;
  padding: 32px;
  text-align: center;
  animation: slideUp 0.3s ease;

  .confirm-icon {
    font-size: 3rem;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0 0 8px;
    color: $color-text-primary;
    font-size: 1.3rem;
  }

  p {
    margin: 0 0 24px;
    color: $color-text-secondary;
    line-height: 1.6;
  }
}

.confirm-actions {
  display: flex;
  gap: 12px;
}

.confirm-btn {
  flex: 1;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;

  &.cancel {
    background: $color-bg-primary;
    color: $color-text-secondary;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  &.confirm {
    background: $color-error;
    color: white;

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
