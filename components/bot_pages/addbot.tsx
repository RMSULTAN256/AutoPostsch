"use client";
import { X, Pencil, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  lastLogin: string;
};

const BotsAdd = () => {
    const [activeBot, setActiveBot] = useState<string | null>(null);
    const [IGusername, setIGUsername] = useState("");
    const [IGpassword, setIGPassword] = useState("");

    const handleSubmitIG = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle Instagram form submission logic here
        toast.success("Instagram bot added successfully!");
        setActiveBot(null);
    }

    const handleEdit = (id: string) => console.log("Edit user:", id);
    const handleDelete = (id: string) => console.log("Delete user:", id);

    const usersData: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", lastLogin: "2 mins ago" },
  { id: "2", name: "Bob Smith", email: "bob@test.com", role: "Editor", status: "Inactive", lastLogin: "4 days ago" },
  { id: "3", name: "Charlie Brown", email: "charlie@domain.com", role: "Viewer", status: "Active", lastLogin: "1 hour ago" },
  { id: "4", name: "Diana Prince", email: "diana@amazon.com", role: "Admin", status: "Active", lastLogin: "Yesterday" },
];

    const ListBotUser = [
        {
            id: 1,
            botName: "InstaBot",
            botType: "Instagram Story",
            status: "Active"
        }
    ]

    const botOptions = [
        {
            id: "instagram",
            name: "Instagram Story",
            icon: "/instagram-icon/insta_ico.png",
            status: "Professional",
            isAvailable: true
        },
        {
            id: "facebook",
            name: "Facebook Post",
            icon: "/instagram-icon/Facebook_Logo.png",
            status: "Professional",
            isAvailable: true
        },
        {
            id: "coming_soon_1",
            name: "Coming Soon",
            icon: "/instagram-icon/unknown.png",
            status: "???",
            isAvailable: false
        },
        {
            id: "coming_soon_2",
            name: "Coming Soon",
            icon: "/instagram-icon/unknown.png",
            status: "???",
            isAvailable: false
        }
    ];

    const renderPopupContent = () => {
        switch (activeBot) {
            case "instagram":
                return (
                    <>
                        <form className="p-6 space-y-4" id="bot-form" onSubmit={handleSubmitIG}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">IG Username</label>
                                <input type="text" className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="@username, email, or number phone" value={IGusername} onChange={(e) => setIGUsername(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">IG Password</label>
                                <input type="password" className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="password" value={IGpassword} onChange={(e) => setIGPassword(e.target.value)} />
                            </div>
                            <div className="p-5 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={() => setActiveBot(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm" type="submit" form="bot-form"
                            >
                                Save Bot
                            </button>
                        </div>
                        </form>
                    </>
                );
            case "facebook":
                return (
                    <>
                        <div className="p-6 space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg text-blue-700 text-sm">
                                Connect your Facebook Page to automate posts.
                            </div>
                            <button className="w-full bg-[#1877F2] text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">
                                Connect with Facebook
                            </button>

                            <div className="p-5 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={() => setActiveBot(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm" type="submit"
                            >
                                Save Bot
                            </button>
                        </div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <section className="relative mx-64 h-150 mt-22 p-6 pt-16 bg-white/80 border-gray-800/80 rounded-lg shadow-md shadow-black/30 justify-center items-center flex">
                <div className="h-128 flex flex-col items-center">
                    <h1 className="text-2xl text-gray-800/80 mt-10">
                        New user Automated
                    </h1>

                    <div className="w-full flex mt-10 justify-between gap-10 px-10">
                        {botOptions.map((bot) => (
                            <div
                                key={bot.id}
                                role="button"
                                onClick={() => bot.isAvailable && setActiveBot(bot.id)}
                                className={`w-40 h-40 bg-white/40 border-2 gap-2 border-gray-800/20 rounded-xl shadow-md justify-center items-center flex flex-col transition-colors group
                                    ${bot.isAvailable ? "hover:bg-gray-100 cursor-pointer" : "opacity-60 cursor-not-allowed"}`}
                            >
                                <img src={bot.icon} alt={bot.name} className="w-12 h-12 " />
                                <div className="text-gray-800/70 font-bold text-sm">{bot.name}</div>
                                <div className="h- w-full border-t items-center justify-center flex text-sm font-light text-gray-800/50 pt-4">
                                    <span>{bot.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative mx-64 h-150 mt-12 p-6 pt-16 bg-white/80 border-gray-800/80 rounded-lg shadow-md shadow-black/30 justify-center items-center flex">
                <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      
      {/* Header Section Tabel */}
      <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">User Management</h2>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
          + Add User
        </button>
      </div>

      {/* Wrapper Tabel (Overflow-x-auto biar bisa discroll kalau layar HP kecil) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          
          {/* JUDUL KOLOM */}
          <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Last Login</th>
              {/* Kolom Activity biasanya ditaruh paling kanan dengan text-right */}
              <th className="px-6 py-4 text-right">Activity</th>
            </tr>
          </thead>

          {/* ISI TABEL */}
          <tbody className="divide-y divide-gray-100">
            {usersData.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                
                {/* Kolom Name & Email */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{user.name}</span>
                    <span className="text-xs text-gray-400">{user.email}</span>
                  </div>
                </td>

                {/* Kolom Status (Badge) */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${user.status === "Active" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Kolom Role */}
                <td className="px-6 py-4">{user.role}</td>

                {/* Kolom Last Login */}
                <td className="px-6 py-4 text-gray-400">{user.lastLogin}</td>

                {/* --- KOLOM ACTIVITY (ACTIONS) --- */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Tombol View */}
                    <button 
                        title="View Details"
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                    >
                        <Eye size={18} />
                    </button>

                    {/* Tombol Edit */}
                    <button 
                        onClick={() => handleEdit(user.id)}
                        title="Edit User"
                        className="p-2 rounded-lg text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 transition"
                    >
                        <Pencil size={18} />
                    </button>

                    {/* Tombol Delete */}
                    <button 
                        onClick={() => handleDelete(user.id)}
                        title="Delete User"
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                    >
                        <Trash2 size={18} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer Pagination (Opsional) */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
        <span>Showing 4 of 24 users</span>
        <div className="flex gap-1">
            <button className="px-3 py-1 border rounded bg-white hover:bg-gray-100">Prev</button>
            <button className="px-3 py-1 border rounded bg-white hover:bg-gray-100">Next</button>
        </div>
      </div>

    </div>
            </section>

            

            {activeBot && (
                <div
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setActiveBot(null);
                    }}
                >
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        
                        <div className="flex justify-between items-center p-5 border-b border-gray-100">
                            <h3 className="font-bold text-lg text-gray-800">
                                {activeBot === "instagram" ? "Add Instagram Bot" : "Add Facebook Bot"}
                            </h3>
                            <button
                                onClick={() => setActiveBot(null)}
                                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {renderPopupContent()}

                    </div>
                </div>
            )}

            <footer>
                <div className="w-full-max h-12 mx-64 left-0 bottom-0 mt-10 text-center text-gray-600 bg-white/40 text-sm">
                    <div>
                        <span>© 2024 AutoPostSch. All rights reserved.</span>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default BotsAdd;