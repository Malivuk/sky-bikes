import './login.css'

export const isAdmin = (id) => id === 'admin'

export const Login = () => {
  const element = document.createElement('div')
  element.innerHTML = isAdmin('admin') ? 'Hello, sys admin!' : 'Hello, visitor!'
  return element
}
