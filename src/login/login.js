import './login.css'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp({
  apiKey: 'AIzaSyCGAmwgYWVAqYE05eVBymPULVbqfV71gjY',
  authDomain: 'skybikes-5dc1d.firebaseapp.com',
  databaseURL: 'https://skybikes-5dc1d.firebaseio.com',
  projectId: 'skybikes-5dc1d',
  storageBucket: 'skybikes-5dc1d.appspot.com',
  messagingSenderId: '967665026789'
})

const getEnvironment = () => firebase.database().ref('/env').once('value').then((snap) => console.log(snap.val()))
getEnvironment()

export const isAdmin = (id) => id === 'admin'

export const Login = () => {
  const element = document.createElement('div')
  element.innerHTML = isAdmin('admin') ? 'Hello, sys admin!' : 'Hello, visitor!'
  return element
}
