"use client"
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {toast} from "sonner";
import sleep from "@/lib/sleep";

const Signup = () => {

    const API = "http://127.0.0.1:5566/api/auth/register";
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    type SignupData = {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        if (!firstName || !lastName || !Email || !password) {
            toast.warning("Please fill in all fields.");
            setLoading(false);
            return;
        };

        if (confirmPassword !== password) {
            toast.warning("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const payloadSignup: SignupData = {
                name: `${firstName} ${lastName}`,
                email: Email,
                password: password,
                password_confirmation: confirmPassword,
            };
            console.log(API)
                await axios.post(`${API}`, payloadSignup);           
                toast.success("Signup successful! Please log in.");
                await sleep(1500);
                router.push("/sign/in");
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            console.error("Signup error:", error);
        } finally {
            setLoading(false);
        
        }

    }
    return (
        <>
            <div className="flex flex-col border-2 rounded-lg p-7 pb-10 gap-6 pt-5 bg-white/5 shadow-lg shadow-black/30">
                <div className="w-80 h-80">
                    <div className="mb-4 text-center">
                        <h1 className="text-2xl font-semibold">Sign Up</h1>
                    </div>
                    <form className="flex flex-col gap-2" onSubmit={handleSignup}>
                        <div className="flex gap-2">
                            <input 
                            type="text" 
                            placeholder="First Name" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="input-login" 
                            />
                            <input 
                            type="text" 
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="input-login"
                            />
                        </div>
                        <input 
                        type="text" 
                        placeholder="Username or Email" 
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-login" 
                        />

                        <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-login"
                        />

                        <input 
                        type="password" 
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-login"
                        />
                      
                        <button
                        type="submit"
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-[5px] transition-colors duration-300"
                        >{loading ? (
                            <>
                                <Spinner />
                            </>
                        ) : (
                            "Register"
                        )}</button>
                    </form>
                    <div className="mt-8 text-center">
                        <span className="text-sm">Already have account? <a href="/sign/in" className="text-blue-600 hover:underline">Sign In</a></span>
                    </div>
                </div>

            </div>  
        </>
    )
}

function Spinner() {
    return (
        <svg className="spinner animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
        </svg>
    );
}


export default Signup;