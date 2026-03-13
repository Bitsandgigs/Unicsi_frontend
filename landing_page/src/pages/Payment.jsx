"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Stack,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

// ── Sample Data ───────────────────────────────────────────────────────────────
const PAST_PAYMENTS = [];
const UPCOMING_PAYMENTS = [];

const QUICK_RANGES = [
  { label: "3 Days", days: 3 },
  { label: "7 Days", days: 7 },
  { label: "15 Days", days: 15 },
  { label: "30 Days", days: 30 },
  { label: "3 Months", days: 90 },
];

function subDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() - n);
  return d;
}
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function fmtDisplay(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
function sameDay(a, b) {
  return a && b && a.toDateString() === b.toDateString();
}
function isBetween(d, from, to) {
  return from && to && d > from && d < to;
}

function NoRowsOverlay() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        pointerEvents: "none",
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#c8e8ef"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="8" y1="9" x2="16" y2="9" />
        <line x1="8" y1="13" x2="13" y2="13" />
      </svg>
      <Box sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#b0cdd4" }}>
        No rows to display
      </Box>
    </Box>
  );
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ── Shared DataGrid sx ────────────────────────────────────────────────────────
const dataGridSx = {
  border: 0,
  fontFamily: "inherit",
  fontSize: "0.875rem",
  "& .MuiDataGrid-columnHeaders": {
    background: GRADIENT,
    borderBottom: "none",
  },
  "& .MuiDataGrid-columnHeader": { background: "transparent" },
  "& .MuiDataGrid-columnHeaderTitle": {
    color: "#ffffff !important",
    fontWeight: 700,
    fontSize: "0.74rem",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  "& .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer svg": {
    color: "#fff",
  },
  "& .MuiDataGrid-columnSeparator svg": { color: "rgba(255,255,255,0.3)" },
  "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": { color: "#fff" },
  "& .MuiDataGrid-row": {
    color: "#000000",
    transition: "background 0.15s ease",
  },
  "& .MuiDataGrid-row:hover": { background: "#edf8fb", color: "#000000" },
  "& .MuiDataGrid-row.Mui-selected": {
    background: "rgba(0,151,178,0.07)",
    color: "#000000",
    "&:hover": { background: "rgba(0,151,178,0.12)" },
  },
  "& .MuiDataGrid-cell": {
    color: "#000000",
    borderColor: "#e8f6f9",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-cellCheckbox .MuiCheckbox-root": { color: "#b0b0b0" },
  "& .MuiCheckbox-root.Mui-checked": { color: "#0097b2" },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1.5px solid #e0f4f7",
    background: "#f8fdfe",
    color: "#000000",
  },
  "& .MuiTablePagination-root, & .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel":
    {
      color: "#000000",
    },
  "& .MuiTablePagination-selectIcon": { color: "#0097b2" },
  "& .MuiDataGrid-footerContainer .MuiIconButton-root": { color: "#0097b2" },
  // ← KEY FIX: ensure overlay wrapper fills the reserved height
  "& .MuiDataGrid-overlayWrapper": {
    height: "100% !important",
    position: "relative",
  },
  "& .MuiDataGrid-overlayWrapperInner": {
    height: "100% !important",
    position: "relative",
  },
};

// ── Shared DataGrid wrapper ───────────────────────────────────────────────────
function StyledDataGrid({
  rows,
  columns,
  pageSizeOptions = [5, 10],
  checkboxSelection = false,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "14px",
        border: "1.5px solid #e0f4f7",
        boxShadow: "0 2px 12px rgba(0,151,178,0.07)",
        // ← KEY FIX: fixed height so empty grid always shows the overlay
        height: rows.length === 0 ? 260 : "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        // ← KEY FIX: only use autoHeight when there are rows
        autoHeight={rows.length > 0}
        getRowHeight={() => "auto"}
        getEstimatedRowHeight={() => 72}
        slots={{ noRowsOverlay: NoRowsOverlay }}
        sx={{
          ...dataGridSx,
          flex: 1,
          "& .MuiDataGrid-cell": {
            ...dataGridSx["& .MuiDataGrid-cell"],
            alignItems: "center",
            py: "12px",
            minHeight: "60px !important",
          },
          "& .MuiDataGrid-row": {
            ...dataGridSx["& .MuiDataGrid-row"],
            minHeight: "60px !important",
          },
        }}
      />
    </Paper>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function FieldLabel({ children }) {
  return (
    <Box
      sx={{
        fontSize: "0.72rem",
        fontWeight: 600,
        color: "#0097b2",
        mb: 0.5,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      {children}
    </Box>
  );
}

function StyledSelect({
  value,
  onChange,
  options,
  placeholder,
  minWidth = 160,
}) {
  return (
    <FormControl size="small" sx={{ minWidth }}>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        renderValue={(v) =>
          v || (
            <span style={{ color: "#aaa", fontSize: "0.82rem" }}>
              {placeholder}
            </span>
          )
        }
        sx={{
          borderRadius: "9px",
          fontSize: "0.82rem",
          background: "#fff",
          "& fieldset": { borderColor: "#d0eef3" },
          "&:hover fieldset": { borderColor: "#0097b2" },
          "&.Mui-focused fieldset": { borderColor: "#0097b2" },
          "& .MuiSelect-select": { color: "#000", py: "7px" },
        }}
      >
        {options.map((o) => (
          <MenuItem
            key={o}
            value={o}
            sx={{
              fontSize: "0.82rem",
              "&:hover": { background: "rgba(0,151,178,0.07)" },
              "&.Mui-selected": {
                background: "rgba(0,151,178,0.1)",
                color: "#0097b2",
                fontWeight: 600,
              },
            }}
          >
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function IconBtn({ children, onClick, title, outline = false }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "7px 14px",
        borderRadius: "9px",
        fontSize: "0.8rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s",
        border: outline ? "1.5px solid #0097b2" : "none",
        background: outline
          ? h
            ? GRADIENT
            : "transparent"
          : h
            ? GRADIENT_HOVER
            : GRADIENT,
        color: outline ? (h ? "#fff" : "#0097b2") : "#fff",
        boxShadow: h ? "0 3px 12px rgba(0,151,178,0.25)" : "none",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

function NavBtn({ arrow, disabled, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: 28,
        height: 28,
        borderRadius: "7px",
        border: "1.5px solid #d0eef3",
        background: disabled ? "#f0f0f0" : h ? GRADIENT : "#fff",
        color: disabled ? "#bbb" : h ? "#fff" : "#0097b2",
        fontSize: "1rem",
        fontWeight: 700,
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
        flexShrink: 0,
      }}
    >
      {arrow}
    </button>
  );
}

// ── Date Range Picker ─────────────────────────────────────────────────────────
function DateRangePicker({ value, onChange }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [leftMonth, setLeftMonth] = useState(() => {
    const d = new Date(today);
    d.setMonth(d.getMonth() - 1);
    return startOfMonth(d);
  });
  const [pendingFrom, setPendingFrom] = useState(null);
  const [pendingTo, setPendingTo] = useState(null);
  const [selectingTo, setSelectingTo] = useState(false);

  const rightMonth = new Date(
    leftMonth.getFullYear(),
    leftMonth.getMonth() + 1,
    1,
  );

  function prevMonth() {
    setLeftMonth(
      new Date(leftMonth.getFullYear(), leftMonth.getMonth() - 1, 1),
    );
  }
  function nextMonth() {
    setLeftMonth(
      new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1, 1),
    );
  }

  function handleQuick(days) {
    const from = subDays(today, days - 1);
    setPendingFrom(from);
    setPendingTo(today);
    setSelectingTo(false);
  }

  function handleDayClick(date) {
    if (!selectingTo || !pendingFrom) {
      setPendingFrom(date);
      setPendingTo(null);
      setSelectingTo(true);
    } else {
      if (date < pendingFrom) {
        setPendingFrom(date);
        setPendingTo(null);
        setSelectingTo(true);
      } else {
        setPendingTo(date);
        setSelectingTo(false);
      }
    }
  }

  function handleApply() {
    if (pendingFrom && pendingTo) {
      onChange({
        from: pendingFrom,
        to: pendingTo,
        label: `${fmtDisplay(pendingFrom)} – ${fmtDisplay(pendingTo)}`,
      });
      setOpen(false);
    }
  }

  function handleReset() {
    setPendingFrom(null);
    setPendingTo(null);
    setSelectingTo(false);
    onChange({ from: null, to: null, label: "" });
    setOpen(false);
  }

  const effectiveTo =
    selectingTo && hovered && pendingFrom
      ? hovered >= pendingFrom
        ? hovered
        : pendingFrom
      : pendingTo;
  const effectiveFrom =
    selectingTo && hovered && pendingFrom && hovered < pendingFrom
      ? hovered
      : pendingFrom;

  function renderMonth(monthStart) {
    const year = monthStart.getFullYear();
    const month = monthStart.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

    return (
      <Box sx={{ minWidth: 230 }}>
        <Box
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "0.92rem",
            color: "#0097b2",
            mb: 1.5,
          }}
        >
          {MONTH_NAMES[month]} {year}
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 0,
          }}
        >
          {DAY_NAMES.map((d) => (
            <Box
              key={d}
              sx={{
                textAlign: "center",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "#888",
                pb: 1,
              }}
            >
              {d}
            </Box>
          ))}
          {cells.map((date, i) => {
            if (!date) return <Box key={`e-${i}`} />;
            const isToday = sameDay(date, today);
            const isFrom = sameDay(date, effectiveFrom);
            const isTo = sameDay(date, effectiveTo);
            const inRange = isBetween(date, effectiveFrom, effectiveTo);
            const isFuture = date > today;
            return (
              <Box
                key={date.toISOString()}
                onMouseEnter={() => selectingTo && setHovered(date)}
                onMouseLeave={() => selectingTo && setHovered(null)}
                onClick={() => !isFuture && handleDayClick(date)}
                sx={{
                  textAlign: "center",
                  py: "5px",
                  fontSize: "0.82rem",
                  fontWeight: isFrom || isTo ? 700 : 400,
                  cursor: isFuture ? "default" : "pointer",
                  color: isFuture
                    ? "#ccc"
                    : isFrom || isTo
                      ? "#fff"
                      : isToday
                        ? "#0097b2"
                        : "#222",
                  background:
                    isFrom || isTo
                      ? GRADIENT
                      : inRange
                        ? "rgba(0,151,178,0.1)"
                        : "transparent",
                  borderRadius: isFrom
                    ? "6px 0 0 6px"
                    : isTo
                      ? "0 6px 6px 0"
                      : inRange
                        ? "0"
                        : "6px",
                  transition: "background 0.15s",
                  "&:hover": {
                    background: isFuture
                      ? "transparent"
                      : isFrom || isTo
                        ? GRADIENT
                        : "rgba(0,151,178,0.18)",
                    borderRadius: "6px",
                  },
                }}
              >
                {isToday && !isFrom && !isTo ? (
                  <Box sx={{ fontWeight: 800, color: "#0097b2" }}>
                    {date.getDate()}
                  </Box>
                ) : (
                  date.getDate()
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  const displayLabel = value?.label || "-- Select Date --";

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        onClick={() => setOpen((o) => !o)}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          border: open ? "1.5px solid #0097b2" : "1.5px solid #d0eef3",
          borderRadius: "9px",
          px: 1.5,
          py: "6px",
          background: "#fff",
          cursor: "pointer",
          minWidth: 180,
          fontSize: "0.82rem",
          color: value?.from ? "#000" : "#aaa",
          boxShadow: open ? "0 0 0 3px rgba(0,151,178,0.1)" : "none",
          transition: "all 0.2s",
          "&:hover": { borderColor: "#0097b2" },
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0097b2"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <Box sx={{ flex: 1 }}>{displayLabel}</Box>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#888"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </Box>

      {open && (
        <Box
          sx={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 1300,
            background: "#fff",
            borderRadius: "14px",
            border: "1.5px solid #e0f4f7",
            boxShadow: "0 8px 32px rgba(0,151,178,0.15)",
            overflow: "hidden",
            minWidth: 520,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              p: 2,
              pb: 1.5,
              borderBottom: "1px solid #e8f6f9",
            }}
          >
            <Box
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#555",
                alignSelf: "center",
                mr: 0.5,
              }}
            >
              Last:
            </Box>
            {QUICK_RANGES.map((r) => {
              const from = subDays(today, r.days - 1);
              const active =
                pendingFrom &&
                pendingTo &&
                sameDay(pendingFrom, from) &&
                sameDay(pendingTo, today);
              return (
                <Box
                  key={r.label}
                  onClick={() => handleQuick(r.days)}
                  sx={{
                    px: 1.5,
                    py: "4px",
                    borderRadius: "20px",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "1.5px solid",
                    borderColor: active ? "#0097b2" : "#d0eef3",
                    background: active ? "rgba(0,151,178,0.08)" : "#fff",
                    color: active ? "#0097b2" : "#444",
                    "&:hover": { borderColor: "#0097b2", color: "#0097b2" },
                    transition: "all 0.15s",
                  }}
                >
                  {r.label}
                </Box>
              );
            })}
          </Box>

          <Box sx={{ display: "flex", gap: 0, p: 2, pb: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                pt: 0.5,
                mr: 1,
              }}
            >
              <NavBtn arrow="‹" onClick={prevMonth} />
            </Box>
            {renderMonth(leftMonth)}
            <Box
              sx={{
                width: "1px",
                background: "#e8f6f9",
                mx: 2,
                alignSelf: "stretch",
              }}
            />
            {renderMonth(rightMonth)}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                pt: 0.5,
                ml: 1,
              }}
            >
              <NavBtn arrow="›" onClick={nextMonth} />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2.5,
              py: 1.5,
              borderTop: "1px solid #e8f6f9",
              background: "#f8fdfe",
            }}
          >
            <Box sx={{ fontSize: "0.82rem", color: "#555" }}>
              <strong style={{ color: "#000" }}>From:</strong>{" "}
              <span style={{ color: "#0097b2", fontWeight: 600 }}>
                {pendingFrom ? fmtDisplay(pendingFrom) : "—"}
              </span>
              {"  –  "}
              <strong style={{ color: "#000" }}>To:</strong>{" "}
              <span style={{ color: "#0097b2", fontWeight: 600 }}>
                {pendingTo ? fmtDisplay(pendingTo) : "—"}
              </span>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconBtn outline onClick={handleReset}>
                Reset
              </IconBtn>
              <IconBtn
                onClick={handleApply}
                disabled={!pendingFrom || !pendingTo}
              >
                Apply
              </IconBtn>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

const PARTNER_OPTIONS = [
  "All Partners",
  "Ekart",
  "Delhivery",
  "Blue Dart",
  "DTDC",
  "Xpressbees",
];
const SEARCH_FIELDS = ["Order ID", "CMS ID", "SKU ID"];

const DownloadSVG = ({ color = "currentColor" }) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

function ActionBtn({ active, label }) {
  const [h, setH] = useState(false);
  return (
    <button
      disabled={!active}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "5px 10px",
        borderRadius: "8px",
        fontSize: "0.75rem",
        fontWeight: 600,
        cursor: active ? "pointer" : "not-allowed",
        transition: "all 0.2s",
        border: active ? "1.5px solid #0097b2" : "1.5px solid #d0d0d0",
        background: active ? (h ? GRADIENT : "transparent") : "#f5f5f5",
        color: active ? (h ? "#fff" : "#0097b2") : "#aaa",
        boxShadow: active && h ? "0 2px 8px rgba(0,151,178,0.2)" : "none",
      }}
    >
      <DownloadSVG color={active ? (h ? "#fff" : "#0097b2") : "#aaa"} />
      {label}
    </button>
  );
}

function SearchBar({ searchField, setSearchField, searchVal, setSearchVal }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2.5,
        maxWidth: 460,
        border: "1.5px solid #d0eef3",
        borderRadius: "9px",
        background: "#fff",
        overflow: "hidden",
        "&:focus-within": {
          borderColor: "#0097b2",
          boxShadow: "0 0 0 3px rgba(0,151,178,0.1)",
        },
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      <Select
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
        size="small"
        variant="standard"
        disableUnderline
        sx={{
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "#000",
          minWidth: 100,
          pl: 1.5,
          pr: 0.5,
          borderRight: "1.5px solid #d0eef3",
          "& .MuiSelect-select": { py: "8px", pr: "28px !important" },
          "& .MuiSelect-icon": { color: "#0097b2", right: 4 },
        }}
      >
        {SEARCH_FIELDS.map((f) => (
          <MenuItem key={f} value={f} sx={{ fontSize: "0.82rem" }}>
            {f}
          </MenuItem>
        ))}
      </Select>
      <input
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder={`Enter ${searchField}(s)`}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          padding: "8px 12px",
          fontSize: "0.82rem",
          color: "#000",
          background: "transparent",
        }}
      />
      <button
        style={{
          padding: "0 14px",
          alignSelf: "stretch",
          background: "#000",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </Box>
  );
}

function FiltersRow({
  dateFilter,
  setDateFilter,
  partnerFilter,
  setPartnerFilter,
  setSearchVal,
  extraActions,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mb: 3,
        flexWrap: "wrap",
      }}
    >
      <Box>
        <FieldLabel>Date:</FieldLabel>
        <DateRangePicker value={dateFilter} onChange={setDateFilter} />
      </Box>
      <Box>
        <FieldLabel>Shipping Partner:</FieldLabel>
        <StyledSelect
          value={partnerFilter}
          onChange={setPartnerFilter}
          options={PARTNER_OPTIONS}
          placeholder="-- Select Option --"
        />
      </Box>
      <Box sx={{ mt: 2.5, display: "flex", gap: 1 }}>
        <IconBtn>
          <span>✓</span> Apply
        </IconBtn>
        <IconBtn
          outline
          onClick={() => {
            setDateFilter({ from: null, to: null, label: "" });
            setPartnerFilter("");
            setSearchVal("");
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Reset
        </IconBtn>
        {extraActions}
      </Box>
    </Box>
  );
}

// ── Past Payments Tab ─────────────────────────────────────────────────────────
function PastPaymentsTab() {
  const [searchField, setSearchField] = useState("Order ID");
  const [searchVal, setSearchVal] = useState("");
  const [dateFilter, setDateFilter] = useState({
    from: null,
    to: null,
    label: "",
  });
  const [partnerFilter, setPartnerFilter] = useState("");

  const rows = useMemo(
    () =>
      PAST_PAYMENTS.map((row) => ({
        ...row,
        cmsIds: row.cms.map((c) => c.id).join("\n"),
        amounts: row.cms.map((c) => c.amount).join("\n"),
      })),
    [],
  );

  const columns = [
    {
      field: "date",
      headerName: "Payment Date",
      width: 160,
      renderCell: (params) => (
        <Box sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#000" }}>
          {params.value}
        </Box>
      ),
    },
    {
      field: "cycle",
      headerName: "Payment Cycle",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ fontSize: "0.875rem", color: "#333" }}>{params.value}</Box>
      ),
    },
    {
      field: "cmsIds",
      headerName: "CMS ID",
      flex: 1.4,
      renderCell: (params) => (
        <Box>
          {params.row.cms?.map((c, i) => (
            <Box
              key={i}
              sx={{ fontSize: "0.82rem", color: "#333", lineHeight: 1.8 }}
            >
              {c.id}
            </Box>
          ))}
        </Box>
      ),
    },
    {
      field: "amounts",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => (
        <Box>
          {params.row.cms?.map((c, i) => (
            <Box
              key={i}
              sx={{
                fontSize: "0.82rem",
                fontWeight: 500,
                color: "#000",
                lineHeight: 1.8,
              }}
            >
              {c.amount}
            </Box>
          ))}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.6,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <ActionBtn active={params.row.hasSheet} label="Payment Sheet" />
          <ActionBtn active={params.row.hasInvoice} label="Invoice" />
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {/* Last Payment summary card */}
      <Box
        sx={{
          mb: 3,
          p: 2.5,
          borderRadius: "14px",
          border: "1.5px solid #e0f4f7",
          background: "#fff",
          boxShadow: "0 2px 12px rgba(0,151,178,0.07)",
          maxWidth: 520,
        }}
      >
        <Box sx={{ fontSize: "0.875rem", color: "#444", mb: 1 }}>
          Last Payment <strong style={{ color: "#000" }}>(—)</strong>:
        </Box>
        <Box
          sx={{
            fontSize: "2rem",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            background: GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          ₹0.00
        </Box>
        <Box
          sx={{
            display: "flex",
            borderTop: "1px solid #e0f4f7",
            pt: 1.5,
            gap: 0,
          }}
        >
          <Box sx={{ flex: 1, borderRight: "1px solid #e0f4f7", pr: 2 }}>
            <Box
              sx={{
                fontSize: "0.72rem",
                color: "#888",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                mb: 0.3,
              }}
            >
              Delivered
            </Box>
            <Box sx={{ fontSize: "1rem", fontWeight: 700, color: "#2e7d1e" }}>
              ₹0.00
            </Box>
          </Box>
          <Box sx={{ flex: 1, pl: 2 }}>
            <Box
              sx={{
                fontSize: "0.72rem",
                color: "#888",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                mb: 0.3,
              }}
            >
              Adjustment
            </Box>
            <Box sx={{ fontSize: "1rem", fontWeight: 700, color: "#c62828" }}>
              ₹0.00
            </Box>
          </Box>
        </Box>
      </Box>

      <SearchBar
        searchField={searchField}
        setSearchField={setSearchField}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
      />
      <FiltersRow
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        partnerFilter={partnerFilter}
        setPartnerFilter={setPartnerFilter}
        setSearchVal={setSearchVal}
      />

      <StyledDataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} />
    </Box>
  );
}

// ── Upcoming Payments Tab ─────────────────────────────────────────────────────
function UpcomingPaymentsTab() {
  const [searchField, setSearchField] = useState("Order ID");
  const [searchVal, setSearchVal] = useState("");
  const [dateFilter, setDateFilter] = useState({
    from: null,
    to: null,
    label: "",
  });
  const [partnerFilter, setPartnerFilter] = useState("");

  const columns = [
    {
      field: "product",
      headerName: "Product Details",
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "8px",
              background:
                "linear-gradient(135deg, rgba(0,151,178,0.12), rgba(126,217,87,0.12))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0097b2"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </Box>
          <Box>
            <Box
              sx={{
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#000",
                lineHeight: 1.3,
              }}
            >
              {params.value}
            </Box>
            <Box sx={{ fontSize: "0.72rem", color: "#888" }}>
              Qty: {params.row.qty}
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      field: "variant",
      headerName: "Variant",
      width: 100,
      renderCell: (p) => (
        <Box sx={{ fontSize: "0.82rem", color: "#333" }}>{p.value}</Box>
      ),
    },
    {
      field: "sku",
      headerName: "SKU ID",
      flex: 1.4,
      renderCell: (p) => (
        <Box
          sx={{ fontSize: "0.78rem", color: "#333", wordBreak: "break-word" }}
        >
          {p.value}
        </Box>
      ),
    },
    {
      field: "orderId",
      headerName: "Order ID",
      width: 120,
      renderCell: (p) => (
        <Box sx={{ fontSize: "0.82rem", color: "#333" }}>{p.value}</Box>
      ),
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 120,
      renderCell: (p) => (
        <Box sx={{ fontSize: "0.82rem", color: "#333" }}>{p.value}</Box>
      ),
    },
    {
      field: "price",
      headerName: "Transfer Price",
      width: 110,
      renderCell: (p) => (
        <Box sx={{ fontSize: "0.875rem", fontWeight: 700, color: "#000" }}>
          {p.value}
        </Box>
      ),
    },
    {
      field: "partner",
      headerName: "Shipping Partner",
      flex: 1.4,
      renderCell: (params) => (
        <Box>
          <Box sx={{ fontSize: "0.78rem", color: "#333" }}>{params.value}</Box>
          <Box
            sx={{
              fontSize: "0.72rem",
              color: "#0097b2",
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {params.row.trackingId}
          </Box>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Order Status",
      width: 140,
      renderCell: (params) => (
        <Box>
          <Box
            sx={{
              fontSize: "0.78rem",
              fontWeight: 700,
              color: params.value === "Delivered" ? "#2e7d1e" : "#e65100",
            }}
          >
            {params.value}
          </Box>
          {params.row.deliveredOn !== "—" && (
            <Box sx={{ fontSize: "0.7rem", color: "#888" }}>
              On {params.row.deliveredOn}
            </Box>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <SearchBar
        searchField={searchField}
        setSearchField={setSearchField}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
      />
      <FiltersRow
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        partnerFilter={partnerFilter}
        setPartnerFilter={setPartnerFilter}
        setSearchVal={setSearchVal}
        extraActions={
          <IconBtn outline>
            <DownloadSVG color="#0097b2" /> Excel
          </IconBtn>
        }
      />
      <StyledDataGrid
        rows={UPCOMING_PAYMENTS}
        columns={columns}
        pageSizeOptions={[7, 10]}
        checkboxSelection
      />
    </Box>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4fbfc",
        py: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "#000",
            letterSpacing: "-0.02em",
          }}
        >
          Payments
        </Typography>
        <Stack direction="row" spacing={1.5}>
          <IconBtn outline>
            <DownloadSVG color="#0097b2" /> Download GST Report
          </IconBtn>
          <IconBtn outline>
            <DownloadSVG color="#0097b2" /> Download GST Invoice
          </IconBtn>
        </Stack>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", borderBottom: "2px solid #e0f4f7" }}>
          {["Past Payments", "Upcoming Payments"].map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "10px 20px",
                border: "none",
                background: "transparent",
                fontSize: "0.9rem",
                fontWeight: activeTab === i ? 700 : 500,
                color: activeTab === i ? "#0097b2" : "#555",
                cursor: "pointer",
                position: "relative",
                transition: "color 0.2s",
                borderBottom:
                  activeTab === i
                    ? "2.5px solid #0097b2"
                    : "2.5px solid transparent",
                marginBottom: "-2px",
              }}
            >
              {tab}
            </button>
          ))}
        </Box>
      </Box>

      {activeTab === 0 ? <PastPaymentsTab /> : <UpcomingPaymentsTab />}
    </Box>
  );
}
