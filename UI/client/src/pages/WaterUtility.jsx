import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import {useNavigate} from 'react-router-dom'
import { assetUrl } from "../endpoints";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { urlWaterUtility } from '../endpoints';
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#183763",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function WaterUtilitys() {
    const { t } = useTranslation()

    
    const navigate = useNavigate()
    const getImage = (item) => {
        return `${assetUrl}/${item}`;
      };
    
      const navigateWaterUtilityDetial =(item, itemlist)=>{

        navigate('/waterutility/detail',{
          state :{
            waterUtility: item,
           waterUtilityList: itemlist
          }
        }
        )
        
          }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const columns = [


        { id: 'name', label: 'Name', minWidth: 190 },
        { id: 'email', label: 'Email', minWidth: 100 },
        {
            id: 'phone',
            label: 'Phone',
            minWidth: 100,
            align: 'right',

        },
        {
            id: 'kmfromaa',
            label: 'KM from AA',
            minWidth: 100,
            align: 'right',

        },
        {
            id: 'establisheddate',
            label: 'Established Date',
            minWidth: 170,
            align: 'right',

        },

        {
            id: 'regionalWaterFederation',
            label: 'Regional Association',
            minWidth: 180,
            align: 'right',

        },

        {
            id: 'noemployees',
            label: 'No of Employees',
            minWidth: 100,
            align: 'right',

        },

        {
            id: 'action',
            label: '',
            minWidth: 100,
            align: 'right',

        },



    ];








    const [waterUtility, setWaterUtility] = useState([])
    useEffect(() => {
        axios.get(urlWaterUtility).then((res) => {
            console.log(res.data);
            setWaterUtility(res.data)

        })
        .catch((err) => console.error(err));

    }, [])

        



    return (
        <>
            <section
                className="page-header"
                style={{ backgroundImage: "url(/assets/images/backgrounds/1.jpeg)" }}
            >
                <div className="container">
                    <ul className="list-unstyled breadcrumb-one">
                        <li>
                            <a href="index.html">{t("home.1")}</a>
                        </li>
                        <li>
                            <span>{t("memberutilites.1")}</span>
                        </li>
                    </ul>

                    <h2 className="page-header__title">{t("memberutilites.1")}</h2>
                </div>
            </section>
            <div className="m-2 py-5" style={{ paddingLeft: "50px", paddingRight: "50px" }} >


                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <StyledTableRow>
                                    {columns.map((column) => (
                                        <StyledTableCell
                                            key={column.id}
                                            
                                            style={{ minWidth: column.minWidth }}
                                            
                                        >
                                            {column.label}
                                        </StyledTableCell>
                                    ))}
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {waterUtility
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = column.id == "regionalWaterFederation" ? row[column.id].name : row[column.id];


                                                    return (
                                                        <StyledTableCell  key={column.id}>
                                                           
                                                           {column.id==='name'&& <img style={{borderRadius:'50%',height:'50px', marginRight:"5px"}} src={getImage(row['logo'])} alt=' '/>}
                                                            {column.id != "action" ? value : <Button variant="outlined" onClick={()=>navigateWaterUtilityDetial(row,waterUtility)}>Details</Button>}



                                                        </StyledTableCell>
                                                    );
                                                })}
                                            </StyledTableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={waterUtility.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>

        </>
    );
}

