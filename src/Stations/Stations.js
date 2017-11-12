// Style
import './Stations.css'
import stationsList from './../../public/stations.json'

// Logic
export const banMember = () => console.log('Ban member')

export const detachBike = () => console.log('Detach bike')

export const attachBike = () => console.log('Attach bike')

export const isMember = () => console.log('Is member')

export const isBanned = () => console.log('Is banned')

export const hasBike = () => console.log('Has bike')

export const returnBike = (e) => {
  e.preventDefault()
  console.log('Return bike (from LS)')
}

localStorage.setItem('stations', JSON.stringify(stationsList))
let testStations = JSON.parse(localStorage.getItem('stations'))

export const rentBike = (e) => {
  e.preventDefault()
  const id = e.target.dataset.bike

  // Update data
  testStations.forEach((station) => station.forEach((bike, i) => bike.id === id ? station[i] = {} : false))
  localStorage.setItem('stations', JSON.stringify(testStations))

  // Udpate UI
  e.target.className = 'slot parking'
  e.target.style.backgroundColor = '#f0f0f0'
  e.target.dataset.bike = ''
  e.target.addEventListener('click', returnBike)
  document.getElementById('instructions').innerHTML = `Return the bike by clicking a parking icon before ${5000}`

  // isMember()
  // isBanned()
  // attachBike()
  // banMember()
}

// UI
export const Stations = () => {
  const wrapper = document.createElement('div')

  // Stations element
  const instruction = document.createElement('p')
  instruction.id = 'instructions'
  instruction.innerHTML = 'Renting a bike by clicking on it.'

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
