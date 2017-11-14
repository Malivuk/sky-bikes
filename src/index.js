import './index.css'
import { Login } from './components/Login/Login.js'
import { Stations } from './components/Stations/Stations.js'
import { Admin } from './components/Admin/Admin.js'
import { Staff } from './components/Staff/Staff.js'
import { getItem, setItem, getSession } from './common/lib.js'
import { initStations } from './../public/data/stations.js'
import { initUsers } from './../public/data/members.js'

/*
  Initiliaze an new array of Stations
  or fetch existing data from localstorage
*/
getItem('sb-stations') ? getItem('sb-stations') : setItem('sb-stations', JSON.stringify(initStations))

/*
  Initiliaze an new array of Users
  or fetch existing data from localstorage
*/
getItem('sb-members') ? getItem('sb-members') : setItem('sb-members', JSON.stringify(initUsers))

/*
  Shows Login component if no session exists
  Shows Station component otherwise
  Shows additionnal components to super users
*/
if (getSession('sb-session')) {
  document.getElementById('stations').appendChild(Stations())
    if (getSession('sb-session') === 'admin@sb.com') {
    document.getElementById('admin').appendChild(Admin())
  } else if (getSession('sb-session') === 'staff@sb.com') {
    document.getElementById('staff').appendChild(Staff())
  }
} else {
  document.getElementById('login').appendChild(Login())
}
