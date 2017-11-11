import './Stations.css'
import stations from './../../public/stations.json'
import bikeImg from './../../public/bike.svg'
import parkingImg from './../../public/parking.svg'

export const banMember = () => console.log('Ban member')

export const startCountdown = () => console.log('Ban member')

export const detachBike = () => console.log('Detach bike')

export const attachBike = () => console.log('Attach bike')

export const isMember = () => console.log('Is member')

export const isBanned = () => console.log('Is banned')

export const returnBike = (id) => console.log('Return bike ' + id)

export const rentBike = (id) => console.log('Rent bike ' + id)

export const toggleBike = (e) => {
  e.preventDefault()
  const bike = e.srcElement.dataset.bike
  bike ? rentBike(bike) : returnBike(bike)
}

export const Stations = () => {
  const bike = document.createElement('div')
  let bikeHtml = ''
  stations.map((e, i) => {
    bikeHtml += `<div class='station'>`
      bikeHtml += `<p>Station ${i+1}</p>`
      e.map((f) => {
        bikeHtml += `<a href='#' class='bike' data-bike='${f.id || ''}' style='background:${f.color || `#f0f0f0`}'>`
          bikeHtml += `<img src=${f.id ? bikeImg : parkingImg} alt='Bike slot' data-bike='${f.id || ''}' />`
        bikeHtml += `</a>`
      })
    bikeHtml += '</div>'
  })
  bike.innerHTML = bikeHtml
  return bike
}
