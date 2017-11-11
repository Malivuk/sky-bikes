import './index.css'
import { Login } from './Login/Login.js'
import { Stations, toggleBike } from './Stations/Stations.js'

// Build page
document.getElementById('login').appendChild(Login())
document.getElementById('stations').appendChild(Stations())

// Attach events
Array.from(document.getElementsByClassName('bike'), c => c.addEventListener('click', toggleBike))
