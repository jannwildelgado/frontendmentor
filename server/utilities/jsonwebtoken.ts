import * as _jsonwebtoken from 'jsonwebtoken'

import {
  sign as signType,
  verify as verifyType
} from 'jsonwebtoken'

const jsonwebtoken = <any>_jsonwebtoken

const signJWT: typeof signType = jsonwebtoken.default.sign
const verifyJWT: typeof verifyType = jsonwebtoken.default.verify

export {
  signJWT,
  verifyJWT
}
