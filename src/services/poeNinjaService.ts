import axios from 'axios'

const CACHE_KEY = 'poegems-cache'
const POE_NINJA_API = '/poe1/api/economy/stash/current/item/overview?league=Mirage&type=SkillGem'
const ONE_HOUR = 60 * 60 * 1000

export async function getGems() {
  const cached = localStorage.getItem(CACHE_KEY)
  if (cached) {
    const { timestamp, data } = JSON.parse(cached)
    if (Date.now() - timestamp < ONE_HOUR) {
      return data
    }
  }
  const response = await axios.get(POE_NINJA_API)
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    timestamp: Date.now(),
    data: response.data.lines
  }))
  return response.data.lines

}
