import './Login.css'
import { updateInstruction, getItem, createInput, isMember, isBanned } from './../../common/lib.js'

/*
  Component logic
*/

const members = JSON.parse(getItem('sk-members'))
console.log(members)

export const isValidName = (n) => false

export const isValidEmail = (e) => false

export const isValidPhone = (p) => false

export const startNewSession = (m) => console.log(m.email) // new session + reload

export const registerAttempt = (e) => {
  e.preventDefault()

  // Sanitize and check fields
  const form = document.forms['register-form']
  let errors = ''
  const member = {
    'name': form['register-name'].value,
    'phone': form['register-phone'].value,
    'mail': form['register-mail'].value
  }
  errors += !isValidName(member.name) ? 'Please enter a valid name (e.g., John Doe).<br>' : ''
  errors += !isValidPhone(member.phone) ? 'Please enter a valid phone number (e.g., 01034947369).<br>' : ''
  errors += !isValidEmail(member.mail) ? 'Please enter a valid email address (e.g., john@doe.com).<br>'
    : isMember(member.mail) ? 'You are already registered, please login.<br>'
      : isBanned(member.mail) ? 'You are not allowed to access the service, please contact support@skybikes.com.<br>'
        : ''

  // Push errors or register
  errors ? updateInstruction(errors) : startNewSession(member)
}

export const loginAttempt = (e) => {
  e.preventDefault()

  // Sanitize and check fields
  let errors = ''
  const member = {}
  errors += !isValidEmail(member.mail) ? 'Please enter a valid email address (e.g., john@doe.com).<br>'
    : !isMember(member.mail) ? 'You are not registered yet, please register.<br>'
      : isBanned(member.mail) ? 'You are not allowed to access the service, please contact support@skybikes.com.<br>'
        : ''

  // Push errors or login
  errors ? updateInstruction(errors) : startNewSession(member)
}

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
  registerForm.name = 'register-form'
  registerForm.appendChild(createInput('text', '', 'register-name', 'Enter your name', '', ''))
  registerForm.appendChild(createInput('text', '', 'register-mail', 'Enter your email address', '', ''))
  registerForm.appendChild(createInput('text', '', 'register-phone', 'Enter your phone number', '', ''))
  registerForm.appendChild(createInput('submit', 'Register', 'register-submit', '', 'click', registerAttempt))
  wrapper.appendChild(registerForm)

  const separator = document.createElement('hr')
  wrapper.appendChild(separator)

  // Login form
  const loginForm = document.createElement('form')
  loginForm.name = 'login-form'
  loginForm.appendChild(createInput('text', '', 'register-mail', 'Enter your email address', '', ''))
  loginForm.appendChild(createInput('submit', 'Login', 'login-submit', '', 'click', loginAttempt))
  wrapper.appendChild(loginForm)

  return wrapper
}
