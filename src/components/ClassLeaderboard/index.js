/** Dependencies */
import { useState } from 'react'
import styled from 'styled-components'

/** UI */
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'

const Flex = styled.div`
  display: flex;
`
const LeaderBoardcontainer = styled.div`
  background: #FAFAFA;
  padding: 32px 16px;
  border-radius: 10px;
`

const ClassLeaderboards = ({ classes }) => {
  const [selectedClass, setSelectedClass] = useState(null)
  const [selectedSpec, setSelectedSpec] = useState(null)

  const selected = selectedClass && classes.find(c => c.id === selectedClass)
  return (
    <>
      <Typography variant='h2' sx={{ color: '#FFFFFF', marginTop: '32px', marginBottom: '32px' }}>Class Leaderboards</Typography>
        <LeaderBoardcontainer>
          <Flex>
            <FormControl sx={{ marginBottom: '16px', marginRight: '16px', width: '200px' }}>
              <InputLabel id="class-input">Class</InputLabel>
              <Select
                labelId="class-input"
                id="class-select"
                value={selectedClass}
                label="Class"
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map((c) => {
                  return (
                    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                  )
                })}
              
              </Select>
            </FormControl>
            {selectedClass && (
              <FormControl sx={{ width: '200px' }}>
                <InputLabel id="spec-input">Specialization</InputLabel>
                <Select
                  labelId="spec-input"
                  id="spec-select"
                  value={selectedSpec}
                  label="Specialization"
                  onChange={(e) => setSelectedSpec(e.target.value)}
                >
                  {selected.specializations?.map((s) => {
                    return (
                      <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            )}
          </Flex>
        <Divider />
      </LeaderBoardcontainer>
    </>
  )
}

export default ClassLeaderboards