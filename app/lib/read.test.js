'use strict'

const factory = require('./read')

describe('read', () => {
  describe('factory function', () => {
    it('is a function', () => {
      expect(typeof factory).toBe('function')
    })

    it('returns a function when called', () => {
      const fn = factory({})
      expect(typeof fn).toBe('function')
    })
  })

  describe('calls the correct nodejs core module interface', () => {
    it('passes the file', () => {
      const fs = { readFileSync: (file, enc) => file }
      const read = factory(fs)
      expect(read('dummy')).toBe('dummy')
    })

    it('specifies utf8 encoding', () => {
      const fs = { readFileSync: (file, enc) => enc }
      const read = factory(fs)
      expect(read()).toBe('utf8')
    })

    it('returns a string', () => {
      const toString = () => 'dummy'
      const fs = { readFileSync: (file, enc) => ({ toString }) }
      const read = factory(fs)
      expect(read()).toBe('dummy')
    })
  })
})
