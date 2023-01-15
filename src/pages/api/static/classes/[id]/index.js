const baseRoute = 'https://us.api.blizzard.com/data/wow/playable-class'
const locale = '?namespace=static-us&locale=en_US'

export async function fetchClass(params) {
  try {
    const res = await fetch(`${baseRoute}/${params.id}` + locale, {
      method: 'GET',
      headers: { Authorization: `Bearer ${params?.access_token}` },
      cache: 'force-cache'
    }).then(res => res.json())

    return res
  } catch (e) {
    console.log('[ERROR]: ', e)
  }
}

export default async function handler(req, res) {
  const data = await fetchClass(req?.query)
  res.status(200).json({ data })
}
