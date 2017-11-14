import './Admin.css'
import { getItem, pageReload } from './../../common/lib.js'

/*
  Component logic
*/

const members = JSON.parse(getItem('sb-members'))

const createFakeTableCell = (className, text, textColor) => {
  const cell = document.createElement('div')
  cell.className = className
  cell.style.color = textColor || ''
  cell.innerHTML = text
  return cell
}

/*
  Component UI
*/

export const Admin = () => {
  const wrapper = document.createElement('div')

  // Area title
  const separator = document.createElement('hr')
  wrapper.appendChild(separator)

  const title = document.createElement('h2')
  title.innerHTML = 'Admin area'
  wrapper.appendChild(title)

  // Columns titles
  const fakeTableTitles = document.createElement('div')
  fakeTableTitles.className = 'titles'
  fakeTableTitles.appendChild(createFakeTableCell('column-title', 'Name'))
  fakeTableTitles.appendChild(createFakeTableCell('column-title', 'Phone'))
  fakeTableTitles.appendChild(createFakeTableCell('column-title', 'Email'))
  fakeTableTitles.appendChild(createFakeTableCell('column-title', 'Status'))
  fakeTableTitles.appendChild(createFakeTableCell('column-title', 'Bike ID'))
  fakeTableTitles.appendChild(createFakeTableCell('column-title', 'Bike color'))
  fakeTableTitles.appendChild(createFakeTableCell('column-title', 'Timer'))
  wrapper.appendChild(fakeTableTitles)

  members.map((m, i) => {
    // Single cell
    const member = document.createElement('div')
    member.className = 'member'
    member.appendChild(createFakeTableCell('member-name', m.name))
    member.appendChild(createFakeTableCell('member-phone', m.phone))
    member.appendChild(createFakeTableCell('member-email', m.mail))
    m.banned ? member.appendChild(createFakeTableCell('member-status', 'banned')) : member.appendChild(createFakeTableCell('member-status', '&#8203;'))
    if (m.bike) {
      member.appendChild(createFakeTableCell('bike-id', m.bike.id))
      member.appendChild(createFakeTableCell('bike-color', m.bike.color, m.bike.color))
      member.appendChild(createFakeTableCell('bike-timer', m.bike.remainingTime))
    } else {
      member.appendChild(createFakeTableCell('bike-id', '&#8203;'))
      member.appendChild(createFakeTableCell('bike-color', '&#8203;'))
      member.appendChild(createFakeTableCell('bike-timer', '&#8203;'))
    }
    wrapper.appendChild(member)
  })

  // Refresh button
  const button = document.createElement('button')
  button.innerHTML = 'Refresh'
  button.addEventListener('click', pageReload)
  wrapper.appendChild(button)

  return wrapper
}