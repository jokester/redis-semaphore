const chai = require('chai')
require('sinon')
const sinonChai = require('sinon-chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.use(sinonChai)
global.expect = chai.expect

const redis = require('redis')

const URL = process.env.REDIS_URI || 'redis://127.0.0.1:6379'

before(() => {
  global.client = redis.createClient({ url: URL })
})

beforeEach(async () => {
  await global.client.flushdbAsync()
})

after(async () => {
  await global.client.quitAsync()
})
