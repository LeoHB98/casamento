
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Invite from './pages/invite';

import Gifts from './pages/gifts';
import BGArea from './pages/BGArea';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Invite />} />
        <Route path='/noivos' element={<BGArea />} />
        <Route path='/gifts' element={<Gifts />} />
      </Routes>
    </BrowserRouter>
  )
}


