import './Stations.css'
import {
  isEmptyObject,
  getItem,
  setItem,
  getSession,
  delSession,
  isPrivilegedAccount,
  hasBike,
  pageReload,
  updateInstruction
} from './../../common/lib.js'

/*
  Component logic
*/

// Load stations from localStorage
const stations = JSON.parse(getItem('sb-stations'))

// Load members from localStorage
const members = JSON.parse(getItem('sb-members'))

// Load member session from sessionStorage
const session = JSON.parse(getSession('sb-session'))

const updateMemberSession = (session) => {
  let fakeArray = []
  fakeArray.push(session)
  const updatedMembers = members.map(obj => fakeArray.find(o => o.mail === obj.mail) || obj)
  setItem('sb-members', JSON.stringify(updatedMembers))
}

const removeBikeFromStation = (id) => {
  stations.some((station, i) => station.some((bike, j) => bike.id === id ? station[j] = {} : false))
  setItem('sb-stations', JSON.stringify(stations))
}

const automaticBikeReturn = (bike) => {
  // Find the first empty slot and fill it
  delete bike.rentTime
  stations.some((station, i) => station.some((b, j) => isEmptyObject(b) ? station[j] = bike : false))

  // Update stations object in localStorage and reload page
  setItem('sb-stations', JSON.stringify(stations))
  pageReload()
}

const markAsBanned = (session) => {
  // Create a `banned` key and set it to true before update the member session
  session.banned = true
  updateMemberSession(session)
}

const logout = () => {
  // Kill the member session and "redirect" to login screen
  delSession('sb-session')
  pageReload()
}

const banMember = (i, session) => {
  // Stop countdown, update UI
  clearInterval(i)
  updateInstruction('Remaining time is over.')

  // Return the bike
  automaticBikeReturn(session.bike)

  // Detach bike from member
  delete session.bike
  updateMemberSession(session)

  // Update member session with `banned` key and "redirect" to login screen
  if (!isPrivilegedAccount(session.mail)) {
    markAsBanned(session)
    logout()
  }
}

const initCountdown = () => {
  // Ban member if countdown expires, otherwise, juste update the clock in the UI
  let remainingTime = 1600
  const i = setInterval(() => {
    if(remainingTime === 0) {
      banMember(i, session)
    } else {
      remainingTime--
      updateInstruction(`Return the bike before ${(remainingTime/100)/2} hours.`)
    }
  }, 10)
}

const manualBikeReturn = (e) => {
  if (hasBike(session)) {
    // Get data attributes from the target (position in array) and update the sations object
    const i = e.target.dataset.station
    const j = e.target.dataset.slot
    stations[i][j] = session.bike
    delete stations[i][j].rentTime

    // Detach bike from member
    delete session.bike
    updateMemberSession(session)

    // Update the statkl object in localStorage and reload page
    setItem('sb-stations', JSON.stringify(stations))
    pageReload()

  } else {
    alert('You are not riding a bike.')
  }
}

const rentBike = (e) => {
  if (!hasBike(session)) {
    // Get data attributes from target
    const bikeId = e.target.dataset.bike
    const bikeColor = e.target.dataset.color
    const stationNo = e.target.dataset.station
    const slotNo = e.target.dataset.slot

    // Udpate UI of the slot (becomes parking slot)
    e.preventDefault()
    e.target.className = 'slot parking'
    e.target.style.backgroundColor = '#f0f0f0'
    e.target.dataset.bike = ''
    e.target.dataset.station = stationNo
    e.target.dataset.slot = slotNo
    e.target.dataset.color = ''
    e.target.removeEventListener('click', rentBike)
    e.target.addEventListener('click', manualBikeReturn, false)

    // Update data
    // Add bike object to session
    session.bike = {
      'id': bikeId,
      'color': bikeColor,
      'rentTime': new Date().getTime()
    }
    updateMemberSession(session)

    // Remove bike from the local storage
    removeBikeFromStation(bikeId)

    // Start countdown
    initCountdown()

  } else {
    alert('You are already riding a bike!')
  }
}

/*
  Component UI
*/

export const Stations = () => {
  // Stations element
  const wrapper = document.createElement('div')

  // User name
  const memberName = document.createElement('p')
  memberName.innerHTML = `Welcome, ${session.name}.`
  wrapper.appendChild(memberName)

  // Feedback area (instructions, errors...)
  const instruction = document.createElement('p')
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
      bike.dataset.color = f.color || ''
      bike.style.backgroundColor = f.color || '#f0f0f0'
      f.id ? bike.addEventListener('click', rentBike, false) : bike.addEventListener('click', manualBikeReturn, false)
      station.appendChild(bike)
    })
    wrapper.appendChild(station)
  })
  return wrapper
}
