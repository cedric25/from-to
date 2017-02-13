const transform = require('./tranform')

const from = {
  section: {
    firstName: 'John'
  }
}

const to = {
  firstName: ''
}

const result = transform.sourceToTarget(from, to)

console.log(result)
