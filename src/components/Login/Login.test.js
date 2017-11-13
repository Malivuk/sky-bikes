import { isAdmin } from './Login.js'
import { expect } from 'chai'

describe('isAdmin', () => {
  context('when input is not empty but wrong', () => {
    it('returns false', () => {
      expect(isAdmin('joe')).to.equal(false)
    })
  })
})
