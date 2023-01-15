const baseRoute = 'https://us.api.blizzard.com/data/wow/playable-specialization'
const locale = '?namespace=static-us&locale=en_US'

export async function fetchSpec(params) {
  const res = await fetch(`${baseRoute}/${params.id}` + locale, {
    method: 'GET',
    headers: { Authorization: `Bearer ${params?.access_token}` },
    cache: 'force-cache',
  }).then((res) => res.json())

  return res
}

export default async function handler(req, res) {
  const data = await fetchSpec(req?.query)
  res.status(200).json({ data })
}
