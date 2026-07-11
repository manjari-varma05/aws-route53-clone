"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import "../../styles/login.css";
import api from "../../services/api";
import { AxiosError } from "axios";

function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        try {
            const response = await api.post("/auth/login", {
                username,
                password,
            });

            console.log(response.data.message);

            // Save login state
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username);
            console.log("Before navigate");

            // If you want to remember the checkbox state
            localStorage.setItem("rememberMe", rememberMe.toString());

            // Go to dashboard
            window.location.href = "/dashboard";
            console.log("After navigate");
        } catch (error) {
    const err = error as AxiosError<{ detail: string }>;

    if (err.response) {
        alert(err.response.data.detail);
    } else {
        alert("Unable to connect to server.");
    }
}
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <div className="logo">
                    <div className="logo-circle">53</div>
                </div>

                <h1 className=".login-card">AWS Route53 Clone</h1>

                <p className="subtitle">
                    DNS Management Console
                </p>

                <hr />

                <p className="signin-text">
                    Sign in to continue to your account
                </p>

                <form onSubmit={handleLogin}>

                    <label>Username</label>

                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label>Password</label>

                    <div className="password-box">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁"}
                        </button>

                    </div>

                    <div className="options">

                        <label className="remember">

                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />

                            Remember me

                        </label>

                    </div>

                    <button
                        className="login-btn"
                        type="submit"
                    >
                        Sign In
                    </button>

                </form>

                <p className="footer">
                    © 2026 Route53 Clone
                </p>

            </div>
        </div>
    );
}

export default Login;