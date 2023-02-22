export function isMobile() {
  const regExp = /Mobile|Android|webOS|iPhone|iPad|iPod/i
  return regExp.test(navigator.userAgent)
}

export function toggleMobileFullScreen() {
  const mobileUsed = isMobile()
  if (mobileUsed) {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }
}
