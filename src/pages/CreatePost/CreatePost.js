import styles from './CreatePost.module.css'
import { useState } from 'react'
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");

  const { user } = useAuthValue();
  const navigate = useNavigate();
  const {insertDocument, response} = useInsertDocument("posts")

  const handleSubmit = (e) => {
    e.preventDefault();


    // validate image
    try {
      new URL(image);
    } catch (error) {
      setError("A imagem precisa ser uma URL.");
    };

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check values
    if (!title || !image || !tags || !body) {
      setError("Por favor, preencha todos os campos!");
    };

     if(error) return

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate("/");

  }
  return (
    <div className={styles.create_post}>
        <h1>Criar post</h1>
        <p>Escreva sobre o que quiser e compartilhe seu conhecimento</p>
        <form onSubmit={handleSubmit}>
          <label>
              <span>Titulo:</span>
              <input 
                type="text" 
                placeholder='Insira um titulo criativo para o seu post.'
                required
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
          </label>

          <label>
              <span>Imagem:</span>
              <input 
                type="text" 
                placeholder='Insira a imagem do post.'
                required
                name='image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
          </label>

          <label>
              <span>Conteudo:</span>
              <textarea
                placeholder='Escreva aqui sobre o seu post.'
                required
                name='body'
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
          </label>

           <label>
              <span>Titulo:</span>
              <input 
                type="text" 
                placeholder='Insira as tags separadas por virgula.'
                required
                name='tags'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
          </label>
          {!response.loading && <button className="btn">Postar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
        {(response.error || error) && (
          <p className="error">{response.error || error}</p>
        )}
        </form>
    </div>
  )
}

export default CreatePost