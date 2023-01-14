/** Dependencies */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

/** Hooks */
import useFetchCharacterRank from '../hooks/useFetchCharacterRank'

/** Styled Components */
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
  const { data, loading } = useFetchCharacterRank(auth, name, bracket)
  const { character, minimumRank } = data

  return (
    <CharacterCard>
      {loading
        ? (<p>...loading</p>)
        : character ? (
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
