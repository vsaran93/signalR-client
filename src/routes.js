import React from "react";
import { BrowserRouter as Router, Route, Routes as Switch, Navigate, Outlet } from 'react-router-dom';
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ChatWindow from "./components/chat/ChatWindow";


const isLoggedIn = () => localStorage.getItem('signalrAppKey');

const PrivateRoute = ({ children }) => {
    return isLoggedIn() ? children : <Navigate to="/" />
}

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route element={<SignIn />} path="/" />
                <Route element={<SignUp />} path="/sign-up" />
                <Route path="/chat" element={<PrivateRoute><ChatWindow /></PrivateRoute>} />
            </Switch>
        </Router>
    )
}

