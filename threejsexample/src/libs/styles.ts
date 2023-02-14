export function includeStyleElement(styles: string, styleId: string) {
  if (document.getElementById(styleId)) {
    return
  }

  const style = document.createElement('style')
  style.id = styleId
  style.type = 'text/css'
  ;(document.getElementsByTagName('head')[0] || document.body).appendChild(
    style
  )
  style.appendChild(document.createTextNode(styles))
}

export function removeStyleElement(styleId: string) {
  const style = document.getElementById(styleId)
  if (style) {
    style.parentElement?.removeChild(style)
  }
}
