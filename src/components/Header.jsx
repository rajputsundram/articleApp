"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../../context/Authcontext";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout(); // ✅ Call logout from AuthContext
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    return (
        <div className="py-5 px-5 flex justify-between items-center md:px-12 lg:px-28 border-b-0 shadow-lg">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-5xl font-extrabold text-orange-500 drop-shadow-md">
                    <span className="text-black">News</span>Nest
                </Link>
            </div>

            <div className="flex gap-4 my-8">
                {isAuthenticated ? (
                    <>
                        <span className="text-gray-800 font-semibold">{user?.email}</span> {/* ✅ Show user email */}
                        <button
                            onClick={handleLogout}
                            className="text-white bg-gradient-to-r from-black via-gray-900 to-gray-800 
                                      hover:bg-gradient-to-r hover:from-red-600 hover:via-red-500 hover:to-red-400 
                                      focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 
                                      shadow-lg shadow-gray-800 dark:shadow-gray-900 font-medium rounded-lg 
                                      text-sm px-5 py-2.5 text-center transition duration-300"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-white bg-gradient-to-r from-black via-gray-900 to-gray-800 
                                      hover:bg-gradient-to-r hover:from-orange-600 hover:via-orange-500 hover:to-orange-400 
                                      focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 
                                      shadow-lg shadow-gray-800 dark:shadow-gray-900 font-medium rounded-lg 
                                      text-sm px-5 py-2.5 text-center transition duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="text-white bg-gradient-to-r from-black via-gray-900 to-gray-800 
                                      hover:bg-gradient-to-r hover:from-orange-600 hover:via-orange-500 hover:to-orange-400 
                                      focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 
                                      shadow-lg shadow-gray-800 dark:shadow-gray-900 font-medium rounded-lg 
                                      text-sm px-5 py-2.5 text-center transition duration-300"
                        >
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
