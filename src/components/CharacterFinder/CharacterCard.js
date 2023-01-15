/** Dependencies */
import React from 'react'
import styled from 'styled-components'

/** Hooks */
import useFetchCharacterRank from '@/hooks/useFetchCharacterRank'

/** UI */
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

/** Constants */
const SHUFFLE_KEY_MAP = {
  'shuffle-monk-mistweaver': 'Mistweaver Monk - Solo Shuffle',
  'shuffle-evoker-preservation': 'Preservation Evoker - Solo Shuffle',
  'shuffle-warrior-arms': 'Arms Warrior - Solo Shuffle',
  'shuffle-paladin-retribution': 'Retribution Paladin - Solo Shuffle',
  'shuffle-paladin-holy': 'Holy Paladin - Solo Shuffle'
}

const Card = styled(Box)`
  @media only screen and (max-width: 1000px) {
    width: 100% !important;
  }
`

const CharacterFinder = ({ auth, name, bracket }) => {
  const { data, loading } = useFetchCharacterRank(auth, name, bracket)
  const { character, minimumRank } = data

  return (
    <Card sx={{ border: '1px solid #0D1321', borderRadius: '10px', background: '#FAFAFA', margin: '8px', padding: '8px', width: '275px' }}>
      {loading ? (
          <LinearProgress />
      ) : character ? (
        <>
          <Typography><strong>{character?.character?.name}</strong></Typography>
          <Typography><strong>#{character?.rank}</strong> - {character?.rating}</Typography>
          <Typography>{SHUFFLE_KEY_MAP[bracket]}</Typography>
        </>
      ) : (
        <>
          <Typography>Character not found for bracket: {SHUFFLE_KEY_MAP[bracket]}</Typography>
          <Typography>Minimum Ranking Needed: {minimumRank}</Typography>
        </>
      )}
    </Card>
  )
}

export default CharacterFinder
