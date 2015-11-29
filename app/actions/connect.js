import { createAction } from './createAction'
import uuid from 'uuid'

export const CONNECT_USER = 'CONNECT_USER'
export const GENERATE_USER_ID = 'GENERATE_USER_ID'

export let connectUser = createAction(CONNECT_USER, (data) => data)

export let generateUserId = createAction(GENERATE_USER_ID, () => uuid.v4())

export default { connectUser, generateUserId }
