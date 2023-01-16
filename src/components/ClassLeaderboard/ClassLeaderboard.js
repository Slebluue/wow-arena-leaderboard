/** Dependencies */
import { useState, useEffect } from 'react'
import styled from 'styled-components'

/** Components */
import Dropdown from '@/components/Dropdown'
import Table from '@/components/Table'

/** Hooks */
import useFetchTrackedCharacters from '@/hooks/useFetchTrackedCharacters'

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
const TitleDivider = styled(Divider)`
  margin-bottom: 32px;
  background: #FFFFFF;
`
const TableDivider = styled(Divider)`
  margin-top: 32px;
  margin-bottom: 16px;
`

const ClassLeaderboards = ({ classes, auth }) => {
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSpec, setSelectedSpec] = useState('')
  const [specializations, setSpecializations] = useState([])
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const [trackedData, setTrackedData] = useState([])

  const { trackedCharacters } = useFetchTrackedCharacters()

  const getTrackedData = (data, characters, bracket) => {
    const tracked = characters.filter(t => t.bracket === bracket)
    const trackedData = tracked.map(t => data.find(e => e.character.name === t.name)).sort((a, b) => a.rank - b.rank)

    return trackedData
  }

  const getBracket = () => {
    const spec = specializations.find(s => s.id === selectedSpec)
    const wowClass = classes.find(c => c.id === selectedClass)
    const normalizedClass = wowClass?.name.replace(' ', '').toLowerCase()
    const normalizedSpec = spec?.name.replace(' ', '').toLowerCase()

    return `shuffle-${normalizedClass}-${normalizedSpec}`
  }

  useEffect(() => {
    async function getSpecs() {
      const res = await fetch(
        `/api/static/classes/${selectedClass}?access_token=${auth?.token}`,
        { cache: 'force-cache' }
      ).then(res => res.json())

      setTableData([])
      setSelectedSpec('')
      setSpecializations(res?.data?.specializations)
    }

    getSpecs()
  }, [selectedClass, auth])

  useEffect(() => {
    async function getSpecLeaderboard() {
      setLoading(true)
      const bracket = getBracket()

      const res = await fetch('/api/dynamic/leaderboard?' + new URLSearchParams({
        access_token: auth?.token,
        season: 34,
        bracket: bracket
      }, { next: { revalidate: 60 } })).then(res => res.json())

      const trackedData = getTrackedData(res?.data?.entries, trackedCharacters, bracket)

      setLoading(false)
      setTrackedData(trackedData)
      setTableData(res?.data?.entries || [])
    }

    if (selectedClass && selectedSpec && specializations && classes && auth) {
      getSpecLeaderboard()
    }

  }, [selectedClass, specializations, classes, selectedSpec, auth])


  useEffect(() => {
    if (trackedData.length > 0) {
      const bracket = getBracket()
      getTrackedData(trackedData, trackedCharacters, bracket)
    }
  }, [trackedCharacters, trackedData])

  return (
    <>
      <Typography variant='h2' sx={{ color: '#FFFFFF', marginTop: '32px', marginBottom: '8px' }}>Solo Shuffle Class Leaderboards</Typography>
      <TitleDivider />
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
        {trackedData?.length > 0 && (
          <>
            <Typography variant='h6' sx={{ marginBottom: '8px' }}>Tracked Leaderboard</Typography>
            <Table loading={loading} rows={trackedData} tracked />
            <TableDivider />
          </>
        )}
        {trackedData?.length > 0 && (<Typography variant='h6'>Class Leaderboard</Typography>)}
        <Table loading={loading} rows={tableData} />
      </LeaderBoardcontainer>
    </>
  )
}

export default ClassLeaderboards