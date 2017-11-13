import './Stations.css'
import { isEmptyObject, getItem, setItem, updateInstruction } from './../../common/lib.js'

/*
  Component logic
*/
const stations = JSON.parse(getItem('sk-stations'))

const returnBike = () => {
  stations.some((station, i) => station.some((bike, j) => isEmptyObject(bike) ? station[j] = {id: '99', color: 'pink'} : false))
  setItem('sk-stations', JSON.stringify(stations))
}

const banMember = (i) => {
  clearInterval(i)
  // TODO mark as banned
  // TODO return bike
  returnBike()
  updateInstruction('Remaining time is over.')
  // Todo kill session + reload
}

const initCountdown = () => {
  let remainingTime = 2
  const i = setInterval(() => remainingTime === 0 ? banMember(i) : updateInstruction(`Return the bike before ${remainingTime--}.`), 1000)
}

const rentBike = (e) => {
  e.preventDefault()
  const id = e.target.dataset.bike

  // 1. isMember(user)
  // 2. isBanned(user)
  // 3. hasBike(user)
  // 4. handleError(error)
  // 5. addBikeToUser(user)
  // 6. removeBikeFromStation(bikeID) + UI update
  // 7. removeBikeFromUser
  // 8. addBikeToStation
  // 9. isStationSlotFree
  // 10. banMember(user)

  // Update data
  stations.forEach((station) => {
    station.forEach((bike, i) => {
      if (bike.id === id) {
        station[i] = {}
      }
    })
  })
  setItem('sk-stations', JSON.stringify(stations))

  // Udpate UI
  e.target.className = 'slot parking'
  e.target.style.backgroundColor = '#f0f0f0'
  e.target.dataset.bike = ''
  e.target.addEventListener('click', returnBike)

  initCountdown()
}

/*
  Component UI
*/

const Stations = () => {
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

    e.map((f) => {
      // Single bike element
      const bike = document.createElement('a')
      bike.href = '#'
      bike.className = f.id ? 'bike slot' : 'parking slot'
      bike.dataset.bike = f.id || ''
      bike.style.backgroundColor = f.color || '#f0f0f0'
      f.id ? bike.addEventListener('click', rentBike) : bike.addEventListener('click', returnBike)
      station.appendChild(bike)
    })
    wrapper.appendChild(station)
  })
  return wrapper
}

export {
  Stations,
  rentBike,
  banMember,
  initCountdown,
  returnBike
}
