/** Dependencies */
import nookies from 'nookies'

/** API */
import { fetchClass } from './[id]'

/** Constants */
const blizzApiRoute = 'https://us.api.blizzard.com/data/wow/playable-class/index?namespace=static-us&locale=en_US'

export async function fetchClassIndex(params) {
  try {
    const res = await fetch(blizzApiRoute, {
      method: 'GET',
      headers: { Authorization: `Bearer ${params?.access_token}` },
      cache: 'force-cache',
    }).then((res) => res.json())

    return res
  } catch (e) {
    console.log('[ERROR]: ', e)
  }
}

export async function selectClasses(ctx) {
  try {
    const { token } = nookies.get(ctx)
    const classData = await fetchClassIndex({ access_token: token })
    const classDetailFetchers = classData?.classes.map((c) =>
      fetchClass({ access_token: token, id: c.id })
    )
    const classDetails = await Promise.all(classDetailFetchers)

    return classDetails
  } catch (e) {
    console.log('[ERROR]: ', e)
  }
}

export default async function handler(req, res) {
  const data = await fetchClassIndex(req?.query)
  res.status(200).json({ data })
}
