import { useContext, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Login.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext'; 

export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useContext(AuthContext)

  const handleSubmit = e => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,700;1,400&display=swap" rel="stylesheet"></link>
      </Head>
      <ToastContainer />
      <div className={styles.home} >
        <img className={styles.home__img_wave} src='/images/wave.png' />
        <img className={styles.home__img_person} src='/images/bg.svg' />
        <form  className={styles.home__form} onSubmit={handleSubmit} >
          <figure className={styles.home__figure} >
            <img className={styles.home__img_avatar} src='/images/avatar.svg' />
          </figure>
          <h3 className={styles.home__title} >Welcome</h3>
          <div className={styles.home__input}>
            <label>Nombre de Usuario</label>
            <input
                placeholder='Correo'
                type='email' 
                id='email' 
                value={email} 
                onChange= { e => setEmail(e.target.value) } />
          </div>
          <div className={styles.home__input}>
            <label>Contraseña</label>
            <input
              placeholder='Contraseña'
              type='password' 
              id='password' 
              value={password} 
              onChange= { e => setPassword(e.target.value) } />
          </div>
          <div className={styles.home__btncontainer} >
            <input 
              className={styles.home__button}
              type='submit' 
              value='Ingresar' />
          </div>
        </form>
      </div>

    </div>
  )
}
