"use client";

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import logo from "../../assets/images/logo.png";

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 80;
const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

const mainMenuItems = [
  { name: "Manage Orders", icon: ShoppingCartIcon, path: "/order" },
  { name: "Manage RTO / Returns", icon: TrendingUpIcon, path: "/rto-returns" },
  { name: "Add Product", icon: AddIcon, path: "/products" },
  { name: "Product Requirement", icon: AddIcon, path: "/product-requirement" },
  { name: "Manage Products", icon: WarehouseIcon, path: "/manage-products" },
  { name: "Reports", icon: TrendingUpIcon, path: "/reports" },
  { name: "Payments", icon: PaymentIcon, path: "/payments" },
  { name: "Profile", icon: PersonIcon, path: "/profile" },
];

const secondaryMenuItems = [
  { name: "Setting", icon: SettingsIcon, path: "/settings" },
  { name: "FAQs", icon: HelpIcon, path: null, pdfPath: "/faq.pdf" },
  { name: "Supports", icon: SupportAgentIcon, path: "/supports" },
];

function NavItem({ item, isActive, open = true }) {
  const IconComponent = item.icon;

  const handleClick = (e) => {
    if (item.pdfPath) {
      e.preventDefault();
      window.open(item.pdfPath, "_blank");
    }
  };

  return (
    <ListItemButton
      href={item.path || "#"}
      component="a"
      selected={isActive}
      onClick={handleClick}
      sx={{
        borderRadius: 2,
        mb: 0.5,
        cursor: "pointer",
        justifyContent: open ? "flex-start" : "center",
        px: open ? 2 : 1,
        py: 1.5,
        transition: "background 0.2s ease",
        minHeight: open ? "auto" : 56,
        borderLeft: "3px solid transparent",
        background: "transparent",
        "& .MuiListItemIcon-root svg": {
          fill: "#1a1a1a !important",
          color: "#1a1a1a !important",
          fontSize: "1.3rem",
          transition: "fill 0.15s ease",
        },
        "& .MuiListItemText-primary": {
          color: "#1a1a1a",
          fontWeight: 500,
          fontSize: "0.95rem",
        },
        "&:hover": {
          background: GRADIENT_HOVER,
          borderLeft: "3px solid #7ed957",
          "& .MuiListItemIcon-root svg": {
            fill: "#ffffff !important",
            color: "#ffffff !important",
          },
          "& .MuiListItemText-primary": { color: "#ffffff", fontWeight: 600 },
        },
        "&.Mui-selected": {
          background: GRADIENT,
          borderLeft: "3px solid #7ed957",
          "& .MuiListItemIcon-root svg": {
            fill: "#ffffff !important",
            color: "#ffffff !important",
          },
          "& .MuiListItemText-primary": { color: "#ffffff", fontWeight: 700 },
        },
        "&.Mui-selected:hover": {
          background: GRADIENT_HOVER,
          borderLeft: "3px solid #7ed957",
        },
        "& .MuiTouchRipple-root": { color: "rgba(255,255,255,0.15)" },
      }}
      title={!open ? item.name : ""}
    >
      <ListItemIcon
        sx={{ minWidth: open ? 40 : "auto", justifyContent: "center" }}
      >
        <IconComponent />
      </ListItemIcon>
      {open && (
        <ListItemText
          primary={item.name}
          primaryTypographyProps={{
            sx: { whiteSpace: "nowrap", transition: "color 0.15s ease" },
          }}
        />
      )}
    </ListItemButton>
  );
}

function NavList({ pathname, open }) {
  return (
    <>
      {mainMenuItems.map((item, idx) => (
        <NavItem
          key={idx}
          item={item}
          isActive={
            !!pathname &&
            (pathname === item.path || pathname.startsWith(item.path + "/"))
          }
          open={open}
        />
      ))}

      {/* Divider between main nav and support section */}
      <Box sx={{ px: 1, py: 1 }}>
        <Divider sx={{ borderColor: "#e0f4f7" }} />
      </Box>

      {secondaryMenuItems.map((item, idx) => (
        <NavItem
          key={idx}
          item={item}
          isActive={
            !!pathname &&
            (pathname === item.path || pathname.startsWith(item.path + "/"))
          }
          open={open}
        />
      ))}
    </>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleDrawer = () => {
    if (isMobile) setMobileOpen((v) => !v);
    else setOpen((v) => !v);
  };

  const sidebarContent = (showOpen = true) => (
    <Box
      sx={{
        width: showOpen ? (open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED) : 280,
        transition: "width 0.3s ease-in-out",
        bgcolor: "#ffffff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1.5px solid #e0f4f7",
        overflowY: "auto",
        overflowX: "hidden",
        boxShadow: "2px 0 16px rgba(0,151,178,0.07)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          borderBottom: "1.5px solid #e0f4f7",
          minHeight: 80,
        }}
      >
        {open && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "auto", height: 40, objectFit: "contain" }}
            />
          </Box>
        )}
        <IconButton
          onClick={toggleDrawer}
          size="small"
          sx={{
            color: "#0097b2",
            border: "1.5px solid #0097b2",
            borderRadius: "10px",
            transition: "all 0.2s",
            "& path": { fill: "#0097b2 !important" },
            "&:hover": {
              background: GRADIENT,
              color: "#fff",
              borderColor: "transparent",
              "& path": { fill: "#fff !important" },
            },
          }}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Nav */}
      <List sx={{ flex: 1, px: 1, pt: 1 }}>
        <NavList pathname={pathname} open={showOpen ? open : true} />
      </List>

      <Box sx={{ height: 4, background: GRADIENT, flexShrink: 0 }} />
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={toggleDrawer}
            sx={{ p: 2, color: "#0097b2", "&:hover": { color: "#7ed957" } }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: 280,
                bgcolor: "#ffffff",
                border: "none",
              },
            }}
          >
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1.5px solid #e0f4f7",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: 40, height: 40, objectFit: "contain" }}
              />
              <IconButton
                onClick={() => setMobileOpen(false)}
                size="small"
                sx={{
                  color: "#0097b2",
                  border: "1.5px solid #0097b2",
                  borderRadius: "10px",
                  "&:hover": {
                    background: GRADIENT,
                    color: "#fff",
                    borderColor: "transparent",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <List sx={{ px: 1, pt: 1 }}>
              <NavList pathname={pathname} open={true} />
            </List>
            <Box sx={{ height: 4, background: GRADIENT }} />
          </Drawer>
        </Box>
      ) : (
        sidebarContent(true)
      )}
    </>
  );
}
