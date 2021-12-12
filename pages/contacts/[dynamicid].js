import Layout from '../../components/Layout' 
import styles from '../../styles/Dashboard.module.scss'
import { PROD_URL } from '../../config/index'
import Link from 'next/link'

export default function Contacts({data}) {

  return (
    <Layout>
       <div className={styles.dashboard} >
        <div className={styles.dashboard__header}>
          <h4 className={styles.dashboard__title}> Mensajes </h4>
          <div className={styles.dashboard__return}>
            <Link href={`/dashboard`}>
              Regresar
            </Link>
          </div>
        </div>
        <table className={styles.dashboard__table} >
          <thead className={styles.dashboard__table_thead}>
            <tr>
              <th>Fecha</th>
              <th>Número</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody className={styles.dashboard__table_tbody} >
            {data.attributes.arraysms.map((row, index) => (
              <tr key={index} >
                <td>{row.fecha}</td>
                <td>{row.numero}</td>
                <td>{row.mensaje}</td>
              </tr>

            ) )}

          </tbody>
        </table>
       </div>
    </Layout>
  )
}

export async function getServerSideProps({ query: { dynamicid } }) {
  const res = await fetch(`${PROD_URL}/api/messages?filters[dynamicid][$eq]=${dynamicid}`)
  const contacts = await res.json()

  return {
    props:{
      data: contacts.data[0]
    }
  }
}
