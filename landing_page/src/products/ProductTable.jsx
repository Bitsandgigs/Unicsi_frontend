import React, { useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";
const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

function GradientButton({
  children,
  onClick,
  secondary = false,
  size = "medium",
}) {
  const [hovered, setHovered] = useState(false);
  const pad = size === "small" ? "4px 14px" : "9px 22px";
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: pad,
        borderRadius: "6px",
        border: secondary ? "1.5px solid #0097b2" : "none",
        background: secondary
          ? hovered
            ? GRADIENT
            : "transparent"
          : hovered
            ? GRADIENT_HOVER
            : GRADIENT,
        color: secondary ? (hovered ? "#fff" : "#0097b2") : "#fff",
        fontSize: "0.78rem",
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
        lineHeight: "1",
        height: "28px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: secondary
          ? "none"
          : hovered
            ? "0 4px 14px rgba(0,151,178,0.3)"
            : "0 2px 8px rgba(0,151,178,0.2)",
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}

// ── No Rows Overlay ───────────────────────────────────────────────────────────
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

// ── Custom Pagination Bar ─────────────────────────────────────────────────────
function TablePagination({
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) {
  const totalPages = Math.ceil(total / rowsPerPage);
  const from = total === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const to = Math.min(page * rowsPerPage, total);

  function getPageNumbers() {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, 5];
    if (page >= totalPages - 2)
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [page - 2, page - 1, page, page + 1, page + 2];
  }

  const pages = getPageNumbers();
  const showLeftEllipsis = totalPages > 5 && pages[0] > 1;
  const showRightEllipsis =
    totalPages > 5 && pages[pages.length - 1] < totalPages;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2.5,
        py: 1.8,
        borderTop: "1.5px solid #e0f4f7",
        background: "#f8fdfe",
        flexWrap: "wrap",
        gap: 1.5,
      }}
    >
      {/* Left: count + rows-per-page */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          sx={{ fontSize: "0.82rem", color: "#555", fontWeight: 500 }}
        >
          Showing{" "}
          <strong style={{ color: "#000" }}>
            {from}–{to}
          </strong>{" "}
          of <strong style={{ color: "#000" }}>{total}</strong> results
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            sx={{ fontSize: "0.78rem", color: "#888", whiteSpace: "nowrap" }}
          >
            Rows per page:
          </Typography>
          <Select
            value={rowsPerPage}
            onChange={(e) => {
              onRowsPerPageChange(Number(e.target.value));
              onPageChange(1);
            }}
            size="small"
            variant="outlined"
            sx={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#000",
              height: 30,
              "& fieldset": { borderColor: "#d0eef3", borderRadius: "8px" },
              "&:hover fieldset": { borderColor: "#0097b2" },
              "&.Mui-focused fieldset": { borderColor: "#0097b2" },
              "& .MuiSelect-select": {
                py: "4px",
                pl: "10px",
                pr: "28px !important",
              },
              "& .MuiSelect-icon": { color: "#0097b2" },
            }}
          >
            {ROWS_PER_PAGE_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt} sx={{ fontSize: "0.82rem" }}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Right: page nav */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <PaginationBtn
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          icon={<ChevronLeft size={15} />}
        />

        {showLeftEllipsis && (
          <>
            <PaginationBtn
              label={1}
              active={false}
              onClick={() => onPageChange(1)}
            />
            <Ellipsis />
          </>
        )}

        {pages.map((p) => (
          <PaginationBtn
            key={p}
            label={p}
            active={p === page}
            onClick={() => onPageChange(p)}
          />
        ))}

        {showRightEllipsis && (
          <>
            <Ellipsis />
            <PaginationBtn
              label={totalPages}
              active={false}
              onClick={() => onPageChange(totalPages)}
            />
          </>
        )}

        <PaginationBtn
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          icon={<ChevronRight size={15} />}
        />
      </Box>
    </Box>
  );
}

function PaginationBtn({ label, active, onClick, disabled, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: 32,
        height: 32,
        borderRadius: "8px",
        border: active ? "none" : "1.5px solid #d0eef3",
        background: active
          ? GRADIENT
          : hovered && !disabled
            ? "rgba(0,151,178,0.08)"
            : "#fff",
        color: active
          ? "#fff"
          : disabled
            ? "#bbb"
            : hovered
              ? "#0097b2"
              : "#444",
        fontSize: "0.82rem",
        fontWeight: active ? 700 : 500,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.18s ease",
        boxShadow: active ? "0 2px 8px rgba(0,151,178,0.25)" : "none",
        padding: "0 6px",
      }}
    >
      {icon || label}
    </button>
  );
}

function Ellipsis() {
  return (
    <Box
      sx={{
        width: 28,
        textAlign: "center",
        fontSize: "0.85rem",
        color: "#aaa",
        userSelect: "none",
      }}
    >
      …
    </Box>
  );
}

// ── DataGrid sx ───────────────────────────────────────────────────────────────
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
    fontSize: "0.82rem",
    letterSpacing: "0.03em",
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
  "& .MuiDataGrid-row:hover": { background: "#f0fafc", color: "#000000" },
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
  // Hide the built-in footer — we render our own pagination bar
  "& .MuiDataGrid-footerContainer": { display: "none" },
  // Overlay fix
  "& .MuiDataGrid-overlayWrapper": {
    height: "100% !important",
    position: "relative",
  },
  "& .MuiDataGrid-overlayWrapperInner": {
    height: "100% !important",
    position: "relative",
  },
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function ProductTable({
  data,
  isLoading,
  error,
  updateInventory,
}) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [stock, setStock] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const allRows = useMemo(() => {
    if (!data?.data?.products) return [];
    return data.data.products.flatMap((item) =>
      item.variants.map((variant) => ({
        id: variant.variant_id,
        productDetails: item.description,
        skuId: variant.sku,
        businessTag: item.businessTag || "",
        QtyInStock: variant.variant_stock || 0,
        transferPrice: item.transferPrice || 0,
        appPrice: variant.variant_price || 0,
        autoShipment: item.autoShipment ? "Yes" : "No",
        volumetricWeightAndDimensions: item.volumetricWeightAndDimensions || 0,
        deadWeight: item.deadWeight || 0,
      })),
    );
  }, [data?.data?.products]);

  const total = allRows.length;

  // Slice rows for current page
  const paginatedRows = useMemo(
    () => allRows.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [allRows, page, rowsPerPage],
  );

  const handleSave = async () => {
    let action = "";
    let quantity = Math.abs(stock - selectedRow.QtyInStock);
    if (stock > selectedRow.QtyInStock) action = "add";
    else if (stock < selectedRow.QtyInStock) action = "deduct";
    else return;
    await updateInventory({ sku: selectedRow.skuId, quantity, action });
    setOpen(false);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setStock(row.QtyInStock);
    setOpen(true);
  };

  const columns = [
    { field: "productDetails", headerName: "Product Details", width: 150 },
    { field: "skuId", headerName: "SKU ID", width: 130 },
    { field: "businessTag", headerName: "Business Tag", width: 130 },
    {
      field: "QtyInStock",
      headerName: "Qty In Stock",
      type: "number",
      width: 120,
    },
    { field: "transferPrice", headerName: "Transfer Price", width: 130 },
    { field: "appPrice", headerName: "App Price", width: 120 },
    { field: "autoShipment", headerName: "Auto Shipment", width: 140 },
    {
      field: "volumetricWeightAndDimensions",
      headerName: "Volumetric Weight & Dim",
      width: 200,
    },
    { field: "deadWeight", headerName: "Dead Weight", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <GradientButton size="small" onClick={() => handleEdit(params.row)}>
            Edit
          </GradientButton>
        </Box>
      ),
    },
  ];

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "220px",
          gap: "12px",
        }}
      >
        <CircularProgress sx={{ color: "#0097b2" }} />
        <span style={{ color: "#0097b2", fontSize: "0.9rem", fontWeight: 500 }}>
          Loading products…
        </span>
      </Box>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "120px",
          color: "#e53935",
          fontSize: "0.9rem",
          fontWeight: 500,
        }}
      >
        ⚠️ Error loading products
      </Box>
    );
  }

  // ── Table ───────────────────────────────────────────────────────────────────
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "16px",
          border: "1.5px solid #e0f4f7",
          boxShadow: "0 2px 16px rgba(0,151,178,0.08)",
          // Fixed height when empty so overlay is visible
          height: total === 0 ? 280 : "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DataGrid
          rows={paginatedRows}
          columns={columns}
          // Disable built-in pagination — we manage it ourselves
          hideFooterPagination
          hideFooter
          checkboxSelection
          disableRowSelectionOnClick
          // Only autoHeight when rows exist
          autoHeight={total > 0}
          slots={{ noRowsOverlay: NoRowsOverlay }}
          sx={{ ...dataGridSx, flex: 1 }}
        />

        {/* Custom pagination bar — always rendered, even when empty */}
        <TablePagination
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(val) => {
            setRowsPerPage(val);
            setPage(1);
          }}
        />
      </Paper>

      {/* Edit Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            border: "1.5px solid #e0f4f7",
            boxShadow: "0 8px 40px rgba(0,151,178,0.15)",
            minWidth: 360,
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: GRADIENT,
            color: "#fff",
            fontWeight: 700,
            fontSize: "1rem",
            py: 2,
            px: 3,
          }}
        >
          ✏️ Edit Inventory
        </DialogTitle>

        <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
          <Box
            sx={{
              background: "#f0fafc",
              border: "1.5px solid #d0eef3",
              borderRadius: "10px",
              padding: "10px 14px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: "#0097b2",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              SKU
            </span>
            <span
              style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a" }}
            >
              {selectedRow?.skuId || "—"}
            </span>
          </Box>

          <TextField
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "&:hover fieldset": { borderColor: "#0097b2" },
                "&.Mui-focused fieldset": {
                  borderColor: "#0097b2",
                  boxShadow: "0 0 0 3px rgba(0,151,178,0.12)",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#0097b2" },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2.5, gap: 1 }}>
          <GradientButton secondary onClick={() => setOpen(false)}>
            Cancel
          </GradientButton>
          <GradientButton onClick={handleSave}>Save Changes</GradientButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
