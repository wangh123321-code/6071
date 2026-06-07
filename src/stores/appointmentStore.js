import { defineStore } from 'pinia'
import { appointmentApi } from '@/api'
import { ref } from 'vue'

export const useAppointmentStore = defineStore('appointment', () => {
  const appointments = ref(JSON.parse(localStorage.getItem('appointments') || '[]'))
  const loading = ref(false)

  async function submitAppointment(data) {
    loading.value = true
    try {
      const result = await appointmentApi.submitAppointment(data)
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
    return appointments.value.some(a => a.catId === catId)
  }

  return {
    appointments,
    loading,
    submitAppointment,
    hasAppointmentForCat
  }
})
