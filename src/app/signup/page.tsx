"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/Authcontext"; // ✅ Import the AuthContext

const Signup: React.FC = () => {
    const router = useRouter();
    const { setIsAuthenticated } = useAuth(); // ✅ Get authentication setter from context

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
    });

    // ✅ Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // ✅ Validate email format
    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    // ✅ Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ✅ Check for empty fields
        if (!credentials.name || !credentials.email || !credentials.password) {
            toast.error("All fields are required!");
            return;
        }

        // ✅ Validate email format
        if (!isValidEmail(credentials.email)) {
            toast.error("Invalid email format!");
            return;
        }

        try {
            const response = await axios.post("/api/signup", credentials);

            if (response.data.success) {
                toast.success("Signup successful! Redirecting...");

                // ✅ Update authentication state
                setIsAuthenticated(true);

                setCredentials({ name: "", email: "", password: "" });

                // ✅ Redirect and refresh the page to update navbar
                setTimeout(() => {
                    router.push("/");
                    router.refresh(); // ✅ Ensures the navbar updates
                }, 1000);
            } else {
                toast.error(response.data.msg || "Signup failed. Try again.");
            }
        } catch (error: any) {
            console.error("Signup Error:", error);

            // ✅ Improved error handling
            if (error.response) {
                toast.error(error.response.data.error || "Something went wrong. Please try again.");
            } else {
                toast.error("Network error. Please check your connection.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="container w-full max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="bg-black text-gray-200 rounded-lg shadow-2xl px-8 pt-6 pb-8"
                >
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-bold mb-2">
                            Name
                        </label>
                        <input
                            onChange={handleChange}
                            required
                            name="name"
                            placeholder="Enter your name"
                            type="text"
                            value={credentials.name}
                            className="shadow border-gray-300 rounded w-full py-2 px-3 text-gray-900"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-bold mb-2">
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            required
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            value={credentials.email}
                            className="shadow border-gray-300 rounded w-full py-2 px-3 text-gray-900"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-bold mb-2">
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            required
                            name="password"
                            type="password"
                            placeholder="******"
                            value={credentials.password}
                            className="shadow border-gray-300 rounded w-full py-2 px-3 text-gray-900"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="border font-bold border-gray-400 rounded p-2 hover:bg-orange-500 text-white"
                        >
                            Sign Up
                        </button>
                        <Link href="/login">
                            <button
                                type="button"
                                className="border font-bold border-gray-400 rounded p-2 hover:bg-orange-500 text-white"
                            >
                                Already a user?
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
