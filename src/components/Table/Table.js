/** Dependencies */
import { useState } from 'react'

/** UI */
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import LinearProgress from '@mui/material/LinearProgress'
import TablePagination from '@mui/material/TablePagination'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1D2D44',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export default function CustomizedTables({ loading, rows, tracked }) {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(100)

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setPerPage(+event.target.value)
    setPage(0)
  }
  
  return (
    <>
      {!tracked && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100, 500]}
          component="div"
          count={rows?.length}
          rowsPerPage={perPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell align="right">Rating</StyledTableCell>
              <StyledTableCell align="right">Win</StyledTableCell>
              <StyledTableCell align="right">Loss</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [...new Array(perPage)].map((i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row"><LinearProgress /></StyledTableCell>
                  <StyledTableCell><LinearProgress /></StyledTableCell>
                  <StyledTableCell><LinearProgress /></StyledTableCell>
                  <StyledTableCell><LinearProgress /></StyledTableCell>
                  <StyledTableCell><LinearProgress /></StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              rows?.length === 0
                ? (
                  [...new Array(5)].map((i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row"></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </StyledTableRow>
                  ))
                )
                : (
                  rows?.slice(page * perPage, page * perPage + perPage)?.map((row) => (
                    <StyledTableRow key={row?.name}>
                      <StyledTableCell component="th" scope="row">
                        {row?.character?.name}
                      </StyledTableCell>
                      <StyledTableCell>{row?.rank}</StyledTableCell>
                      <StyledTableCell align="right">{row?.rating}</StyledTableCell>
                      <StyledTableCell align="right">{row?.season_match_statistics.won}</StyledTableCell>
                      <StyledTableCell align="right">{row?.season_match_statistics.lost}</StyledTableCell>
                    </StyledTableRow>
                  ))
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!tracked && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100, 500]}
          component="div"
          count={rows?.length}
          rowsPerPage={perPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  )
}