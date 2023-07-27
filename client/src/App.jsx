import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;
