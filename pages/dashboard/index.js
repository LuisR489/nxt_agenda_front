import { useState, useEffect, useContext } from "react"
import styles from '../../styles/Dashboard.module.scss'
import Layout from '../../components/Layout' 
import * as React from 'react';
import { PROD_URL } from '../../config/index'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import Link from 'next/link'
import AuthContext from '../../context/AuthContext'
import { useRouter } from 'next/router'


export default function Dashboard({ registers }) {

  const { user } = useContext(AuthContext)
  const [calls, setCalls] = useState([]);

  const router = useRouter()

  useEffect(() => !user ? router.push('/') : null , [])

  return(
    <Layout>
      <div className={styles.dashboard} >
        
        <div className={styles.dashboard__header}>
          <h4 className={styles.dashboard__title}> Registro telefónico </h4>
          {
            calls.length !== 0 && (
              <p className={styles.dashboard__return} onClick={ () => setCalls([])} >Regresar</p>
            )
          }
        </div>
        {
          calls.length === 0 && (
            <table className={styles.dashboard__table} >
              <thead className={styles.dashboard__table_thead}>
                <tr>
                  <th>Id</th>
                  <th>Código aleatorio</th>
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
                    <td>{row.attributes.dynamicid}</td>
                    <td>{row.attributes.createdAt}</td>
                    <td>
                      <Link href={`/contacts/${row.attributes.dynamicid}`}>
                        <PermContactCalendarIcon color="primary" className={styles.dashboard__table__icon}></PermContactCalendarIcon>
                      </Link>
                    </td>
                    <td>
                      <Link href={`/messages/${row.attributes.dynamicid}`}>
                        <EmailIcon color="primary" className={styles.dashboard__table__icon}></EmailIcon>
                      </Link>
                    </td>
                    <td onClick={ () => setCalls(row.attributes.arraycalls)}>
                      <CallIcon color="primary" className={styles.dashboard__table__icon}></CallIcon>
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
                  <th>Duración</th>
                  <th>Fecha</th>
                  <th>Número</th>
                </tr>
              </thead>
              <tbody className={styles.dashboard__table_tbody} >
                {calls?.map((row, index) => (
                  <tr key={index} >
                    <td>{row.duracion} segundos</td>
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

  return {
    props: { registers }, // will be passed to the page component as props
    revalidate: 1
  }
}