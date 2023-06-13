import React from 'react'
import { Routes, BrowserRouter, Route} from "react-router-dom";
import PostList from './pages/PostList';
import Post from './pages/Post';
import EditPost from "./pages/EditPost";
import "./App.css"

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App