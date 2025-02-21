"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "../../../context/Authcontext"; // ✅ Import Auth Context

function Login() {
    const router = useRouter();
    const { checkAuth } = useAuth(); // ✅ Get checkAuth function
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    // ✅ Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // ✅ Handle Form Submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // ✅ Prevent default form behavior

        try {
            const formData = new FormData(); // ✅ Create FormData object
            formData.append("email", credentials.email);
            formData.append("password", credentials.password);

            const response = await axios.post("/api/login", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // ✅ Use FormData format
                },
            });

            if (response.data.success) {
                setCredentials({ email: "", password: "" }); // ✅ Clear form
                toast.success(response.data.msg); // ✅ Show success message

                await checkAuth(); // ✅ Update authentication state

                setTimeout(() => {
                    router.push("/"); // ✅ Redirect to home
                }, 100);
            } else {
                toast.error(response.data.msg || "Error occurred during login");
            }
        } 
        catch (error: unknown) { // ✅ Use "unknown" instead of "any"
            console.error("Signup Error:", error);
        
            if (axios.isAxiosError(error)) {  // ✅ Check if it's an Axios error
                toast.error(error.response?.data?.error || "Something went wrong. Please try again.");
            } else {
                toast.error("Network error. Please check your connection.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-[75vh]">
            <div className="container w-full max-w-md">
                <form onSubmit={handleSubmit} className="text-gray-200 bg-gray-900 rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            name="password"
                            type="password"
                            required
                            placeholder="******"
                            value={credentials.password}
                            className="shadow border-gray-300 rounded w-full py-2 px-3 text-gray-900"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button type="submit" className="border font-bold border-gray-200 rounded p-2 hover:bg-orange-500">
                            Log in
                        </button>
                        <Link href="/signup">
                            <button type="button" className="border font-bold border-gray-200 rounded p-2 hover:bg-orange-500">
                                New User?
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
