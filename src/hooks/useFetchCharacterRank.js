import { useEffect, useState } from 'react'

const useFetchCharacterRank = (auth, name, bracket) => {
  const [character, setCharacter] = useState(null)
  const [minimumRank, setMinimumRank] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch('/api/dynamic/leaderboard?' + new URLSearchParams({
          access_token: auth?.token,
          season: 34,
          bracket: bracket
        }, { next: { revalidate: 60 } })).then(res => res.json())
  
        const entries = res?.data?.entries
        const character = entries?.find((d) => d?.character?.name === name)
  
        setCharacter(character)
        setMinimumRank(entries?.[entries?.length - 1]?.rating)
      } catch (e) {
        console.log('[ERROR]: ', e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [auth, name, bracket])

  return {
    data: { character, minimumRank },
    loading
  }
}

export default useFetchCharacterRank
