import './login.css'
import json from './../../public/stations.json'

console.log(json)
json.map((e) => console.log(e))

export const isAdmin = (id) => id === 'admin'

export const Login = () => {
  const element = document.createElement('div')
  element.innerHTML = isAdmin('admin') ? 'Hello, sys admin!' : 'Hello, visitor!'
  return element
}
