import styles from '../../styles/Login.module.scss'
import Layout from '../../components/Layout' 
export default function Dashboard() {

  return(
    <Layout>
      <div className={styles.dashboard} >
        <h3>Welcome to dashboardPage</h3>
        <table>

        </table>
      </div>
    </Layout>
  )
}