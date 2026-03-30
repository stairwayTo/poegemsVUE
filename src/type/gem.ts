export interface GemSummary {
  id?: number
  name: string
  icon: string
  lvl1Price?: number
  lvl1q20Price?: number
  lvlMaxPrice?: number
  lvlMaxq20Price?: number
  maxLevel: number
  profit1_0To1_20?: number
  profit1_0ToMax_0?: number
  profit1_0ToMax_20?: number
  profit1_20ToMax_20?: number
  xpToMax: number
  gemClass: string
  profitPerMXp?: number
}
