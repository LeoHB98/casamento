
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Invite from './pages/invite';

import Gifts from './pages/gifts';
import BGArea from './pages/BGArea';
import { Guests } from './components/guests/guests';
import Login from './pages/login';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Invite />} />
        <Route path='/login' element={<Login />} />
        <Route path='/noivos' element={<BGArea />} />
        <Route path='/gifts' element={<Gifts />} />
        <Route path='/guests' element={<Guests />} />
      </Routes>
    </BrowserRouter>
  )
}


