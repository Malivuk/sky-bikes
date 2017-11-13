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
getItem('sb-stations') ? getItem('sb-stations') : setItem('sb-stations', JSON.stringify(initStationsList))

/*
  Initiliaze an new array of Users
  or fetch existing data from localstorage
*/
getItem('sb-members') ? getItem('sb-members') : setItem('sb-members', JSON.stringify(initUsers))

/*
  Shows Login component if no session exists
  Shows Station component otherwise
*/
getSession('sb-session') ? document.getElementById('stations').appendChild(Stations()) : document.getElementById('login').appendChild(Login())

// TODO attach admin superpowers to view
// TODO attach worker superpowers to view
