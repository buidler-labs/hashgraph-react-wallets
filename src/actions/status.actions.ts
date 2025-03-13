import { Chain } from 'viem'
import { HWBridgeSession } from '..'

export const HEDERA_STATUS_BASE_URL = 'https://status.hedera.com'

export type ScheduledMaintenanceIncidentUpdate = {
  id: string
  status: string
  body: string
  incident_id: string
  created_at: string | null
  updated_at: string | null
  display_at: string | null
  affected_components: {
    code: string
    name: string
    old_status: string
    new_status: string
  }[]
  deliver_notifications: boolean
  custom_tweet: number | null
  tweet_id: number
}

export type ScheduledMaintenanceComponent = {
  id: string
  name: string
  status: string
  created_at: string
  updated_at: string
  position: number
  description: string
  showcase: boolean
  start_date: string | null
  group_id: string | null
  page_id: string
  group: boolean
  only_show_if_degraded: boolean
}

export type Maintenance = {
  id: string
  name: string
  status: string
  created_at: string
  updated_at: string
  monitoring_at: string
  resolved_at: string
  impact: string
  shortlink: string
  started_at: string
  page_id: string
  incident_updates: ScheduledMaintenanceIncidentUpdate[]
  components: ScheduledMaintenanceComponent[]
  scheduled_for: string
  scheduled_until: string
}

export type NetworkScheduledMaintenances<TMaintenance> = {
  page: {
    id: string
    name: string
    url: string
    time_zone: string
    updated_at: string
  }
  scheduled_maintenances: TMaintenance[]
}

class UnspecifiedChainError extends Error {
  public statusCode: number = 400

  constructor(message: string) {
    super(message)
  }
}

export const getScheduledMaintenances = async <TWallet extends HWBridgeSession>({
  wallet,
  chain,
}: {
  wallet: TWallet
  chain?: Chain
}): Promise<NetworkScheduledMaintenances<Maintenance>> => {
  const _chain = wallet.connector?.chain ?? chain ?? null

  if (!_chain) throw new UnspecifiedChainError("There's no chain provided")

  const response = await fetch(HEDERA_STATUS_BASE_URL + '/api/v2/scheduled-maintenances.json')
  return (await response.json()) as NetworkScheduledMaintenances<Maintenance>
}

export const getActiveScheduledMaintenances = async <TWallet extends HWBridgeSession>({
  wallet,
  chain,
}: {
  wallet: TWallet
  chain?: Chain
}): Promise<NetworkScheduledMaintenances<Maintenance>> => {
  const _chain = wallet.connector?.chain ?? chain ?? null

  if (!_chain) throw new UnspecifiedChainError("There's no chain provided")

  const response = await fetch(HEDERA_STATUS_BASE_URL + '/api/v2/scheduled-maintenances/active.json')
  return (await response.json()) as NetworkScheduledMaintenances<Maintenance>
}
