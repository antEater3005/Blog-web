import React, { useEffect, useState } from 'react';
import BlogList from './BlogList';
import axios from 'axios';
export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get('/blogs')
      .then((result) => {
        console.log(result);
        setLoading(false);
        setError(false);
        setBlogs(result.data);
      })
      .catch((err) => {
        setError(true);
        console.log('There is some error', err);
      });
  }, []);

  return (
    <div className='content'>
      {error && <p>Cannot fetch data from server...</p>}
      {!error && loading && <p>Loading...</p>}
      {!error && !loading && <BlogList blogs={blogs} />}
    </div>
  );
}
