/** Dependencies */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

/** Components */
import CharacterCard from './CharacterCard'
import CharacterCreate from './CharacterCreate'

/** UI */
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const CharacterFinder = ({ auth, classes }) => {
  const [expanded, setExpanded] = useState('owner')
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

  const handleDeleteCard = (name) => {
    localStorage.removeItem(`character-${name}`)
    getTrackedCharacters()
  }

  return (
    <>
      <Accordion
        sx={{ background: '#FAFAFA' }}
        expanded={expanded === 'owner'}
        onChange={() => expanded === 'owner' ?  setExpanded(null) : setExpanded('owner')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Typography variant='h5' color='#1D2D44'>Bluue's tracked characters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Flex>
            <CharacterCard
              auth={auth}
              name="Bluuemy"
              bracket="shuffle-monk-mistweaver"
            />
            <CharacterCard
              auth={auth}
              name="Bluuee"
              bracket="shuffle-evoker-preservation"
            />
            <CharacterCard
              auth={auth}
              name="Dankboipucci"
              bracket="shuffle-warrior-arms"
            />
            <CharacterCard
              auth={auth}
              name="Blessdatbutt"
              bracket="shuffle-paladin-retribution"
            />
            <CharacterCard
              auth={auth}
              name="Blessdatbutt"
              bracket="shuffle-paladin-holy"
            />
          </Flex>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ background: '#FAFAFA' }}
        expanded={expanded === 'personal'}
        onChange={() => expanded === 'personal' ?  setExpanded(null) : setExpanded('personal')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h5' color='#1D2D44' sx={{ marginRight: '32px' }}>Personal Character Rankings</Typography>
          <CharacterCreate classes={classes} auth={auth} onSave={getTrackedCharacters} />
        </AccordionSummary>
        <AccordionDetails>
          <Flex style={{ alignItems: 'center' }}>
            {trackedCharacters?.length === 0 && <Typography>Add a character to see solo shuffle rank</Typography>}
            {trackedCharacters.map(c => (
              <CharacterCard
                key={`${c.name}-${c.bracket}`}
                auth={auth}
                name={c.name}
                bracket={c.bracket}
                onDelete={handleDeleteCard}
              />
            ))}
          </Flex>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default CharacterFinder
