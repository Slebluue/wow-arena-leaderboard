/** UI */
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const Dropdown = ({ name, label, children, selected, onSelect, disabled, sx }) => {
  return (
    <>
      <FormControl sx={sx}>
        <InputLabel id={`${name}-input`}>{label}</InputLabel>
        <Select
          labelId={`${name}-input`}
          id={`${name}-select`}
          value={selected}
          label="Class"
          disabled={disabled}
          onChange={(e) => onSelect(e.target.value)}
        >
          {children}
        </Select>
      </FormControl>
    </>
  )
}

export default Dropdown