import React, {useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {getCandidates} from '../enteties/apiRequests'
import {Context} from '../store/Store'
import { Link } from 'react-router-dom';


const columns = [
    { id: 'avatar', label: 'Avatar', minWidth: 170,},
    { id: 'full_name', label: 'Full name', minWidth: 100 },
    { id: 'job_title', label: 'Job title', minWidth: 170 },
    { id: 'more_details', label: '', minWidth: 170 }
  ];

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

export const CandidatesList = (props) => {
  /* eslint no-unused-vars: 0 */
    const [state, dispatch] = useContext(Context)
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [cand, setCand] = useState()

    const fetchData = async ()=> {
       const candidatesList = await getCandidates()
       setCand(candidatesList)
    }

    const goToCandDeteils = (candidate)=> {
        dispatch({type:"SET_CAND_DETAILS", payload: candidate})
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(()=>{
       !cand && fetchData()
       cand && console.log(cand)
       return
    })

return (
  cand ? <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cand && cand.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.id} align={column.align}>
                    {column.id === "job_title" ? row[column.id] : null }
                    {column.id === "avatar" ? <img src={row.avatar} alt="avatar" width="50px" height="50px"/> : null }   
                    {column.id === "full_name" ? 
                    `${row.first_name} ${row.last_name}` : null}
                    {column.id === 'more_details' ? 
                    <Link 
                        onClick={()=>goToCandDeteils(row)}
                        to="/details">More about {`${row.first_name} ${row.last_name}`}
                    </Link>  : null}
                    
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={cand.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper> : null
  );
};