import { combineReducers } from 'redux'

import simulator from './simulator'
import core from './core'
import process from './process'

export default combineReducers({
  simulator,
  core,
  process
})
