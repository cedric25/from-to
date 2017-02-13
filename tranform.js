const _ = require('lodash')

function sourceToTarget(source, targetTemplate) {

  // Clone destination structure
  const target = _.clone(targetTemplate)

  // Inspect source and target structure
  // TODO Keep only keys with values
  const sourceKeysWithPaths = keysWithPaths(source, true)
  console.log('sourceKeysWithPaths:', sourceKeysWithPaths)
  const targetKeysWithPaths = keysWithPaths(target)
  console.log('targetKeysWithPaths:', targetKeysWithPaths)

  fillTarget(source, sourceKeysWithPaths, target, targetKeysWithPaths)

  console.log('--- filledTarget:', target)

  const filledTarget = target
  return filledTarget
}

function keysWithPaths(obj, onlyIfValue = false, prevPath = '') {
  let pairs = []
  _.forIn(obj, (value, key) => {
    if (_.isObject(value)) {
      const keysWithPathsUbObject = keysWithPaths(value, onlyIfValue, key)
      pairs = pairs.concat(keysWithPathsUbObject)
    } else {
      const prevPathForProp = prevPath ? `${prevPath}.` : ''
      if (!onlyIfValue || (!_.isNil(value) && value !== '')) {
        pairs.push({
          keyName: key,
          path: `${prevPathForProp}${key}`
        })
      }
    }
  })
  return pairs
}

function fillTarget(source, sourceKeysWithPaths, target, targetKeysWithPaths) {

  // For each prop in source
  _.forEach(sourceKeysWithPaths, sourceKey => {
    // Loop over target keys
    _.forEach(targetKeysWithPaths, targetKey => {
      // If same key names, put the value
      if (targetKey.keyName === sourceKey.keyName) {
        _.set(target, targetKey.path, _.get(source, sourceKey.path))
        return false
      }
    })
  })
}

module.exports = {
  sourceToTarget,
  // Only to be testable
  keysWithPaths,
  fillTarget,
}
