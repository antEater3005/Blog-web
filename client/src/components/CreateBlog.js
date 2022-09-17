import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    })
      .then(() => {
        console.log(`Blog Created`);
        navigate('/');
      })
      .catch((err) => {
        console.log(`Cannot create blog`);
      });
  };
  return (
    <div className='create-blog'>
      <h2>Add a new blog:</h2>
      <form onSubmit={handleSubmit}>
        <label> Blog Title:</label>
        <input
          type='text'
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Blog content:</label>
        <textarea
          required
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
        <label>Author:</label>
        <input
          required
          type='text'
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
