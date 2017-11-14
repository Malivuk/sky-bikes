import {
  isEmptyObject,
  isMember,
  isBanned,
  sanitize,
  isValidName,
  isValidEmail,
  isValidPhone,
  isPrivilegedAccount,
  hasBike
} from './lib.js'
import { expect } from 'chai'

const testUsers = [
  {
    "mail": "admin@sb.com",
    "name": "Admin",
    "phone": "00000000000"
  },
  {
    "mail": "john@doe.com",
    "name": "John",
    "phone": "00000000001",
    "banned": true
  },
  {
    "mail": "riding@gmail.com",
    "name": "Ridley",
    "phone": "00000000002",
    "bike": {
      "color": "#FF0000",
      "id": "14",
      "rentTime": 1046.5300000000002
    }
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
      expect(isMember('fake@sb.com', testUsers)).to.equal(undefined)
    })
  })
  context('when email matches a member', () => {
    it('returns an object', () => {
      expect(isMember('admin@sb.com', testUsers)).to.be.an('object')
    })
  })
})

describe('isBanned', () => {
  context('when email matches a member which is not banned', () => {
    it('returns false', () => {
      expect(isBanned('admin@sb.com', testUsers)).to.equal(false)
    })
  })
  context('when email matches a member which is banned', () => {
    it('returns true', () => {
      expect(isBanned('john@doe.com', testUsers)).to.equal(true)
    })
  })
})

describe('sanitize', () => {
  context('when input contains no dangerous characters', () => {
    it('returns the input value', () => {
      expect(sanitize('Joel')).to.equal('Joel')
    })
  })
  context('when input contains characters', () => {
    it('returns the escaped input value', () => {
      expect(sanitize('Joel<script>alert("hacked")</script>')).to.equal('Joel&lt;script>alert(&quot;hacked&quot;)&lt;/script>')
    })
  })
})

describe('isValidName', () => {
  context('when input length is shorter than 4 characters', () => {
    it('returns false', () => {
      expect(isValidName('Joe')).to.equal(false)
    })
  })
  context('when input length is longer than 20 characters', () => {
    it('returns false', () => {
      expect(isValidName('Joe is trying to make me mad')).to.equal(false)
    })
  })
  context('when input length is between 4 and 20 characters', () => {
    it('returns true', () => {
      expect(isValidName('Joel')).to.equal(true)
    })
  })
})

describe('isValidEmail', () => {
  context('when input is malformed', () => {
    it('returns false', () => {
      expect(isValidEmail('joemail.hack')).to.equal(false)
    })
  })
  context('when input has valid format', () => {
    it('returns true', () => {
      expect(isValidEmail('joe@gmail.com')).to.equal(true)
    })
  })
})

describe('isValidPhone', () => {
  context('when input is malformed', () => {
    it('returns false', () => {
      expect(isValidPhone('(ext.82)1034947369')).to.equal(false)
    })
  })
  context('when input has valid format', () => {
    it('returns true', () => {
      expect(isValidPhone('01034947369')).to.equal(true)
    })
  })
})

describe('isPrivilegedAccount', () => {
  context('when user is not privileged', () => {
    it('returns false', () => {
      expect(isPrivilegedAccount('normal@user.com')).to.equal(false)
    })
  })
  context('when user is privileged', () => {
    it('returns true', () => {
      expect(isPrivilegedAccount('admin@sb.com')).to.equal(true)
    })
  })
})

describe('hasBike', () => {
  context('when user has no bike object', () => {
    it('returns false', () => {
      expect(hasBike(testUsers[0])).to.equal(false)
    })
  })
  context('when user holds a bike object', () => {
    it('returns true', () => {
      expect(hasBike(testUsers[2])).to.equal(true)
    })
  })
})
