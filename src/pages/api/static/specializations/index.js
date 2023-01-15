const blizzApiRoute = 'https://us.api.blizzard.com/data/wow/playable-specialization/index?namespace=static-us&locale=en_US'

export async function fetchSpecIndex(params) {
  const res = await fetch(blizzApiRoute, {
    method: 'GET',
    headers: { Authorization: `Bearer ${params?.access_token}` },
    cache: 'force-cache',
  }).then((res) => res.json())

  return res
}

export default async function handler(req, res) {
  const data = await fetchSpecIndex(req?.query)
  res.status(200).json({ data })
}
