
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Invite from './pages/invite';
import Test from './pages/test';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Invite />} />
        <Route path='/teste' element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}


