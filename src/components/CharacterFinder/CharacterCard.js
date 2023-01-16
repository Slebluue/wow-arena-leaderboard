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
  'shuffle-druid-balance': 'Balance Druid - Solo Shuffle',
  'shuffle-druid-feral': 'Feral Druid - Solo Shuffle',
  'shuffle-druid-guardian': 'Guardian Druid - Solo Shuffle',
  'shuffle-druid-restoration': 'Restoration Druid - Solo Shuffle',
  'shuffle-mage-arcane': 'Arcane Mage - Solo Shuffle',
  'shuffle-mage-fire': 'Fire Mage - Solo Shuffle',
  'shuffle-mage-frost': 'Frost Mage - Solo Shuffle',
  'shuffle-deathknight-blood': 'Blood Death Knight - Solo Shuffle',
  'shuffle-deathknight-frost': 'Frost Death Knight - Solo Shuffle',
  'shuffle-deathknight-unholy': 'Unholy Death Knight - Solo Shuffle',
  'shuffle-demonhunter-havoc': 'Havoc Demon Hunter - Solo Shuffle',
  'shuffle-demonhunter-vengeance': 'Vengeance Demon Hunter - Solo Shuffle',
  'shuffle-evoker-devastation': 'Devastation Evoker - Solo Shuffle',
  'shuffle-evoker-preservation': 'Preservation Evoker - Solo Shuffle',
  'shuffle-monk-mistweaver': 'Mistweaver Monk - Solo Shuffle',
  'shuffle-monk-windwalker': 'Windwalker Monk - Solo Shuffle',
  'shuffle-monk-brewmaster': 'Brewmaster Monk - Solo Shuffle',
  'shuffle-priest-discipline': 'Discipline Priest - Solo Shuffle',
  'shuffle-priest-holy': 'Holy Priest - Solo Shuffle',
  'shuffle-priest-shadow': 'Shadow Priest - Solo Shuffle',
  'shuffle-paladin-holy': 'Holy Paladin - Solo Shuffle',
  'shuffle-paladin-protection': 'Protection Paladin - Solo Shuffle',
  'shuffle-paladin-retribution': 'Retribution Paladin - Solo Shuffle',
  'shuffle-rogue-assassination': 'Assassination Rogue - Solo Shuffle',
  'shuffle-rogue-outlaw': 'Outlaw Rogue - Solo Shuffle',
  'shuffle-rogue-subtlety': 'Subtlety Rogue - Solo Shuffle',
  'shuffle-shaman-elemental': 'Elemental Shaman - Solo Shuffle',
  'shuffle-shaman-enhancement': 'Enhancement Shaman - Solo Shuffle',
  'shuffle-shaman-restoration': 'Restoration Shaman - Solo Shuffle',
  'shuffle-warrior-arms': 'Arms Warrior - Solo Shuffle',
  'shuffle-warrior-fury': 'Fury Warrior - Solo Shuffle',
  'shuffle-warrior-protection': 'Protection Warrior - Solo Shuffle',
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
          <Typography color={'#FFFFFF'}>W{character?.season_match_statistics?.won} - L{character?.season_match_statistics?.lost}</Typography>
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
