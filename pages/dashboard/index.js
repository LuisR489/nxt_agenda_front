import { useState, useEffect } from "react"
import styles from '../../styles/Dashboard.module.scss'
import Layout from '../../components/Layout' 
import * as React from 'react';
import { PROD_URL } from '../../config/index'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

export default function Dashboard({ registers }) {

  const [calls, setCalls] = useState([]);

  useEffect( ()=> console.log(calls.length))

  return(
    <Layout>
      <div className={styles.dashboard} >
        
        <div className={styles.dashboard__header}>
          <h4 className={styles.dashboard__title}> Registro telefonico </h4>
          <p className={styles.dashboard__return} onClick={ () => setCalls([])} >Regresar</p>
        </div>
        {
          calls.length === 0 && (
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
          )
        }
       
        { calls.length !== 0 && (
            <table className={styles.dashboard__table}>
              <thead className={styles.dashboard__table_thead}>
                <tr>
                  <th>Duracion</th>
                  <th>Fecha</th>
                  <th>Numero</th>
                </tr>
              </thead>
              <tbody className={styles.dashboard__table_tbody} >
                {calls?.map((row, index) => (
                  <tr key={index} >
                    <td>{row.duracion}</td>
                    <td>{row.fecha}</td>
                    <td>{row.numero}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) 

        }
       
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