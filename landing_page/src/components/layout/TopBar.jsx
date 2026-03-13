// components/layout/TopBar.jsx
"use client";

import notificationIcon from "../../assets/icons/ic_notifications.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../../auth/AuthContext";

const menuItems = [
  { name: "Manage Orders", path: "/order" },
  { name: "Manage RTO / Returns", path: "/rto-returns" },
  { name: "Add Product", path: "/products" },
  { name: "Product Requirement", path: "/product-requirement" },
  { name: "Manage Products", path: "/manage-products" },
  { name: "Reports", path: "/reports" },
  { name: "Payments", path: "/payments" },
  { name: "Profile", path: "/profile" },
  { name: "Setting", path: "/settings" },
  { name: "FAQs", path: "/faqs" },
  { name: "Supports", path: "/supports" },
];

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

// Stable avatar URL — seeded on the user's identifier so it never changes
const AVATAR_URL =
  "https://images.unsplash.com/photo-1772371272228-f4a8247cfe6d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function usePageName() {
  if (typeof window === "undefined") return "Dashboard";
  const pathname = window.location.pathname;
  const match = menuItems.find((item) => item.path === pathname);
  return match ? match.name : "Dashboard";
}

export default function TopBar() {
  const { isAuthenticated, logout } = useAuth();
  const pageName = usePageName();

  return (
    <header
      className="flex items-center justify-between bg-white pl-6 pr-6 py-0 my-4 mb-10 h-[72px]"
      style={{
        borderRadius: "16px",
        border: "1px solid #e0f4f7",
        boxShadow:
          "0 2px 12px 0 rgba(0,151,178,0.08), 0 1px 3px 0 rgba(0,0,0,0.04)",
      }}
    >
      {/* Left: Dynamic Breadcrumb */}
      <div className="flex items-center gap-2">
        <span
          className="text-[13px] font-medium tracking-wide"
          style={{ color: "#0097b2", letterSpacing: "0.04em" }}
        >
          Dashboard
        </span>
        <svg width="12" height="12" viewBox="0 0 13 12" fill="none">
          <path
            d="M4.9375 9.91195L8.15841 6.69104C8.5388 6.31065 8.5388 5.68821 8.15841 5.30783L4.9375 2.08691"
            stroke="#0097b2"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="text-[16px] font-semibold"
          style={{ color: "#000000", letterSpacing: "-0.01em" }}
        >
          {pageName}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-150"
          style={{
            background: "#f0fafc",
            border: "1px solid #b8e8f0",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = GRADIENT;
            e.currentTarget.style.border = "1px solid transparent";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f0fafc";
            e.currentTarget.style.border = "1px solid #b8e8f0";
          }}
        >
          <img
            src={notificationIcon}
            alt="Notifications"
            className="w-[18px] h-[18px]"
          />
          <span
            className="absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full"
            style={{ background: "#7ed957", border: "1.5px solid #fff" }}
          />
        </button>

        <div className="h-8 w-px mx-1" style={{ background: "#d0eef3" }} />

        <ProfileDropDown />
      </div>
    </header>
  );
}

function ProfileDropDown() {
  const { logout } = useAuth();

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 outline-none"
        style={{
          background: GRADIENT,
          border: "1px solid transparent",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = GRADIENT_HOVER;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = GRADIENT;
        }}
      >
        <img
          src={AVATAR_URL}
          alt="User"
          className="w-7 h-7 rounded-full"
          style={{ border: "1.5px solid rgba(255,255,255,0.7)" }}
        />
        <ChevronDownIcon className="w-4 h-4" style={{ color: "#ffffff" }} />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-xl py-1 outline-none transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        style={{
          background: "#fff",
          border: "1px solid #d0eef3",
          boxShadow: "0 8px 24px rgba(0,151,178,0.12)",
        }}
      >
        <MenuItem>
          {({ focus }) => (
            <a
              href="/profile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                fontSize: "0.875rem",
                color: focus ? "#fff" : "#000",
                background: focus ? GRADIENT : "transparent",
                fontWeight: focus ? 600 : 400,
                borderRadius: "8px",
                margin: "0 4px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              Profile
            </a>
          )}
        </MenuItem>

        <div
          className="mx-3 my-1"
          style={{ height: "1px", background: "#e0f4f7" }}
        />

        <MenuItem>
          {({ focus }) => (
            <button
              onClick={() => logout()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                fontSize: "0.875rem",
                textAlign: "left",
                color: focus ? "#fff" : "#000",
                background: focus ? GRADIENT : "transparent",
                fontWeight: focus ? 600 : 400,
                borderRadius: "8px",
                margin: "0 4px",
                width: "calc(100% - 8px)",
                cursor: "pointer",
                border: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log out
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
