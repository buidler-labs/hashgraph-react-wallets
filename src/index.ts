import { QueryClient } from '@tanstack/react-query'

export const tanstackQueryClient = new QueryClient()

export { parseEther } from 'viem'
export * from './constants'
export * from './utils'
export * from './hooks'
export * from './hWBridge'
export type * from './hWBridge/types'
export type { HWBridgeSession as HWBridgeWallet } from './hWBridge/HWBridgeSession'
export { default as HWBridgeProvider } from './provider/HWBridgeProvider'
