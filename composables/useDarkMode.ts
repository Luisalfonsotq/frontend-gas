export const useDarkMode = () => {
  const isDark = useState<boolean>('darkMode', () => false)

  const toggle = () => {
    isDark.value = !isDark.value
    if (import.meta.client) {
      localStorage.setItem('darkMode', String(isDark.value))
      document.documentElement.classList.toggle('dark', isDark.value)
    }
  }

  const init = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('darkMode')
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      const shouldBeDark = saved !== null ? saved === 'true' : systemDark
      
      isDark.value = shouldBeDark
      document.documentElement.classList.toggle('dark', shouldBeDark)
    }
  }

  // Inicializar automaticamente
  if (import.meta.client) {
    init()
  }

  return { isDark, toggle, init }
}