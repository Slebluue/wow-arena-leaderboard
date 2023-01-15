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
  'shuffle-hunter-beastmastery': 'Beast Mastery Hunter - Solo Shuffle',
  'shuffle-hunter-marksmanship': 'Marksmanship Hunter - Solo Shuffle',
  'shuffle-hunter-survival': 'Survival Hunter - Solo Shuffle',
  'shuffle-warlock-affliction': 'Affliction Warlock - Solo Shuffle',
  'shuffle-warlock-demonology': 'Demonology Warlock - Solo Shuffle',
  'shuffle-warlock-destruction': 'Destruction Warlock - Solo Shuffle',
  'shuffle-druid-balance': 'Balance Druid',
  'shuffle-druid-feral': 'Feral Druid',
  'shuffle-druid-guardian': 'Guardian Druid',
  'shuffle-druid-restoration': 'Restoration Druid',
  'shuffle-mage-arcane': 'Arcane Mage',
  'shuffle-mage-fire': 'Fire Mage',
  'shuffle-mage-frost': 'Frost Mage',
  'shuffle-deathknight-blood': 'Blood Death Knight',
  'shuffle-deathknight-frost': 'Frost Death Knight',
  'shuffle-deathknight-unholy': 'Unholy Death Knight',
  'shuffle-demonhunter-havoc': 'Havoc Demon Hunter',
  'shuffle-demonhunter-vengeance': 'Vengeance Demon Hunter',
  'shuffle-evoker-devastation': 'Devastation Evoker',
  'shuffle-evoker-preservation': 'Preservation Evoker',
  'shuffle-monk-mistweaver': 'Mistweaver Monk - Solo Shuffle',
  'shuffle-monk-windwalker': 'Windwalker Monk - Solo Shuffle',
  'shuffle-monk-brewmaster': 'Brewmaster Monk - Solo Shuffle',
  'shuffle-priest-discipline': 'Discipline Priest',
  'shuffle-priest-holy': 'Holy Priest',
  'shuffle-priest-shadow': 'Shadow Priest',
  'shuffle-paladin-holy': 'Holy Paladin',
  'shuffle-paladin-protection': 'Protection Paladin',
  'shuffle-paladin-retribution': 'Retribution Paladin',
  'shuffle-rogue-assassination': 'Assassination Rogue',
  'shuffle-rogue-outlaw': 'Outlaw Rogue',
  'shuffle-rogue-subtlety': 'Subtlety Rogue',
  'shuffle-shaman-elemental': 'Elemental Shaman',
  'shuffle-shaman-enhancement': 'Enhancement Shaman',
  'shuffle-shaman-restoration': 'Restoration Shaman',
  'shuffle-warrior-arms': 'Arms Warrior',
  'shuffle-warrior-fury': 'Fury Warrior',
  'shuffle-warrior-protection': 'Protection Warrior',
}

const Card = styled(Box)`
  @media only screen and (max-width: 1000px) {
    width: 100% !important;
  }
`
const DeleteIcon = styled(Typography)`
  color: #FFFFFF;
  position: absolute;
  right: 16px;

  &:hover {
    cursor: pointer;
  }
`

const CharacterFinder = ({ auth, name, bracket, onDelete }) => {
  const { data, loading } = useFetchCharacterRank(auth, name, bracket)
  const { character, minimumRank } = data

  return (
    <Card sx={{ border: '1px solid #0D1321', background: '#748CAB', borderRadius: '10px', margin: '8px', padding: '8px', width: '275px', position: 'relative' }}>
      {!loading && onDelete && (<DeleteIcon onClick={() => onDelete(name)}>X</DeleteIcon>)}
      {loading ? (
          <LinearProgress />
      ) : character ? (
        <>
          <Typography color={'#FFFFFF'}><strong>{character?.character?.name}</strong></Typography>
          <Typography color={'#FFFFFF'}><strong>#{character?.rank}</strong> - {character?.rating}</Typography>
          <Typography color={'#FFFFFF'}>{SHUFFLE_KEY_MAP[bracket]}</Typography>
        </>
      ) : (
        <>
          <Typography color={'#FFFFFF'}>Character not found: {character?.character?.name || name}</Typography>
          <Typography color={'#FFFFFF'}>Bracket: {SHUFFLE_KEY_MAP[bracket]}</Typography>
          <Typography color={'#FFFFFF'}>Minimum Ranking Needed: {minimumRank}</Typography>
        </>
      )}
    </Card>
  )
}

export default CharacterFinder
