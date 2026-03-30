import axios from 'axios'

const POE_NINJA_API = '/poe1/api/economy/stash/current/item/overview?league=Mirage&type=SkillGem'

export async function getGems() {
  const response = await axios.get(POE_NINJA_API)
  return response.data.lines
}
