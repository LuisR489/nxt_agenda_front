import Layout from '../../components/Layout' 
import styles from '../../styles/Dashboard.module.scss'
import { PROD_URL } from '../../config/index'

export default function Messages({data}) {

  return (
    <Layout>
       <div className={styles.dashboard} >
        <div className={styles.dashboard__header}>
          <h4 className={styles.dashboard__title}> Contactos </h4>
        </div>
        <table className={styles.dashboard__table} >
          <thead className={styles.dashboard__table_thead}>
            <tr>
              <th>Nombre</th>
              <th>Numero</th>
            </tr>
          </thead>
          <tbody className={styles.dashboard__table_tbody} >
            {data.attributes.arraycontacts.map((row, index) => (
              <tr key={index} >
                <td>{row.nombre}</td>
                <td>{row.numero}</td>
              </tr>

            ) )}

          </tbody>
        </table>
       </div>
    </Layout>
  )
}

export async function getServerSideProps({ query: { dynamicid } }) {
  const res = await fetch(`${PROD_URL}/api/contacts?filters[dynamicid][$eq]=${dynamicid}`)
  const contacts = await res.json()

  return {
    props:{
      data: contacts.data[0]
    }
  }
}