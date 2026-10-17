interface ItemPosition {
  left: number
  top: number
  width: number
}

/**
 * TransitionGroup helper for wrapping flex lists. Leaving items turn absolute
 * one by one and reflow the rest, so positions are captured before the update
 * and restored on leave.
 */
export function useLeavePinning<Key>() {
  const elements = new Map<Key, HTMLElement>()
  const positions = new Map<HTMLElement, ItemPosition>()

  const register = (key: Key) => (el: unknown) => {
    if (el instanceof HTMLElement) elements.set(key, el)
    else elements.delete(key)
  }

  function capture() {
    positions.clear()
    elements.forEach((el) => {
      positions.set(el, {
        left: el.offsetLeft,
        top: el.offsetTop,
        width: el.offsetWidth
      })
    })
  }

  function pin(el: Element) {
    const item = el as HTMLElement
    const position = positions.get(item)
    if (!position) return

    item.style.left = `${position.left}px`
    item.style.top = `${position.top}px`
    item.style.width = `${position.width}px`
  }

  return { elements, register, capture, pin }
}
