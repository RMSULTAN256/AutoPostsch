import { RequireUser} from "@/lib/auth-ser";
import MainNavBar from "@/components/navbar/MainBar";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const user = await RequireUser();
    if (!user) {
        redirect('/api/logout');
    }

    return (
        <>
        <MainNavBar />
        <div className="mx-64 mt-20 p-6 bg-white/5 rounded-lg shadow-lg shadow-black/30">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to your dashboard! {user.name}</p>
        </div>
        </>
    );
}

export default DashboardPage;