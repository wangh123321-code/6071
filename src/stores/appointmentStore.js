import { defineStore } from 'pinia'
import { appointmentApi } from '@/api'
import { ref, computed } from 'vue'

export const ADOPTION_STATUS = {
  PENDING: 'pending',
  REVIEWING: 'reviewing',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled'
}

export const ADOPTION_STATUS_TEXT = {
  [ADOPTION_STATUS.PENDING]: '待审核',
  [ADOPTION_STATUS.REVIEWING]: '审核中',
  [ADOPTION_STATUS.APPROVED]: '已通过',
  [ADOPTION_STATUS.REJECTED]: '已拒绝',
  [ADOPTION_STATUS.CANCELLED]: '已撤销'
}

export const APPOINTMENT_TYPE = {
  VIDEO: 'video',
  ADOPTION: 'adoption'
}

export const useAppointmentStore = defineStore('appointment', () => {
  const appointments = ref(JSON.parse(localStorage.getItem('appointments') || '[]'))
  const adoptionApplications = ref(JSON.parse(localStorage.getItem('adoptionApplications') || '[]'))
  const loading = ref(false)
  const currentFilter = ref('all')

  const filteredApplications = computed(() => {
    if (currentFilter.value === 'all') {
      return adoptionApplications.value
    }
    return adoptionApplications.value.filter(a => a.status === currentFilter.value)
  })

  function persistApplications() {
    localStorage.setItem('adoptionApplications', JSON.stringify(adoptionApplications.value))
  }

  async function submitAppointment(data) {
    loading.value = true
    try {
      const result = await appointmentApi.submitAppointment({
        ...data,
        type: APPOINTMENT_TYPE.VIDEO
      })
      appointments.value.push(result)
      localStorage.setItem('appointments', JSON.stringify(appointments.value))
      return result
    } catch (error) {
      console.error('提交预约失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  function hasAppointmentForCat(catId) {
    return appointments.value.some(a => a.catId === catId && a.type === APPOINTMENT_TYPE.VIDEO)
  }

  async function submitAdoptionApplication(data) {
    loading.value = true
    try {
      const result = await appointmentApi.submitAppointment({
        ...data,
        type: APPOINTMENT_TYPE.ADOPTION,
        status: ADOPTION_STATUS.PENDING,
        applicationId: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      adoptionApplications.value.unshift(result)
      persistApplications()
      return result
    } catch (error) {
      console.error('提交领养申请失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  function getAdoptionApplicationForCat(catId) {
    return adoptionApplications.value.find(
      a => a.catId === catId && a.status !== ADOPTION_STATUS.CANCELLED
    )
  }

  function hasAdoptionApplicationForCat(catId) {
    return adoptionApplications.value.some(
      a => a.catId === catId && a.status !== ADOPTION_STATUS.CANCELLED
    )
  }

  function getAdoptionStatusForCat(catId) {
    const application = getAdoptionApplicationForCat(catId)
    return application ? application.status : null
  }

  function cancelApplication(applicationId) {
    const index = adoptionApplications.value.findIndex(a => a.applicationId === applicationId)
    if (index > -1) {
      adoptionApplications.value[index].status = ADOPTION_STATUS.CANCELLED
      adoptionApplications.value[index].updatedAt = new Date().toISOString()
      persistApplications()
      return true
    }
    return false
  }

  function getApplicationById(applicationId) {
    return adoptionApplications.value.find(a => a.applicationId === applicationId)
  }

  function setFilter(status) {
    currentFilter.value = status
  }

  function updateApplicationStatus(applicationId, status) {
    const index = adoptionApplications.value.findIndex(a => a.applicationId === applicationId)
    if (index > -1) {
      adoptionApplications.value[index].status = status
      adoptionApplications.value[index].updatedAt = new Date().toISOString()
      persistApplications()
      return true
    }
    return false
  }

  return {
    appointments,
    adoptionApplications,
    loading,
    currentFilter,
    filteredApplications,
    submitAppointment,
    hasAppointmentForCat,
    submitAdoptionApplication,
    getAdoptionApplicationForCat,
    hasAdoptionApplicationForCat,
    getAdoptionStatusForCat,
    cancelApplication,
    getApplicationById,
    setFilter,
    updateApplicationStatus
  }
})
