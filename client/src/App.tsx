import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import LayoutAuth from "./auth/LayoutAuth";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import Layout from "./pages/Layout/Layout";
import Profile from "./pages/Profile/Profile";
import { getUser } from "./redux/auth/actions/authAction";
import { AppDispatch, RootState } from "./redux/configureStore";

function App() {
  // const user = useSelector((state: RootState) => state.rootReducer.authReducer)
  //   const dispatch = useDispatch<AppDispatch>()
  //   useEffect(() => {
  //     if (user.error == null && user.serverError==null && user.user == null && !user.loading) {
  //       dispatch(getUser())
  //     }
  //   })
  return (
    <main>
     <Routes>
      {/*    {(user.user == null) ? (
            <>
              <Route index path="/signup" element={<LayoutAuth><SignupForm /></LayoutAuth>} />
              <Route path="/login" element={<LayoutAuth><LoginForm /></LayoutAuth>} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
        ) : (
            <>
              <Route path="/profile" element={<Layout><Profile></Profile></Layout>} />
              <Route path="*" element={<h1>Home</h1>} />
            </>
        )} */}
              <Route path="/profile" element={<Layout><Profile></Profile></Layout>} />
      </Routes>
    </main>
  )
}

export default App
