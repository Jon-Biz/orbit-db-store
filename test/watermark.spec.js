'use strict'

const assert = require('assert')
const Store = require('../src/Store')

const Cache = require('orbit-db-cache')
const Keystore = require('orbit-db-keystore')
const IdentityProvider = require('orbit-db-identity-provider')
const DefaultOptions = Store.DefaultOptions

// Test utils
const {
  config,
  testAPIs,
  startIpfs,
  stopIpfs
} = require('orbit-db-test-utils')

const storage = require('orbit-db-storage-adapter')(require('memdown'))

Object.keys(testAPIs).forEach((IPFS) => {
  describe(`Events ${IPFS}`, function () {
    let ipfsd, ipfs, testIdentity, identityStore, store, cacheStore

    this.timeout(config.timeout)

    const ipfsConfig = Object.assign({}, config.defaultIpfsConfig, {
      repo: config.defaultIpfsConfig.repo + '-entry' + new Date().getTime()
    })

    after(async () => {
      await store.close()
      await stopIpfs(ipfsd)
      await identityStore.close()
      await cacheStore.close()
    })

    afterEach(async () => {
      await store.drop()
      await cacheStore.open()
      await identityStore.open()
    })

    before(async () => {
      identityStore = await storage.createStore('identity')
      const keystore = new Keystore(identityStore)

      cacheStore = await storage.createStore('cache')
      const cache = new Cache(cacheStore)

      testIdentity = await IdentityProvider.createIdentity({ id: 'userA', keystore })
      ipfsd = await startIpfs(IPFS, ipfsConfig.daemon1)
      ipfs = ipfsd.api

      const address = 'test-address'
      const options = Object.assign({}, DefaultOptions, { cache })

      store = new Store(ipfs, testIdentity, address, options)
    })

    it('should call ._index.addEntry when it receives an op', async () => {

    })

    it('should call ._createWatermark() every WATERMARK_INTERVAL ops', async () => {
        
    })

    it('when passed an op out of order, it should call _index.clear with all operations after the previous watermark, before passing all the entries to ._index.addOperation', async() => {

    })
  })
})
