import { BrowserRouter, Route, Routes } from "react-router-dom";
import Invite from "./pages/invite";
import Login from "./pages/login";
import BGArea from "./pages/BGArea";
import Gifts from "./pages/gifts";
import { Guests } from "./pages/guests";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Invite />} />
        <Route path="/login" element={<Login />} />
        <Route path="/noivos" element={<BGArea />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/guests" element={<Guests />} />
      </Routes>
    </BrowserRouter>
  );
};
