import { Routes, Route } from 'react-router-dom';
import './App.css';
import Addpost from './features/posts/Addpost';
import PostLists from './features/posts/PostLists';
import SinglePostPage from './features/posts/SinglePostPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<PostLists />} />
        <Route path='post'>
          <Route index element={<Addpost />} />
          <Route path=':postId' element={<SinglePostPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
