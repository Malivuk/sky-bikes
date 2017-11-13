/*
  Helper methods
*/

export const isEmptyObject = (o) => (Object.keys(o).length === 0 && o.constructor === Object) === true

export const isMember = (email, members) => members.find((m) => m.mail === email)

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

export const createInput = (type, value, name, placeholder, eventListener, callback) => {
  const input = document.createElement('input')
  input.type = type
  input.value = value
  input.name = name
  input.placeholder = placeholder
  input.addEventListener(eventListener, callback)
  return input
}

export const pageReload = () => window.location.reload()
