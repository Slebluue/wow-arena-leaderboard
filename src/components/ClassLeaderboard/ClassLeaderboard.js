/** Dependencies */
import { useState, useEffect } from 'react'
import styled from 'styled-components'

/** Components */
import Dropdown from '@/components/Dropdown'
import Table from '@/components/Table'

/** UI */
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'

const Flex = styled.div`
  display: flex;
`
const LeaderBoardcontainer = styled.div`
  background: #FAFAFA;
  padding: 32px 16px;
  border-radius: 10px;
`
const SpacedDivider = styled(Divider)`
  margin-bottom: 16px;
`

const ClassLeaderboards = ({ classes, auth }) => {
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSpec, setSelectedSpec] = useState('')
  const [specializations, setSpecializations] = useState([])
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    async function getSpecs() {
      const res = await fetch(
        `/api/static/classes/${selectedClass}?access_token=${auth?.token}`,
        { cache: 'force-cache' }
      ).then(res => res.json())

      setSelectedSpec('')
      setSpecializations(res?.data?.specializations)
    }

    getSpecs()
  }, [selectedClass, auth])

  useEffect(() => {
    async function getSpecLeaderboard() {
      setLoading(true)
      const spec = specializations.find(s => s.id === selectedSpec)
      const wowClass = classes.find(c => c.id === selectedClass)
      const bracket = `shuffle-${wowClass?.name.toLowerCase()}-${spec?.name.toLowerCase()}`

      const res = await fetch('/api/dynamic/leaderboard?' + new URLSearchParams({
        access_token: auth?.token,
        season: 34,
        bracket: bracket
      }, { next: { revalidate: 60 } })).then(res => res.json())

      setLoading(false)
      setTableData(res?.data?.entries)
    }

    if (selectedClass && specializations && classes && selectedSpec && auth) {
      getSpecLeaderboard()
    }

  }, [selectedClass, specializations, classes, selectedSpec, auth])

  return (
    <>
      <Typography variant='h2' sx={{ color: '#FFFFFF', marginTop: '32px', marginBottom: '32px' }}>Solo Shuffle Class Leaderboards</Typography>
        <LeaderBoardcontainer>
          <Flex>
            <Dropdown
              name='class'
              label='Class'
              selected={selectedClass}
              onSelect={setSelectedClass}
              sx={{ marginBottom: '16px', marginRight: '16px', width: '200px' }}
            >
              {classes?.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </Dropdown>
            {specializations && specializations?.length > 0 && (
              <Dropdown
                name='spec'
                label='Spec'
                selected={selectedSpec}
                onSelect={setSelectedSpec}
                sx={{ width: '200px' }}
              >
                {specializations?.map((s) => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
              </Dropdown>
            )}
          </Flex>
        <SpacedDivider />
        <Table loading={loading} rows={tableData} />
      </LeaderBoardcontainer>
    </>
  )
}

export default ClassLeaderboards