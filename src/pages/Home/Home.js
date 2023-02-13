import styles from './Home.module.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

//componentes
import PostDetail from '../../components/PostDetail'

const Home = () => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
 

  const { documents: posts, loading} = useFetchDocuments("posts")

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`)
    }
  }
  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
          <input type="text"
            placeholder='ou por tags..'
            onChange={(e) => setQuery(e.target.value)}
          />
        <button className='btn btn-dark'>pesquisar</button>
      </form>

     <div className="post-list">
        {loading && <p>Carregando...</p>}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/post/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  )
}

export default Home
