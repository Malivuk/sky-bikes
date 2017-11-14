import { getItem, pageReload } from './../../common/lib.js'

/*
  Component logic
*/

export const sortBikes = () => {
  pageReload()
}

/*
  Component UI
*/

export const Staff = () => {
  const wrapper = document.createElement('div')

  // Area title
  const separator = document.createElement('hr')
  wrapper.appendChild(separator)

  const title = document.createElement('h2')
  title.innerHTML = 'Staff area'
  wrapper.appendChild(title)

  const button = document.createElement('button')
  button.innerHTML = 'Clean bikes'
  button.addEventListener('click', pageReload)
  wrapper.appendChild(button)
  return wrapper
}
