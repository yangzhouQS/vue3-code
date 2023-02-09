import * as Core from './exports'

export * from './exports'
import {globalThisPolyfill} from '../shared'

globalThisPolyfill["Designable"] = globalThisPolyfill['Designable'] || {}
globalThisPolyfill['Designable'].Core = Core
