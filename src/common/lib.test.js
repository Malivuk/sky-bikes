import { isEmptyObject, isMember, isBanned } from './lib.js'
import { expect } from 'chai'

const testUsers = [
  {
    "mail": "admin@fb.com",
    "name": "Admin",
    "phone": "00000000000"
  },
  {
    "mail": "john@doe.com",
    "name": "John",
    "phone": "00000000001",
    "banned": true
  }
]

describe('isEmptyObject', () => {
  context('when object is not empty', () => {
    it('returns false', () => {
      expect(isEmptyObject({name: 'joe'})).to.equal(false)
    })
  })
  context('when object is empty', () => {
    it('returns true', () => {
      expect(isEmptyObject({})).to.equal(true)
    })
  })
})

describe('isMember', () => {
  context('when email doesn\'t match any member', () => {
    it('returns undefined', () => {
      expect(isMember('fake@fb.com', testUsers)).to.equal(undefined)
    })
  })
  context('when email matches a member', () => {
    it('returns an object', () => {
      expect(isMember('admin@fb.com', testUsers)).to.be.an('object')
    })
  })
})

describe('isBanned', () => {
  context('when email matches a member which is not banned', () => {
    it('returns false', () => {
      expect(isBanned('admin@fb.com', testUsers)).to.equal(false)
    })
  })
  context('when email matches a member which is banned', () => {
    it('returns true', () => {
      expect(isBanned('john@doe.com', testUsers)).to.equal(true)
    })
  })
})
