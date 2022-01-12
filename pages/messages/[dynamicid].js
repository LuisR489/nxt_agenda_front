import { useContext, useEffect, useState } from "react"
import Layout from '../../components/Layout' 
import styles from '../../styles/Dashboard.module.scss'
import { PROD_URL } from '../../config/index'
import Link from 'next/link'
import AuthContext from '../../context/AuthContext'
import { useRouter } from 'next/router'

export default function Contacts({data}) {

  const { user } = useContext(AuthContext)
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState(null)
  const router = useRouter()

  useEffect(() => !user ? router.push('/') : null , [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const dataSearch =  data.attributes.arraysms.filter((item) => (
      item.mensaje.includes(search)
    ))
    setSearchData(dataSearch)
    setSearch('')
  }

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
        <form className={styles.dashboard__search} onSubmit={handleSubmit}>
          <input 
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type='text' 
            placeholder="Buscar" />
          {
            searchData && <button className={styles.dashboard__button_search} onClick={() => setSearchData(null)} >Limpiar</button>
          }
        </form>
        <table className={styles.dashboard__table} >
          <thead className={styles.dashboard__table_thead}>
            <tr>
              <th>Fecha</th>
              <th>Número</th>
              <th>Tipo</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          {
            searchData ? 
            <>
               <tbody className={styles.dashboard__table_tbody} >
                {searchData.map((row, index) => (
                  <tr key={index} >
                    <td>{row.fecha}</td>
                    <td>{row.numero}</td>
                    <td>{row.type}</td>
                    <td>{row.mensaje}</td>
                  </tr>

                ) )}
              </tbody>
            
            </> :
            <>
              <tbody className={styles.dashboard__table_tbody} >
                {data.attributes.arraysms.map((row, index) => (
                  <tr key={index} >
                    <td>{row.fecha}</td>
                    <td>{row.numero}</td>
                    <td>{row.type}</td>
                    <td>{row.mensaje}</td>
                  </tr>

                ) )}

              </tbody>
            </>
          }
          
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
