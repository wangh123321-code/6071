export const debounce = (fn, delay = 300) => {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export const throttle = (fn, delay = 300) => {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last > delay) {
      last = now
      fn.apply(this, args)
    }
  }
}

export const formatAge = (ageMonths) => {
  const years = Math.floor(ageMonths / 12)
  const months = ageMonths % 12
  if (years > 0) {
    return months > 0 ? `${years}岁${months}个月` : `${years}岁`
  }
  return `${months}个月`
}

export const formatDate = (dateStr, format = 'YYYY-MM-DD') => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
}

export const getMatchColor = (score) => {
  if (score >= 90) return '#7BC47F'
  if (score >= 80) return '#AED581'
  if (score >= 70) return '#FFD54F'
  if (score >= 60) return '#FFB74D'
  return '#E57373'
}

export const getMatchLabel = (score) => {
  if (score >= 90) return '非常匹配'
  if (score >= 80) return '很匹配'
  if (score >= 70) return '比较匹配'
  if (score >= 60) return '一般匹配'
  return '匹配度较低'
}

export const lazyLoadImage = (img, src) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = src
          observer.unobserve(img)
        }
      })
    }, { rootMargin: '50px' })
    observer.observe(img)
  } else {
    img.src = src
  }
}

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    return true
  }
}

export const scrollToTop = (smooth = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  })
}
