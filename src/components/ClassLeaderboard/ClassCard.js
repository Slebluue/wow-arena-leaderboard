/** UI */
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ClassCard = ({ data }) => {
  return (
    <Box sx={{ border: '1px solid #1D2D44', borderRadius: '10px', background: '#FFFFFF', margin: '8px', padding: '8px', width: '275px', height: '75px' }}>
      <Typography><strong>{data?.name}</strong></Typography>
      <ul>
        {data?.specializations?.map((s) => (
          <li key={s.id}>
            {s?.name} - {s?.id}
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default ClassCard
