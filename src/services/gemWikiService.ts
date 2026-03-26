import axios from 'axios'
import type { CargoGemRaw, GemLevelData } from '@/types/gemWiki'

const WIKI_BASE = 'https://www.poewiki.net/w/api.php'
const CACHE_DURATION_MS = 60 * 60 * 1000

function parseRawLevels(raw: CargoGemRaw[]): GemLevelData[] {
  return raw
    .filter(entry => entry.experience !== null && entry.level !== '0')
    .map(entry => ({
      level: parseInt(entry.level),
      experience: parseInt(entry.experience!)
    }))
}
