import './index.css'
import { Login } from './components/Login/Login.js'
import { Stations } from './components/Stations/Stations.js'
import { getItem, setItem, getSession } from './common/lib.js'
import initStationsList from './../public/stations.json'
import initUsers from './../public/members.json'

/*
  Initiliaze an new array of Stations
  or fetch existing data from localstorage
*/
getItem('sk-stations') ? getItem('sk-stations') : setItem('sk-stations', JSON.stringify(initStationsList))

/*
  Initiliaze an new array of Users
  or fetch existing data from localstorage
*/
getItem('sk-members') ? getItem('sk-members') : setItem('sk-members', JSON.stringify(initUsers))

/*
  Shows Login component if no session exists
  Shows Station component otherwise
*/
getSession('sk-session') ? document.getElementById('stations').appendChild(Stations()) : document.getElementById('login').appendChild(Login())

// TODO attach admin superpowers to view
// TODO attach worker superpowers to view
