"use client";

import Link from "next/link";
import { useRouter, usePathname, redirect } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";

import { FaUser } from "react-icons/fa";
import { MdSchedule, MdPublish, MdAutoMode } from "react-icons/md";
import { FaTableList, FaBars } from "react-icons/fa6";
import { IoIosSettings, IoIosLogOut } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";

type NavItemProps = {
  icon?: React.ReactNode;
  text: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
};

type UserData = {
  Name: string;
} | null;


function NavItem({ icon, text, href, onClick, active, className }: NavItemProps) {
  const base = clsx(
    "flex items-center gap-2 px-3 py-2 rounded-md transition text-sm font-medium",
    active
      ? "bg-gray-100 text-blue-600" // Style Active (Light Mode)
      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900", // Style Inactive
    className
  );

  const content = (
    <>
      {icon && <span className="text-lg">{icon}</span>}
      <span>{text}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {content}
    </button>
  );
}

// Dropdown untuk Desktop (DAST Tools)
function NavDropdown({
  icon,
  text,
  active,
  children,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-md transition text-sm font-medium",
          active || isOpen
            ? "bg-gray-100 text-blue-600"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        )}
      >
        {icon && <span className="text-lg">{icon}</span>}
        <span>{text}</span>
        <IoChevronDown
          className={clsx("ml-1 size-3 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {/* Dropdown Menu Absolute */}
      <div
        className={clsx(
          "absolute top-full left-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5 p-1 transition-all z-50 origin-top-left",
          isOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
        )}
      >
        {children}
      </div>
    </div>
  );
}

// --- Main Component ---

const Navbar = () => {
  
  const router = useRouter();
  const pathname = usePathname();

  // State untuk Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  // Lock scroll saat mobile menu terbuka
  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "GET" });
    } finally {
      router.replace("/sign/in");
    }
  };

  // Helper cek active path
  const isActive = (path: string) => pathname === path;
  const isToolsActive =
    pathname?.startsWith("/scan/list") ||
    pathname?.startsWith("/tools");

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          <div className="flex shrink-0 items-center gap-2">
             <span className="font-bold text-xl text-gray-900 tracking-tight">PostSch</span>
          </div>
            <div className="h-10 w-px bg-gray-200 mx-2" />
          <nav className="hidden lg:flex items-center gap-1">
           <NavDropdown
              icon={<MdPublish />}
              text="Publish"
              active={isToolsActive}
            >
        
              <div className="my-1 border-t border-gray-100" />
              <Link href="/post/addnewpost" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">New Post</Link>
              <Link href="/post/queuepost" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Queue Post</Link>
              <Link href="/post/statuspost" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Status Automation</Link>
            </NavDropdown>

            <NavDropdown
              icon={<MdAutoMode />}
              text="Automate"
              active={isToolsActive}
            >
        
              <div className="my-1 border-t border-gray-100" />
              <Link href="/main/bots" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">New Automation</Link>
              <Link href="/main/bots/command" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Automation</Link>
              <Link href="/main/bots/statusauto" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Status Automation</Link>
            </NavDropdown>

            <NavDropdown
              icon={<MdSchedule />}
              text="Schedule"
              active={isToolsActive}
            >
        
              <div className="my-1 border-t border-gray-100" />
              <Link href="/schedule/queue" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">New Schedule</Link>
              <Link href="/schedule/calendar" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Automation</Link>
            </NavDropdown>

            <NavDropdown
              icon={<MdAutoMode />}
              text="Team"
              active={isToolsActive}
            >
        
              <div className="my-1 border-t border-gray-100" />
              <Link href="/team/add" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Add Team</Link>
              <Link href="/team/list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Team List</Link>
            </NavDropdown>
           
          </nav>
          <div className="hidden lg:flex items-center gap-1">
            <NavItem
              text=""
              icon={<IoIosSettings className="text-xl" />}
              href="/settings"
              active={pathname?.startsWith("/settings")}
              className="text-gray-500"
            />
            <NavItem
              text=""
              icon={<FaUser />}
              href="/profile"
              active={pathname?.startsWith("/profile")}
              className="text-gray-500"
            />
            <div className="h-10 w-px bg-gray-200 mx-2" />
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700 px-3 py-2 rounded-md hover:bg-red-50 transition cursor-pointer"
            >
              Logout
            </button>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FaBars className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={clsx(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-bold text-lg text-gray-900">Menu</span>
          <button
            type="button"
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <Link
            href="/scan"
            onClick={() => setMobileMenuOpen(false)}
            className={clsx(
              "block rounded-lg px-3 py-2.5 text-base font-semibold leading-7",
              isActive("/scan") ? "bg-gray-50 text-blue-600" : "text-gray-900 hover:bg-gray-50"
            )}
          >
            Scan
          </Link>
          <Link
            href="/scan/report"
            onClick={() => setMobileMenuOpen(false)}
            className={clsx(
              "block rounded-lg px-3 py-2.5 text-base font-semibold leading-7",
              pathname?.startsWith("/scan/report") ? "bg-gray-50 text-blue-600" : "text-gray-900 hover:bg-gray-50"
            )}
          >
            Domain Scan
          </Link>

          <div className="my-4 border-t border-gray-100" />

          <Link
            href="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          >
            Settings
          </Link>
          <Link
            href="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          >
            Account
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="flex w-full items-center justify-center rounded-lg bg-red-50 px-3 py-2.5 text-base font-semibold text-red-600 hover:bg-red-100"
          >
            <IoIosLogOut className="mr-2 text-xl" />
            Log out
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;