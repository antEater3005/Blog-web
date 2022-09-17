import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateBlog from './components/CreateBlog';
import BlogDetails from './components/BlogDetails';

function App() {
  return (
    <BrowserRouter className='App'>
      <Navbar />
      <Routes>
        <Route path='/api' element={<Home />} />
        <Route path='/api/create' element={<CreateBlog />} />
        <Route path='/api/blogs/:id' element={<BlogDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
