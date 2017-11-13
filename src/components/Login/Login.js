import './Login.css'
import { updateInstruction, createInput } from './../../common/lib.js'

/*
  Component logic
*/

export const login = () => console.log('Login attempt')

export const register = () => console.log('register attempt')

export const isMember = () => console.log('Is member')

export const isAdmin = (id) => id === 'admin'

/*
  Component UI
*/

export const Login = () => {
  const wrapper = document.createElement('div')

  // Feedback area (instructions, errors...)
  const instruction = document.createElement('p')
  instruction.id = 'instructions'
  instruction.innerHTML = 'Welcome, login or register to start using our service.'
  wrapper.appendChild(instruction)

  // Register form
  const registerForm = document.createElement('form')
  registerForm.appendChild(createInput('text', '', 'register-name', 'Enter your name'))
  registerForm.appendChild(createInput('text', '', 'register-mail', 'Enter your email address'))
  registerForm.appendChild(createInput('text', '', 'register-name', 'Enter your phone number'))
  registerForm.appendChild(createInput('submit', 'Register', 'register-submit', ''))
  wrapper.appendChild(registerForm)

  const separator = document.createElement('hr')
  wrapper.appendChild(separator)

  // Login form
  const loginForm = document.createElement('form')
  loginForm.appendChild(createInput('text', '', 'register-mail', 'Enter your email address'))
  loginForm.appendChild(createInput('submit', 'Login', 'login-submit', ''))
  wrapper.appendChild(loginForm)

  return wrapper
}
