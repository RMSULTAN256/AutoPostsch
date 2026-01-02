"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { TbReportAnalytics } from "react-icons/tb";
import { FaBars } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { AiOutlineScan } from "react-icons/ai";

type UserData = {
  Name: string;
} | null;

type NavItemProps = {
  icon?: React.ReactNode;
  text: string;
  href: string; 
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

function NavItem({ icon, text, href, active, className, onClick }: NavItemProps) {
  const base = clsx(
    "group flex items-center gap-3 px-3 py-3 rounded-lg transition-all text-sm text-gray-800 font-medium w-full",
    active
      ? "bg-gray-800 text-gray-800 shadow-md shadow-black/10" 
      : "text-neutral-400 hover:bg-gray-800/50 hover:text-white", 
    className
  );

  return (
    <Link href={href} className={base} onClick={onClick}>
      {icon && <span className="text-xl shrink-0">{icon}</span>}
      <span className="truncate">{text}</span>
    </Link>
  );
}

const Navbar = ({ user }: { user: UserData }) => {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => pathname === path;

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full top-16">
      <div className="space-y-6 flex-1">

        <nav className="flex flex-col gap-1 space-y-1">
          <NavItem
            icon={<AiOutlineScan />}
            text="Publish"
            href="/scan"
            active={isActive("/scan")}
            onClick={() => isMobile && setMobileMenuOpen(false)}
          />
          
          <NavItem
            icon={<TbReportAnalytics />}
            text="Automate"
            href="/scan/report"
            active={pathname?.startsWith("/scan/report")}
            onClick={() => isMobile && setMobileMenuOpen(false)}
          />
        </nav>
      </div>
      <div className="mt-auto pb-2">
         <NavItem
            icon={<IoIosSettings />}
            text="Settings"
            href="/settings"
            active={pathname?.startsWith("/settings")}
            onClick={() => isMobile && setMobileMenuOpen(false)}
          />
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex fixed top-16 left-0 z-40 h-screen w-60 flex-col bg-white/20 border-r border-white/5 shadow-2xl    px-4 py-4">
         <SidebarContent />
      </aside>

      <div className="lg:hidden fixed top-0 left-0 z-40 w-full h-16 bg-gray-900 border-b border-white/5 flex items-center justify-between px-4 shadow-md">
         <span className="font-bold text-xl text-white flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-sm">P</div>
            PostSch
         </span>
         <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md text-neutral-400 hover:bg-white/10 hover:text-white transition"
         >
            <FaBars className="size-6" />
         </button>
      </div>

      <div
        className={clsx(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 p-4 shadow-2xl ring-1 ring-white/5 transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Tombol Close di Mobile */}
        <div className="flex justify-end mb-2">
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-neutral-400 hover:text-white transition">
               <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>
        </div>
        
        <SidebarContent isMobile={true} />
      </div>
    </>
  );
}

export default Navbar;