import { createContext } from 'react'

// viewBox shared by every layer of a scene, so all layers stay aligned
export const SceneContext = createContext('0 0 1600 900')
