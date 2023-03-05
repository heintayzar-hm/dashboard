import { Routes, Route } from "react-router-dom";
import LayoutAuth from "./auth/LayoutAuth";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";

function App() {
  return (
    <main>
      <Routes>
        <Route index path="/signup" element={<LayoutAuth><SignupForm /></LayoutAuth>} />
        <Route path="/login" element={<LayoutAuth><LoginForm /></LayoutAuth>} />
      </Routes>
    </main>
  )
}

export default App
