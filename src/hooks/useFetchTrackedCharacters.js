import { useEffect, useState } from 'react'

const useFetchTrackedCharacters = () => {
  const [trackedCharacters, setTrackedCharacters] = useState([])

  useEffect(() => {
    getTrackedCharacters()
  }, [])

  const getTrackedCharacters = () => {
    const items = { ...localStorage }

    const chars = Object.keys(items).
      filter((key) => key.includes('character-')).
      reduce((cur, key) => {
        const item = JSON.parse(items[key])
        return [...cur, item]
      }, [])

    setTrackedCharacters(chars)
  }

  return { trackedCharacters, refresh: getTrackedCharacters }
}

export default useFetchTrackedCharacters