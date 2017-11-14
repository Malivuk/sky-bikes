import './Stations.css'
import {
  isEmptyObject,
  getItem,
  setItem,
  getSession,
  delSession,
  isPrivilegedAccount,
  pageReload,
  updateInstruction
} from './../../common/lib.js'

/*
  Component logic
*/

const stations = JSON.parse(getItem('sb-stations'))
const members = JSON.parse(getItem('sb-members'))
const session = JSON.parse(getSession('sb-session'))

const updateMemberSession = (members, session) => {
  let fakeArray = []
  fakeArray.push(session)
  const updatedMembers = members.map(obj => fakeArray.find(o => o.mail === obj.mail) || obj)
  setItem('sb-members', JSON.stringify(updatedMembers))
}

const removeBikeFromStation = (id) => {
  stations.some((station, i) => station.some((bike, j) => bike.id === id ? station[j] = {} : false))
  setItem('sb-stations', JSON.stringify(stations))
}

const manualBikeReturn = (e) => {
  const i = e.target.dataset.station
  const j = e.target.dataset.slot
  stations[i][j] = session.bike
  pageReload()
}

const automaticBikeReturn = (bike) => {
  stations.some((station, i) => station.some((bike, j) => isEmptyObject(bike) ? station[j] = bike : false))
  setItem('sb-stations', JSON.stringify(stations))
}

const markAsBanned = (session) => {
  session.banned = true
  updateMemberSession(members, session)
}

const logout = () => {
  delSession('sb-session')
  pageReload()
}

const banMember = (i, session) => {
  // Update UI
  clearInterval(i)
  updateInstruction('Remaining time is over.')

  // Update data
  if (!isPrivilegedAccount(session.mail)) {
    automaticBikeReturn(session.bike)
    markAsBanned(session)
    logout()
  }
}

const initCountdown = () => {
  // TODO 16
  let remainingTime = 2
  const i = setInterval(() => remainingTime === 0 ? banMember(i, session) : updateInstruction(`Return the bike before ${remainingTime--}.`), 1000)
}

const rentBike = (e) => {
  // TODO hasBike(user) - already

  // Udpate UI
  const bikeId = e.target.dataset.bike
  const stationNo = e.target.dataset.station
  const slotNo = e.target.dataset.slot
  e.preventDefault()
  e.target.className = 'slot parking'
  e.target.style.backgroundColor = '#f0f0f0'
  e.target.dataset.bike = ''
  e.target.dataset.station = stationNo
  e.target.dataset.slot = slotNo
  e.target.addEventListener('click', manualBikeReturn)

  // Update data
  removeBikeFromStation(bikeId)
  // TODO updateMemberSession // update with timer and bike
  initCountdown()
}

/*
  Component UI
*/

export const Stations = () => {
  // Stations element
  const wrapper = document.createElement('div')
  const instruction = document.createElement('p')

  // Feedback area (instructions, errors...)
  instruction.id = 'instructions'
  instruction.innerHTML = 'Rent a bike by clicking on it.'
  wrapper.appendChild(instruction)

  stations.map((e, i) => {
    // Single station element
    const station = document.createElement('div')
    station.className = 'station'

    const label = document.createElement('p')
    label.innerHTML = `Station ${i + 1}`
    station.appendChild(label)

    e.map((f, j) => {
      // Single bike element
      const bike = document.createElement('a')
      bike.href = '#'
      bike.className = f.id ? 'bike slot' : 'parking slot'
      bike.dataset.bike = f.id || ''
      bike.dataset.station = i
      bike.dataset.slot = j
      bike.style.backgroundColor = f.color || '#f0f0f0'
      f.id ? bike.addEventListener('click', rentBike) : bike.addEventListener('click', manualBikeReturn)
      station.appendChild(bike)
    })
    wrapper.appendChild(station)
  })
  return wrapper
}
