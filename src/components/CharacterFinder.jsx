import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const CharacterCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  margin-right: 16px;
  margin-bottom: 16px;
  min-width: 300px;
  border: 1px solid black;
`

const CharacterFinder = ({ auth, name, bracket }) => {
  const [character, setCharacter] = useState()
  const [minimumRank, setMinimumRank] = useState()

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/leaderboard?' + new URLSearchParams({
        access_token: auth?.token,
        season: 34,
        bracket: bracket
      })).then(res => res.json())

      const entries = res?.data?.entries
      const character = entries?.find((d) => d?.character?.name === name)

      setCharacter(character)
      setMinimumRank(entries?.[entries?.length - 1]?.rating)
    }

    fetchData()
  }, [auth, name, bracket])

  return (
    <CharacterCard>
      {character ? (
        <>
          <p>Name: {character?.character?.name}</p>
          <p>Bracket: {bracket}</p>
          <p>Rank: {character?.rank}</p>
          <p>Rating: {character?.rating}</p>
        </>
      ) : (
        <>
          <p>Character not found for bracket: {bracket}</p>
          <p>Minimum Ranking Needed: {minimumRank}</p>
        </>
      )}
    </CharacterCard>
  )
}

export default CharacterFinder
