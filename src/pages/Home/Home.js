import styles from './Home.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
          <input type="text"
            placeholder='ou por tags..'
            nChange={(e) => setQuery(e.tar
              .value)}
          />
        <button className='btn btn-dark'>pesquisar</button>
      </form>

      <div className='post-list'>
        <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/post/create" className="btn">
              Criar primeiro post
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
