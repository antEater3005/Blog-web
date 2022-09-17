import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function BlogDetails() {
  const [blog, setBlog] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios(`/blogs/${id}`)
      .then((result) => {
        setBlog(result.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [id]);
  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete('/blogs/' + id).then((result) => {
      console.log(`Blog deleted`);
      navigate('/');
    }).catch(err=>{
      console.log(`There is some error${err}`)
    })
  };
  return (
    <div>
      {error && <p>Cannot fetch details.</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <div className='blog-details'>
          <h1>{blog.title}</h1>
          <p>
            Author: <b>{blog.author}</b>{' '}
          </p>
          <p>
            {formatDistanceToNow(new Date(blog.createdAt), {
              addSuffix: true,
            })}
          </p>
          <article>{blog.body}</article>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
