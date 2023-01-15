/** Dependencies */
import React, { useState } from 'react'
import styled from 'styled-components'

/** Components */
import CharacterCard from './CharacterCard'

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

const CharacterFinder = ({ auth }) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <Accordion
      sx={{ background: '#F0EBD8' }}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant='h5' color='#1D2D44'>Tracked Character Rankings</Typography>
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
  )
}

export default CharacterFinder
