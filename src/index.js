import './index.css'
import { Login } from './Login/Login.js'
import { Stations } from './Stations/Stations.js'

// Build page
document.getElementById('login').appendChild(Login())
document.getElementById('stations').appendChild(Stations())
