function hasTouch() {
  /* eslint-disable no-undef */
  if ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
    return true
  }
  return false
}

function getPosition(event) {
  if (event.touches && event.touches[0]) {
    event = event.touches[0]
  } else if (event.changedTouches && event.changedTouches[0]) {
    event = event.changedTouches[0]
  }

  return {
    y: event.clientY,
    x: event.clientX,
  }
}

const originalContext = {
  handlers: null,
  startDragging(event) {
    const position = getPosition(event)

    if (hasTouch()) {
      window.addEventListener('touchmove', this.drag)
      window.addEventListener('touchend', this.stopDragging)
    } else {
      window.addEventListener('mousemove', this.drag)
      window.addEventListener('mouseup', this.stopDragging)
    }

    this.handlers.onStart({
      event,
      ...position,
    })
  },
  drag(event) {
    const position = getPosition(event)
    this.handlers.onDrag({
      event,
      ...position,
    })
  },
  stopDragging(event) {
    const position = getPosition(event)

    if (hasTouch()) {
      window.removeEventListener('touchmove', this.drag)
      window.removeEventListener('touchend', this.stopDragging)
    } else {
      window.removeEventListener('mousemove', this.drag)
      window.removeEventListener('mouseup', this.stopDragging)
    }

    this.handlers.onStop({
      event,
      ...position,
    })
  },
  cloneStrict(instance) {
    const cloned = {
      ...this,
      ...instance,
    }
    cloned.startDragging = cloned.startDragging.bind(cloned)
    cloned.drag = cloned.drag.bind(cloned)
    cloned.stopDragging = cloned.stopDragging.bind(cloned)
    return cloned
  },
}

export default {
  mounted(element, binding) {
    const context = originalContext.cloneStrict({ handlers: binding.value })
    element.__swipe = context

    element.addEventListener('mousedown', context.startDragging)
    element.addEventListener('touchstart', context.startDragging)
  },
  unmounted(element) {
    const context = element.__swipe

    element.removeEventListener('mousedown', context.startDragging)
    element.removeEventListener('touchstart', context.startDragging)
    window.removeEventListener('mousemove', context.drag)
    window.removeEventListener('mouseup', context.stopDragging)
    window.removeEventListener('touchmove', context.drag)
    window.removeEventListener('touchend', context.stopDragging)

    delete element.__swipe
  },
}
