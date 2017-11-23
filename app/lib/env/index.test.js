'use strict'

const factory = require('.')

describe('env', () => {
  describe('factory function', () => {
    const fn = factory({}, () => '')

    it('is a function', () => {
      expect(typeof factory).toBe('function')
    })

    it('returns an object when called', () => {
      expect(typeof fn).toBe('object')
    })

    it('exports `parsed` property', () => {
      expect(typeof fn.parsed).toBe('object')
    })
  })

  describe('parseEnvFile', () => {
    const { parseEnvFile } = factory({}, () => '')

    it('transforms into object', () => {
      const filecontents =
        `abc=def\n` +
        `foo=bar`
      expect(parseEnvFile(filecontents)).toEqual({
        'abc': 'def',
        'foo': 'bar'
      })
    })

    it('trims spaces', () => {
      const filecontents =
        `abc= def \n` +
        ` foo =bar`
      expect(parseEnvFile(filecontents)).toEqual({
        'abc': 'def',
        'foo': 'bar'
      })
    })

    it('splits on cross-platform newlines', () => {
      const filecontents =
        `win=dows\r\n` +
        `abc=def\n` +
        `foo =bar`
      expect(parseEnvFile(filecontents)).toEqual({
        'win': 'dows',
        'abc': 'def',
        'foo': 'bar'
      })
    })
  })

  describe('splitPairs', async () => {
    const { splitPairs } = factory({}, () => '')

    it('splits only on first equals', () => {
      const str = 'abc=def=ghi'
      expect(splitPairs(str)).toEqual(['abc', 'def=ghi'])
    })
  })

  describe('trimQuotes', async () => {
    const { trimQuotes } = factory({}, () => '')

    it('trims single quotes', () => {
      const str = `'abc'`
      expect(trimQuotes(str)).toEqual(`abc`)
    })

    it('trims double quotes', () => {
      const str = `"abc"`
      expect(trimQuotes(str)).toEqual(`abc`)
    })

    it('does only trim the first level of quoting (single)', () => {
      const str = `'"abc"'`
      expect(trimQuotes(str)).toEqual(`"abc"`)
    })

    it('does only trim the first level of quoting (double)', () => {
      const str = `"'abc'"`
      expect(trimQuotes(str)).toEqual(`'abc'`)
    })

    it('does not trim incomplete single quotes', () => {
      const str = `abc'`
      expect(trimQuotes(str)).toEqual(`abc'`)
    })

    it('does not trim incomplete double quotes', () => {
      const str = `"abc`
      expect(trimQuotes(str)).toEqual(`"abc`)
    })
  })
})
