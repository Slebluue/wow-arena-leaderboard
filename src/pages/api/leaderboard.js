export async function fetchLeaderboard(params) {
  const url = `https://us.api.blizzard.com/data/wow/pvp-season/${params?.season}/pvp-leaderboard/${params?.bracket}?namespace=dynamic-us&locale=en-us`
  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${params?.access_token}` }
  }).then(res => res.json())

  return res
}

export default async function handler(req, res) {
  const data = await fetchLeaderboard(req.query)
  res.status(200).json({ data })
}
