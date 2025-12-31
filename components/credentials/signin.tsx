"use client";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";


const signin = () => {

    const params = useSearchParams();
    const msg = params.get("msg");
    const find = useRef(false);
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (find.current) return;
        if (msg === "login-required") {
            find.current = true;
            toast.warning("You need to log in to access that page.");

            const clean = new URL(window.location.href);
            clean.searchParams.delete("msg");
            router.replace(clean.pathname + clean.search, {scroll: false});
        }
    }, [msg, router]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            toast.warning("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        try {
            await LoginUser(email, password);
            toast.success("Logged in successfully!");
            router.refresh();
            router.replace("/dashboard");
        } catch (error) {
            toast.error("Failed to log in. Please check your credentials.", error as any);
            console.log("Login error:", error);
        } finally {
            setLoading(false);
            setEmail("");
            setPassword("");
        }
    }
    return (
        <>
            <div className="flex flex-col border-2 rounded-lg p-7 pb-10 gap-6 bg-white/5 shadow-lg shadow-black/30">
                <div className="w-80 h-80">
                    <div className="mb-2 text-center">
                        <h1 className="text-2xl font-semibold">Log In</h1>
                    </div>
                    <form onSubmit={handleSubmit} 
                        className="flex flex-col gap-4">
                        <input 
                        type="text" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={32}
                        className="input-login" 
                        />

                        <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        maxLength={32}
                        className="input-login"
                        />
                        <div className=" flex items-center -mt-3">
                            <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 selection:">
                                Remember me
                            </label>
                        </div>

                        <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-[5px] transition-colors duration-300 cursor-pointer"
                        data-loading={loading ? "true" : "false"}
                        disabled={loading}
                        aria-busy={loading}
                        >{loading ? (
                            <>
                                <Spinner/>
                            </>
                        ) : (
                            "Login"
                        )}</button>
                    </form>
                    <div className="flex items-center gap-4 text-sm text-gray-800 my-4">
                    <span className="h-px flex-1 bg-gray-500"></span>
                    <span>Or Log in with</span>
                    <span className="h-px flex-1 bg-gray-500"></span>
                </div>
                    <div className="flex flex-row gap-5">
                        <div className="btn-auth">
                            <FcGoogle size={20} />
                        </div>
                        <div className="btn-auth">
                            <FaFacebookF size={20} color="#3b5998" />
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <span className="text-sm">Don't have account yet? <a href="/sign/up" className="text-blue-600 hover:underline">Register</a></span>
                    </div>
                </div>

            </div>  
        </>
    )
}

export default signin;

type LoginResponse = {
    message?: string;
    token?: string;
};

async function LoginUser(email: string, password: string): Promise<LoginResponse> {
     const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
        const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
        });

        const ct = res.headers.get("content-type") || "";
        const isJSON = ct.includes("application/json");

        let data;
        if (isJSON) {
        data = await res.json(); 
        } else {
        data = { message: await res.text() };
        }

        if (!res.ok) {
        throw new Error(data.message || "Login failed due to server error");
        }

        return data as LoginResponse;

    } finally {
        clearTimeout(timeoutId);
    }
}

function Spinner() {
    return (
        <svg className="spinner animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
        </svg>
    );
}