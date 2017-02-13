const assert = require('assert')
const transform = require('./tranform')

describe('sourceToTarget()', function() {

  it('Flat in from, flat in to', () => {

    const from = {
      firstName: 'John'
    }

    const to = {
      firstName: ''
    }

    const expectedTo = {
      firstName: 'John'
    }

    const result = transform.sourceToTarget(from, to)
    assert.deepEqual(expectedTo, result)
  })

  it('Nested in from, flat in to', () => {

    const from = {
      section: {
        firstName: 'John'
      }
    }

    const to = {
      firstName: ''
    }

    const expectedTo = {
      firstName: 'John'
    }

    const result = transform.sourceToTarget(from, to)
    assert.deepEqual(expectedTo, result)
  })

  it('Flat in from, nested in to', () => {

    const from = {
      firstName: 'John'
    }

    const to = {
      section: {
        firstName: ''
      }
    }

    const expectedTo = {
      section: {
        firstName: 'John'
      }
    }

    const result = transform.sourceToTarget(from, to)
    assert.deepEqual(expectedTo, result)
  })

})
