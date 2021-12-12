import { useState, useEffect } from "react"
import styles from '../../styles/Dashboard.module.scss'
import Layout from '../../components/Layout' 
import * as React from 'react';
import { PROD_URL } from '../../config/index'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

export default function Dashboard({ registers }) {

  const [calls, setCalls] = useState(['']);

  useEffect( ()=> console.log(registers))

  return(
    <Layout>
      <div className={styles.dashboard} >
        <h3 className={styles.dashboard__title} >Registro telefonico</h3>
        <table className={styles.dashboard__table} >
          <thead className={styles.dashboard__table_thead}>
            <tr>
              <th>Id Aleatorio</th>
              <th>Imei</th>
              <th>Fecha Registro</th>
              <th>Contactos</th>
              <th>Mensajes</th>
              <th>Llamadas</th>
            </tr>
          </thead>
          <tbody className={styles.dashboard__table_tbody} >
            {registers.data.map((row, index) => (
              <tr key={index} >
                <td>{row.id}</td>
                <td>{row.attributes.imei}</td>
                <td>{row.attributes.createdAt}</td>
                <td>
                  <PermContactCalendarIcon></PermContactCalendarIcon>
                </td>
                <td>
                  <EmailIcon></EmailIcon>
                </td>
                <td onClick={ () => setCalls(row.attributes.arraycalls)} >
                  <CallIcon></CallIcon>
                </td>
              </tr>

            ) )}

          </tbody>
        </table>


        <table className={styles.dashboard__table}>
          <thead className={styles.dashboard__table_thead}>
            <tr>
              <th>Duracion</th>
              <th>fecha</th>
              <th>numero</th>
            </tr>
          </thead>
          <tbody>
            {calls?.map((row, index) => (
              <tr key={index} >
                <td>{row.duracion}</td>
                <td>{row.fecha}</td>
                <td>{row.numero}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Id Aleatorio</TableCell>
              <TableCell align="right">Imei</TableCell>
              <TableCell align="right">Fecha Registro</TableCell>
              <TableCell align="center">Contactos</TableCell>
              <TableCell align="center">Mensajes</TableCell>
              <TableCell align="center">Llamadas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registers.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.dynamicid}</TableCell>
                <TableCell align="right">{row.imei}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="center">
                  <PermContactCalendarIcon></PermContactCalendarIcon>
                </TableCell>
                <TableCell align="center">
                  <MailOutlineIcon></MailOutlineIcon>
                </TableCell>
                <TableCell align="center">
                  <CallIcon></CallIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer> */}
      </div>
    </Layout>
  )
}



export async function getStaticProps() {
  const res = await fetch(`${PROD_URL}/api/registers`)
  const registers = await res.json()
  debugger
  return {
    props: { registers }, // will be passed to the page component as props
    revalidate: 1
  }
}