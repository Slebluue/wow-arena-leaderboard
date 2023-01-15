import { useState, useEffect } from 'react'

/** UI */
import Modal from '@mui/material/Modal'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/system'
import Dropdown from '../Dropdown'

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#748CAB',
      darker: '#3E5C76',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const fullStyles = {
  width: '100%',
  marginBottom: '16px'
}

const CharacterCreate = ({ classes, auth, onSave }) => {
  const [selectedName, setSelectedName] = useState(false)
  const [selectedClass, setSelectedClass] = useState(false)
  const [selectedSpec, setSelectedSpec] = useState(false)
  const [specializations, setSpecializations] = useState([])
  const [open, setOpen] = useState(false)

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

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSaveCharacter = () => {
    const spec = specializations.find(s => s.id === selectedSpec)
    const wowClass = classes.find(c => c.id === selectedClass)
    const normalizedClass = wowClass?.name.replace(' ', '').toLowerCase()
    const normalizedSpec = spec?.name.replace(' ', '').toLowerCase()
    const bracket = `shuffle-${normalizedClass}-${normalizedSpec}`

    const normalizedName = capitalizeFirstLetter(selectedName)
    const body = { name: normalizedName, bracket: bracket }
    localStorage.setItem(`character-${normalizedName}`, JSON.stringify(body))
    setOpen(false)
    onSave()
  }
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <ThemeProvider theme={theme}>
      <Chip
        label="+ add character"
        color='primary'
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField sx={fullStyles} id="outlined-basic" label="Character name" variant="outlined" onChange={(e) => setSelectedName(e.target.value)}/>
          <Dropdown
            name='class'
            label='Class'
            selected={selectedClass}
            onSelect={setSelectedClass}
            sx={fullStyles}
          >
            {classes?.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
          </Dropdown>
          <Dropdown
            name='spec'
            label='Spec'
            selected={selectedSpec}
            onSelect={setSelectedSpec}
            disabled={!(specializations && specializations?.length > 0)}
            sx={fullStyles}
          >
            {specializations?.map((s) => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
          </Dropdown>
          <Button variant="contained" onClick={handleSaveCharacter}>Add</Button>
        </Box>
      </Modal>
    </ThemeProvider>
  )
}

export default CharacterCreate