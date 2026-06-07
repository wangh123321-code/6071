import request from '@/utils/request'
import { mockApi } from '@/mock/data'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const mockDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 200))

const wrapMockResponse = async (data) => {
  await mockDelay()
  return data
}

export const catApi = {
  getCats(params) {
    if (USE_MOCK) {
      return wrapMockResponse(mockApi.getCats(params))
    }
    return request({
      url: '/cats',
      method: 'get',
      params
    })
  },

  getCatDetail(id) {
    if (USE_MOCK) {
      return wrapMockResponse(mockApi.getCatDetail(id))
    }
    return request({
      url: `/cats/${id}`,
      method: 'get'
    })
  },

  getFilters() {
    if (USE_MOCK) {
      return wrapMockResponse(mockApi.getFilters())
    }
    return request({
      url: '/filters',
      method: 'get'
    })
  },

  getFavorites() {
    if (USE_MOCK) {
      return wrapMockResponse(mockApi.getFavorites())
    }
    return request({
      url: '/favorites',
      method: 'get'
    })
  }
}

export const questionnaireApi = {
  getQuestions() {
    if (USE_MOCK) {
      return wrapMockResponse(mockApi.getQuestions())
    }
    return request({
      url: '/questionnaire',
      method: 'get'
    })
  },

  submitMatch(answers) {
    if (USE_MOCK) {
      return wrapMockResponse(mockApi.matchCats(answers))
    }
    return request({
      url: '/match',
      method: 'post',
      data: { answers }
    })
  }
}

export const appointmentApi = {
  submitAppointment(data) {
    if (USE_MOCK) {
      return wrapMockResponse(mockApi.submitAppointment(data))
    }
    return request({
      url: '/appointment',
      method: 'post',
      data
    })
  }
}

export default {
  catApi,
  questionnaireApi,
  appointmentApi
}
