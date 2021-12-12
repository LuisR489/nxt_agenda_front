import styles from '../../styles/Login.module.scss'
import Layout from '../../components/Layout' 
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id, idAleatorio, Imei, fechaRegistro, contacts, sms, calls) {
  return { id, idAleatorio, Imei, fechaRegistro, contacts, sms, calls };
}

const rows = [
  createData(1, 'asasd232323', 'AAAAEERR', '12/12/2021 08:00:00'),
  createData(2, 'fgfd2324', 'AAAAEERR', '12/12/2021 08:00:00'),
  createData(3, 'nuyuk3879', 'AAAAEERR', '12/12/2021 08:00:00'),
  createData(4, 'rty457356u', 'AAAAEERR', '12/12/2021 08:00:00'),
  createData(5, 'asasd232323', 'AAAAEERR', '12/12/2021 08:00:00'),
];

export default function Dashboard() {

  return(
    <Layout>
      <div className={styles.dashboard} >
        <h3>Welcome to dashboardPage</h3>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Id Aleatorio</TableCell>
              <TableCell align="right">Imei</TableCell>
              <TableCell align="right">Fecha Registro</TableCell>
              <TableCell align="right">Contactos</TableCell>
              <TableCell align="right">Mensajes</TableCell>
              <TableCell align="right">Llamadas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.idAleatorio}</TableCell>
                <TableCell align="right">{row.Imei}</TableCell>
                <TableCell align="right">{row.fechaRegistro}</TableCell>
                <TableCell align="right">{row.contacts}</TableCell>
                <TableCell align="right">{row.mensajes}</TableCell>
                <TableCell align="right">{row.calls}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </Layout>
  )
}