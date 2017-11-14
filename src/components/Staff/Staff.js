import { setItem, pageReload } from './../../common/lib.js'
import { initStations } from './../../../public/data/stations.js'
import { initMembers } from './../../../public/data/members.js'

/*
  Component logic
*/

const cleanBikes = () => {
  // Simple hard reset so far
  setItem('sb-stations', JSON.stringify(initStations))

  // Also clean users to avoid conflicts
  setItem('sb-members', JSON.stringify(initMembers))

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

  // Sort button
  const button = document.createElement('button')
  button.innerHTML = 'Clean bikes'
  button.addEventListener('click', cleanBikes, false)
  wrapper.appendChild(button)
  return wrapper
}
