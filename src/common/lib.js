/*
  Defining some global methods
*/

export const isEmptyObject = (o) => (Object.keys(o).length === 0 && o.constructor === Object) === true

export const getItem = (i) => window.localStorage.getItem(i) || false

export const setItem = (i, v) => window.localStorage.setItem(i, v)

export const delItem = (i) => window.localStorage.removeItem(i)

export const getSession = (s) => window.sessionStorage.getItem(s)

export const setSession = (s, v) => window.sessionStorage.setItem(s, v)

export const delSession = (s) => window.sessionStorage.removeItem(s)

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
