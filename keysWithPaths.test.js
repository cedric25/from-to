const assert = require('assert')
const transform = require('./tranform')

describe('keysWithPaths()', function() {

  it('Simple object', () => {

    const mockObject = {
      section: {
        firstName: 'John',
      }
    }

    const expectedKeysWithPaths = [
      { keyName: 'firstName', path: 'section.firstName' },
    ]

    const keysWithPaths = transform.keysWithPaths(mockObject)

    assert.deepEqual(expectedKeysWithPaths, keysWithPaths)
  });

  describe('When setting \'onlyIfValue\' to true', () => {
    it('should not take keys with no value', () => {

      const mockObject = {
        section: {
          title: null,
          firstName: 'John',
          lastName: '',
          dateOfBirth: undefined,
          countContracts: 0,
        }
      }

      const expectedKeysWithPaths = [
        { keyName: 'firstName', path: 'section.firstName' },
        { keyName: 'countContracts', path: 'section.countContracts' },
      ]

      const onlyIfValue = true
      const keysWithPaths = transform.keysWithPaths(mockObject, onlyIfValue)

      assert.deepEqual(expectedKeysWithPaths, keysWithPaths)
    });
  });
  describe('When not setting \'onlyIfValue\'', () => {
    it('should take keys with any value', () => {

      const mockObject = {
        section: {
          title: null,
          firstName: 'John',
          lastName: '',
          dateOfBirth: undefined,
          countContracts: 0,
        }
      }

      const expectedKeysWithPaths = [
        { keyName: 'title', path: 'section.title' },
        { keyName: 'firstName', path: 'section.firstName' },
        { keyName: 'lastName', path: 'section.lastName' },
        { keyName: 'dateOfBirth', path: 'section.dateOfBirth' },
        { keyName: 'countContracts', path: 'section.countContracts' },
      ]

      const keysWithPaths = transform.keysWithPaths(mockObject)

      assert.deepEqual(expectedKeysWithPaths, keysWithPaths)
    });
  });

})
