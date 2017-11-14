import './Login.css'
import {
  updateInstruction,
  getItem,
  setItem,
  setSession,
  createInput,
  isMember,
  isBanned,
  sanitize,
  isValidName,
  isValidEmail,
  isValidPhone,
  pageReload
} from './../../common/lib.js'

/*
  Component logic
*/

// Load members from localStorage
const members = JSON.parse(getItem('sb-members'))

const saveMember = (member, members) => {
  members.push(member)
  setItem('sb-members', JSON.stringify(members))
  startNewSession(member)
}

const startNewSession = (m) => {
  // Create temporary session and reload page
  setSession('sb-session', JSON.stringify(m))
  pageReload()
}

const registerAttempt = (e) => {
  // Prevent form submission's default behavior
  e.preventDefault()

  // Sanitize fields
  const form = document.forms['register-form']
  const member = {
    'name': sanitize(form['register-name'].value),
    'phone': sanitize(form['register-phone'].value),
    'mail': sanitize(form['register-mail'].value)
  }

  // Build error message or return empty string
  let errors = ''
  errors += !isValidName(member.name) ? 'Please enter a valid name (e.g., John Doe).<br>' : ''
  errors += !isValidPhone(member.phone) ? 'Please enter a valid phone number (e.g., 01034947369).<br>' : ''
  errors += !isValidEmail(member.mail) ? 'Please enter a valid email address (e.g., john@doe.com).<br>'
    : isMember(member.mail, members) ? 'You are already registered, please login.<br>'
      : ''

  // Push errors or register
  errors ? updateInstruction(errors) : saveMember(member, members)
}

const loginAttempt = (e) => {
  // Prevent form submission's default behavior
  e.preventDefault()

  // Sanitize fields
  const form = document.forms['login-form']
  const member = {
    'mail': sanitize(form['login-mail'].value)
  }

  // Build error message or return empty string
  let errors = ''
  errors += !isValidEmail(member.mail) ? 'Please enter a valid email address (e.g., john@doe.com).<br>'
    : !isMember(member.mail, members) ? 'You are not registered yet, please register.<br>'
      : isBanned(member.mail, members) ? 'You are not allowed to access the service, please contact support@sbybikes.com.<br>'
        : ''

  // Push errors or login
  errors ? updateInstruction(errors) : startNewSession(isMember(member.mail, members))
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
  registerForm.appendChild(createInput('text', '', 'register-phone', 'Enter your phone number (no space)', '', ''))
  registerForm.appendChild(createInput('submit', 'Register', 'register-submit', '', 'click', registerAttempt))
  wrapper.appendChild(registerForm)

  const separator = document.createElement('hr')
  wrapper.appendChild(separator)

  // Login form
  const loginForm = document.createElement('form')
  loginForm.name = 'login-form'
  loginForm.appendChild(createInput('text', '', 'login-mail', 'Enter your email address', '', ''))
  loginForm.appendChild(createInput('submit', 'Login', 'login-submit', '', 'click', loginAttempt))
  wrapper.appendChild(loginForm)

  return wrapper
}
