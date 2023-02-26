import Login from "./auth/Login"
import { Routes, Route } from "react-router-dom";
import SignUp from "./auth/Signup";

function App() {
  return (
    <main>
      <Routes>
        <Route index path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  )
}

export default App
