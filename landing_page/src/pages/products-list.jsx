"use client";
import { useState } from "react";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Paper,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit, Trash2, Copy, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product/product.service";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

function GradientButton({
  children,
  onClick,
  secondary = false,
  danger = false,
  size = "medium",
  startIcon,
  as: As,
  to,
  disabled = false,
}) {
  const [hovered, setHovered] = useState(false);
  const pad = size === "small" ? "6px 14px" : "9px 22px";
  const fontSize = size === "small" ? "0.8rem" : "0.875rem";
  const isHovered = hovered && !disabled;

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: pad,
    borderRadius: "9px",
    fontSize,
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    whiteSpace: "nowrap",
    textDecoration: "none",
    transition: "all 0.2s ease",
    border: "none",
    opacity: disabled ? 0.45 : 1,
    ...(danger
      ? {
          background: isHovered ? "#c62828" : "transparent",
          color: isHovered ? "#fff" : "#e53935",
          border: "1.5px solid #e53935",
          boxShadow: "none",
        }
      : secondary
        ? {
            background: isHovered ? GRADIENT : "transparent",
            color: isHovered ? "#fff" : "#0097b2",
            border: "1.5px solid #0097b2",
            boxShadow: "none",
          }
        : {
            background: isHovered ? GRADIENT_HOVER : GRADIENT,
            color: "#fff",
            boxShadow: isHovered
              ? "0 4px 14px rgba(0,151,178,0.3)"
              : "0 2px 8px rgba(0,151,178,0.2)",
          }),
  };

  const iconColor = isHovered
    ? "#fff"
    : danger
      ? "#e53935"
      : secondary
        ? "#0097b2"
        : "#fff";

  const inner = (
    <>
      {startIcon && (
        <span style={{ display: "flex", alignItems: "center" }}>
          {typeof startIcon === "function" ? startIcon(iconColor) : startIcon}
        </span>
      )}
      {children}
    </>
  );

  if (As && to) {
    return (
      <As
        to={to}
        style={baseStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inner}
      </As>
    );
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={baseStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </button>
  );
}

// ── Pagination Component ──────────────────────────────────────────────────────
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

  // Build page number buttons — show max 5 page pills
  function getPageNumbers() {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
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
        borderRadius: "0 0 16px 16px",
        flexWrap: "wrap",
        gap: 1.5,
      }}
    >
      {/* Left: rows info + rows-per-page selector */}
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

      {/* Right: page navigation */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {/* Prev */}
        <PaginationBtn
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          icon={<ChevronLeft size={15} />}
        />

        {/* First page + ellipsis */}
        {showLeftEllipsis && (
          <>
            <PaginationBtn
              label={1}
              active={false}
              onClick={() => onPageChange(1)}
            />
            <EllipsisDot />
          </>
        )}

        {/* Page numbers */}
        {pages.map((p) => (
          <PaginationBtn
            key={p}
            label={p}
            active={p === page}
            onClick={() => onPageChange(p)}
          />
        ))}

        {/* Last page + ellipsis */}
        {showRightEllipsis && (
          <>
            <EllipsisDot />
            <PaginationBtn
              label={totalPages}
              active={false}
              onClick={() => onPageChange(totalPages)}
            />
          </>
        )}

        {/* Next */}
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
  const isActive = active;
  const isDisabled = disabled;

  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: 32,
        height: 32,
        borderRadius: "8px",
        border: isActive ? "none" : "1.5px solid #d0eef3",
        background: isActive
          ? GRADIENT
          : hovered && !isDisabled
            ? "rgba(0,151,178,0.08)"
            : "#fff",
        color: isActive
          ? "#fff"
          : isDisabled
            ? "#bbb"
            : hovered
              ? "#0097b2"
              : "#444",
        fontSize: "0.82rem",
        fontWeight: isActive ? 700 : 500,
        cursor: isDisabled ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.18s ease",
        boxShadow: isActive ? "0 2px 8px rgba(0,151,178,0.25)" : "none",
        padding: "0 6px",
      }}
    >
      {icon || label}
    </button>
  );
}

function EllipsisDot() {
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

// ── Shared page shell ─────────────────────────────────────────────────────────
function PageShell({ children, showAddBtn = false }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4fbfc", py: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 0.5,
                color: "#000",
                letterSpacing: "-0.02em",
              }}
            >
              Products
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#555", fontSize: "0.9rem" }}
            >
              Manage your products, drafts, and submissions
            </Typography>
          </Box>
          {showAddBtn && (
            <Link to="/products/add" style={{ textDecoration: "none" }}>
              <GradientButton>+ Add New Product</GradientButton>
            </Link>
          )}
        </Box>
        {children}
      </Container>
    </Box>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ProductsList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const allProducts = productData?.data?.products ?? [];
  const total = allProducts.length;

  // Slice for current page
  const paginatedProducts = allProducts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const handleDelete = () => {
    if (selectedProduct) {
      setOpenDialog(false);
      setSelectedProduct(null);
    }
  };

  const handleClone = (product) => {
    alert("Product cloned successfully!");
  };

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <PageShell>
        <Paper
          elevation={0}
          sx={{
            p: 8,
            textAlign: "center",
            border: "1.5px solid #e0f4f7",
            borderRadius: "16px",
            bgcolor: "#fff",
          }}
        >
          <CircularProgress sx={{ color: "#0097b2", mb: 2 }} />
          <Typography sx={{ color: "#555", fontSize: "0.95rem" }}>
            Loading products…
          </Typography>
        </Paper>
      </PageShell>
    );
  }

  // ── Empty ───────────────────────────────────────────────────────────────────
  if (total === 0) {
    return (
      <PageShell>
        <Paper
          elevation={0}
          sx={{
            p: 8,
            textAlign: "center",
            border: "2px dashed #b8e8f0",
            borderRadius: "16px",
            bgcolor: "#f8fdfe",
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: GRADIENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
              boxShadow: "0 4px 16px rgba(0,151,178,0.2)",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </Box>
          <Typography
            sx={{
              color: "#1a1a1a",
              fontWeight: 700,
              fontSize: "1.1rem",
              mb: 0.5,
            }}
          >
            No products yet
          </Typography>
          <Typography sx={{ color: "#777", mb: 3, fontSize: "0.9rem" }}>
            Create your first product to get started
          </Typography>
          <Link to="/products/add" style={{ textDecoration: "none" }}>
            <GradientButton>+ Add New Product</GradientButton>
          </Link>
        </Paper>
      </PageShell>
    );
  }

  // ── Main list ───────────────────────────────────────────────────────────────
  return (
    <PageShell showAddBtn>
      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: "1.5px solid #e0f4f7",
          overflow: "hidden",
          boxShadow: "0 2px 16px rgba(0,151,178,0.08)",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: GRADIENT }}>
                {[
                  "Product Title",
                  "Brand",
                  "Variants",
                  "Status",
                  "Created",
                  "Actions",
                ].map((h) => (
                  <TableCell
                    key={h}
                    align={h === "Actions" ? "right" : "left"}
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "#ffffff !important",
                      borderBottom: "none",
                      py: 1.8,
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedProducts.map((product, idx) => (
                <TableRow
                  key={product.id}
                  sx={{
                    bgcolor: idx % 2 === 0 ? "#ffffff" : "#f8fdfe",
                    "&:hover": { bgcolor: "#edf8fb" },
                    transition: "background 0.15s ease",
                    // Remove bottom border on last row so pagination bar sits flush
                    "&:last-child td": { borderBottom: "none" },
                  }}
                >
                  <TableCell
                    sx={{ fontWeight: 600, color: "#000", fontSize: "0.9rem" }}
                  >
                    {product.title}
                  </TableCell>
                  <TableCell sx={{ color: "#333", fontSize: "0.875rem" }}>
                    {product.brand}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,151,178,0.1)",
                        color: "#0097b2",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        borderRadius: "20px",
                        px: 1.5,
                        py: 0.3,
                        minWidth: 28,
                      }}
                    >
                      {product.variants?.length || 0}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.status === "draft" ? "Draft" : "Submitted"}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        ...(product.status === "draft"
                          ? {
                              bgcolor: "rgba(255,160,0,0.1)",
                              color: "#e65100",
                              border: "1px solid rgba(230,81,0,0.3)",
                            }
                          : {
                              bgcolor: "rgba(0,151,178,0.1)",
                              color: "#0097b2",
                              border: "1px solid rgba(0,151,178,0.3)",
                            }),
                      }}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#555", fontSize: "0.85rem" }}>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ justifyContent: "flex-end" }}
                    >
                      <Link
                        to={`/edit-product/${product?.product_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <GradientButton
                          size="small"
                          secondary
                          startIcon={(color) => (
                            <Edit size={13} color={color} />
                          )}
                        />
                      </Link>
                      <GradientButton
                        size="small"
                        secondary
                        startIcon={(color) => <Copy size={13} color={color} />}
                        onClick={() => handleClone(product)}
                      />
                      <GradientButton
                        size="small"
                        danger
                        startIcon={(color) => (
                          <Trash2 size={13} color={color} />
                        )}
                        onClick={() => {
                          setSelectedProduct(product.id);
                          setOpenDialog(true);
                        }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ── Pagination Bar ── */}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
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
            background: "linear-gradient(135deg, #e53935 0%, #ef9a9a 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1rem",
            py: 2,
            px: 3,
          }}
        >
          🗑️ Delete Product
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
          <Typography
            sx={{ color: "#333", fontSize: "0.9rem", lineHeight: 1.6 }}
          >
            Are you sure you want to delete this product? This action{" "}
            <strong>cannot be undone</strong>.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2.5, gap: 1 }}>
          <GradientButton secondary onClick={() => setOpenDialog(false)}>
            Cancel
          </GradientButton>
          <GradientButton danger onClick={handleDelete}>
            Yes, Delete
          </GradientButton>
        </DialogActions>
      </Dialog>
    </PageShell>
  );
}
