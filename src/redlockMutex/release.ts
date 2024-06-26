import createDebug from 'debug'
import type { RedisClient } from '../types'

import { delIfEqualLua } from '../mutex/release'

const debug = createDebug('redis-semaphore:redlock-mutex:release')

export async function releaseRedlockMutex(
  clients: RedisClient[],
  key: string,
  identifier: string
) {
  debug(key, identifier)
  const promises = clients.map(client =>
    delIfEqualLua(client, [key, identifier]).catch(() => 0)
  )
  const results = await Promise.all(promises)
  debug('results', results)
}
