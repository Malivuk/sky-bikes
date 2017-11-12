import './Login.css'
import users from './../../public/users.json'

export const login = () => console.log('Login attempt')

export const register = () => console.log('register attempt')

export const isMember = () => console.log('Is member')

// console.log(users)

export const isAdmin = (id) => id === 'admin'

export const Login = () => {
  const element = document.createElement('div')
  element.innerHTML = isAdmin('admin') ? 'Hello, sys admin!' : 'Hello, visitor!'
  return element
}
