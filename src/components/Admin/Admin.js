import './Admin.css'
import { getItem, pageReload } from './../../common/lib.js'

/*
  Component logic
*/

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
  // Load members from localStorage
  const members = JSON.parse(getItem('sb-members'))

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
  fakeTableTitles.appendChild(createFakeTableCell('column-title', 'Rent time'))
  wrapper.appendChild(fakeTableTitles)

  members.map((m, i) => {
    // Single cell
    // User info
    const member = document.createElement('div')
    member.className = 'member'
    member.appendChild(createFakeTableCell('member-name', m.name))
    member.appendChild(createFakeTableCell('member-phone', m.phone))
    member.appendChild(createFakeTableCell('member-email', m.mail))
    m.banned ? member.appendChild(createFakeTableCell('member-status', 'banned')) : member.appendChild(createFakeTableCell('member-status no-data', '&#8203;'))

    // Display bike info or empty cells
    if (m.bike) {
      member.appendChild(createFakeTableCell('bike-id', m.bike.id))
      member.appendChild(createFakeTableCell('bike-color', m.bike.color, m.bike.color))
      member.appendChild(createFakeTableCell('bike-timer', m.bike.rentTime))
    } else {
      member.appendChild(createFakeTableCell('bike-id no-data', '&#8203;'))
      member.appendChild(createFakeTableCell('bike-color no-data', '&#8203;'))
      member.appendChild(createFakeTableCell('bike-timer no-data', '&#8203;'))
    }
    wrapper.appendChild(member)
  })

  // Refresh button
  const button = document.createElement('button')
  button.innerHTML = 'Refresh'
  button.addEventListener('click', pageReload, false)
  wrapper.appendChild(button)

  return wrapper
}
