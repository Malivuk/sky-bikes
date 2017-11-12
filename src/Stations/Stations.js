import './Stations.css'
import initStationsList from './../../public/stations.json'

/*
  Component logic
*/

// TODO delete
console.log(JSON.parse(localStorage.getItem('stations')))
if (JSON.parse(localStorage.getItem('stations')) == null) {
  localStorage.setItem('stations', JSON.stringify(initStationsList))
}
let stationsList = JSON.parse(localStorage.getItem('stations'))

// TODO make common
const isEmptyObject = (o) => Object.keys(o).length === 0 && o.constructor === Object ? true : false

const updateInstruction = (i) => document.getElementById('instructions').innerHTML = i

const returnBike = () => {
  // e.preventDefault()
  stationsList.some((station) => station.some((bike, i) => isEmptyObject(bike) ? station[i] = {id: '99', color: 'pink'} : false))
  localStorage.setItem('stations', JSON.stringify(stationsList))
  console.log(stationsList)
}

const banMember = (t) => {
  clearInterval(t)
  // TODO mark as banned
  // TODO return bike
  returnBike()
  updateInstruction('Remaining time is over.')
}

const initCountdown = () => {
  let remainingTime = 2
  const t = setInterval(() => remainingTime === 0 ? banMember(t) : updateInstruction(`Return the bike before ${remainingTime--}.`), 1000)
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
  stationsList.forEach((station) => station.forEach((bike, i) => bike.id === id ? station[i] = {} : false))
  localStorage.setItem('stations', JSON.stringify(stationsList))
  console.log(stationsList)

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
  instruction.id = 'instructions'
  instruction.innerHTML = 'Rent a bike by clicking on it.'

  wrapper.appendChild(instruction)

  stationsList.map((e, i) => {
    // Single station element
    const station = document.createElement('div')
    station.className = 'station'

    const label = document.createElement('p')
    label.innerHTML = `Station ${i+1}`

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
  updateInstruction,
  returnBike
}
