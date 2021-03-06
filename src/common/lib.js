/*
  Helper methods
*/

export const isEmptyObject = (o) => (Object.keys(o).length === 0 && o.constructor === Object) === true

export const sanitize = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

export const isValidName = (n) => (n.length >= 4 && n.length < 20) === true

export const isValidEmail = (e) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e)

export const isValidPhone = (p) => /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(p)

export const isMember = (email, members) => members.find((m) => m.mail === email)

export const isPrivilegedAccount = (session) => (session === 'admin@sb.com' || session === 'staff@sb.com') === true

export const hasBike = (session) => session.hasOwnProperty('bike') === true

export const isBanned = (email, members) => {
  const member = members.find((m) => m.mail === email)
  return member.banned === true
}

/*
  Data manipulation methods
*/

export const getItem = (i) => window.localStorage.getItem(i) || false

export const setItem = (i, v) => window.localStorage.setItem(i, v)

export const delItem = (i) => window.localStorage.removeItem(i)

export const getSession = (s) => window.sessionStorage.getItem(s)

export const setSession = (s, v) => window.sessionStorage.setItem(s, v)

export const delSession = (s) => window.sessionStorage.removeItem(s)

/*
  UI manipulation methods
*/

export const updateInstruction = (i) => {
  document.getElementById('instructions').innerHTML = i
}

export const createInput = (type, value, name, placeholder) => {
  const input = document.createElement('input')
  input.type = type
  input.value = value
  input.name = name
  input.placeholder = placeholder
  return input
}

export const pageReload = () => window.location.reload()
