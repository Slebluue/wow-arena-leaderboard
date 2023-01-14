import { useEffect, useState } from 'react'

const useFetchLeaderboard = (token, season, bracket) => {
  const [data, setData] = useState()

  useEffect(() => {
    async function fetch() {
      if (!token) return

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            namespace: 'dynamic-us',
            locale: 'en-us',
          },
        }

        const res = await axios.get(
          `https://us.api.blizzard.com/data/wow/pvp-season/${season}/pvp-leaderboard/${bracket}`,
          config,
        )
        setData(res?.data)
      } catch (e) {
        console.log('[ERROR]: ', e)
      }
    }

    fetch()
  }, [token])

  return data
}

export default useFetchLeaderboard
