"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Chip,
  FormControlLabel,
  Checkbox,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Trash2, Upload, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import {
  addProduct,
  updateProduct,
  getSingleProduct,
} from "../services/product/product.service";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

// ── Shared button ─────────────────────────────────────────────────────────────
function GradientButton({
  children,
  onClick,
  secondary = false,
  danger = false,
  size = "medium",
  startIcon,
  fullWidth = false,
  type = "button",
}) {
  const [hovered, setHovered] = useState(false);
  const pad = size === "small" ? "7px 16px" : "10px 24px";
  const fontSize = size === "small" ? "0.82rem" : "0.875rem";

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "7px",
        padding: pad,
        borderRadius: "10px",
        fontSize,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.2s ease",
        width: fullWidth ? "100%" : "auto",
        ...(danger
          ? {
              background: hovered ? "#c62828" : "transparent",
              color: hovered ? "#fff" : "#e53935",
              border: "1.5px solid #e53935",
              boxShadow: "none",
            }
          : secondary
            ? {
                background: hovered ? GRADIENT : "transparent",
                color: hovered ? "#fff" : "#0097b2",
                border: "1.5px solid #0097b2",
                boxShadow: "none",
              }
            : {
                background: hovered ? GRADIENT_HOVER : GRADIENT,
                color: "#fff",
                border: "none",
                boxShadow: hovered
                  ? "0 4px 14px rgba(0,151,178,0.3)"
                  : "0 2px 8px rgba(0,151,178,0.18)",
              }),
      }}
    >
      {startIcon && (
        <span style={{ display: "flex", alignItems: "center" }}>
          {startIcon}
        </span>
      )}
      {children}
    </button>
  );
}

// ── Styled TextField wrapper ──────────────────────────────────────────────────
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    background: "#fff",
    "&:hover fieldset": { borderColor: "#0097b2" },
    "&.Mui-focused fieldset": {
      borderColor: "#0097b2",
      boxShadow: "0 0 0 3px rgba(0,151,178,0.1)",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0097b2" },
  "& .MuiInputBase-input": { color: "#000" },
};

export default function AddProductForm({ initialProduct, onSuccess }) {
  const params = useParams();
  const productId = params.product_id;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    category_id: "",
    approval_status: "draft",
    productGallery: [],
    variants: [],
  });
  const [expandedVariant, setExpandedVariant] = useState(null);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product?.data?.title,
        description: product?.data?.description,
        brand: product?.data?.brand,
        category_id: product?.data?.category_id,
        approval_status: product?.data?.approval_status,
        productGallery: product?.data?.images,
        variants: product?.data?.variants,
      });
    }
  }, [product]);

  const handleProductChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          sku: "",
          variant_name: "",
          variant_price: 0,
          variant_stock: 0,
          attributes: { color: "", size: "" },
          weight_grams: 0,
          hsn_code: "",
          is_active: true,
          dimensions_cm: { l: 0, w: 0, h: 0 },
        },
      ],
    }));
  };

  const updateVariant = (id, field, value) =>
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.variant_id === id ? { ...v, [field]: value } : v,
      ),
    }));

  const updateVariantAttribute = (id, attribute, value) =>
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.id === id
          ? { ...v, attributes: { ...v.attributes, [attribute]: value } }
          : v,
      ),
    }));

  const updateVariantDimension = (id, dimension, value) =>
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.id === id
          ? { ...v, dimensions_cm: { ...v.dimensions_cm, [dimension]: value } }
          : v,
      ),
    }));

  const removeVariant = (id) =>
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((v) => v.id !== id),
    }));

  const handleProductImageUpload = (files) => {
    if (files) {
      setFormData((prev) => ({
        ...prev,
        productGallery: [...prev.productGallery, ...Array.from(files)],
      }));
    }
  };

  const removeProductImage = (index) =>
    setFormData((prev) => ({
      ...prev,
      productGallery: prev.productGallery.filter((_, i) => i !== index),
    }));

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      approval_status: "draft",
      id: formData.id || Date.now().toString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      await addProduct(payload);
      toast.success("Product saved as draft successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to save draft");
    }
    onSuccess?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.variants.length === 0) {
      toast.error("Please add at least one variant");
      return;
    }
    const payload = {
      ...formData,
      approval_status: "submitted",
      id: formData.id || Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    const productData = new FormData();
    productData.append("title", payload.title);
    productData.append("description", payload.description);
    productData.append("brand", payload.brand);
    productData.append("category_id", payload.category_id);
    productData.append("approval_status", payload.approval_status);
    productData.append("variants", JSON.stringify(payload.variants));
    if (payload.productGallery?.length > 0)
      payload.productGallery.forEach((f) => productData.append("images", f));
    try {
      if (productId) await updateProduct(productId, productData);
      else await addProduct(productData);
      toast.success(
        productId
          ? "Product updated successfully"
          : "Product submitted successfully",
      );
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit product");
      return;
    }
    setFormData({
      title: "",
      description: "",
      brand: "",
      category_id: "",
      approval_status: "draft",
      productGallery: [],
      variants: [],
    });
    onSuccess?.();
    navigate("/products");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f4fbfc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress sx={{ color: "#0097b2", mb: 2 }} />
          <Typography sx={{ color: "#0097b2", fontWeight: 500 }}>
            Loading product…
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4fbfc", py: 4 }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
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
            {productId ? "Edit Product" : "Add New Product"}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#555", fontSize: "0.9rem" }}
          >
            {productId
              ? "Update your product details and variants"
              : "Create a new product with variants and specifications"}
          </Typography>
        </Box>

        <form>
          <Paper
            elevation={0}
            sx={{
              borderRadius: "18px",
              border: "1.5px solid #e0f4f7",
              overflow: "hidden",
              boxShadow: "0 2px 20px rgba(0,151,178,0.08)",
            }}
          >
            {/* ── Custom Tab Bar ── */}
            <Box
              sx={{
                display: "flex",
                borderBottom: "1.5px solid #e0f4f7",
                bgcolor: "#f8fdfe",
              }}
            >
              {["Product Details", "Variants"].map((label, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    style={{
                      flex: 1,
                      padding: "16px 24px",
                      fontSize: "0.9rem",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#0097b2" : "#666",
                      background: "transparent",
                      border: "none",
                      borderBottom: isActive
                        ? "3px solid #0097b2"
                        : "3px solid transparent",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      letterSpacing: isActive ? "0.01em" : "normal",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: isActive ? GRADIENT : "#e0e0e0",
                          color: "#fff",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {idx + 1}
                      </span>
                      {label}
                    </span>
                  </button>
                );
              })}
            </Box>

            {/* ── Product Details Tab ── */}
            {activeTab === 0 && (
              <Box sx={{ p: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Product Title"
                      placeholder="e.g., Cotton pajama"
                      value={formData.title}
                      onChange={(e) =>
                        handleProductChange("title", e.target.value)
                      }
                      required
                      variant="outlined"
                      sx={fieldSx}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Brand"
                      placeholder="e.g., UrbanWear"
                      value={formData.brand}
                      onChange={(e) =>
                        handleProductChange("brand", e.target.value)
                      }
                      variant="outlined"
                      sx={fieldSx}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Category ID"
                      placeholder="b2f5b1c9-9c22-..."
                      value={formData.category_id}
                      onChange={(e) =>
                        handleProductChange("category_id", e.target.value)
                      }
                      variant="outlined"
                      sx={fieldSx}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      placeholder="Premium cotton t-shirt for daily wear"
                      value={formData.description}
                      onChange={(e) =>
                        handleProductChange("description", e.target.value)
                      }
                      variant="outlined"
                      multiline
                      rows={5}
                      sx={fieldSx}
                    />
                  </Grid>

                  {/* Image Upload */}
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, mb: 1.5, color: "#000" }}
                    >
                      Product Gallery
                    </Typography>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleProductImageUpload(e.target.files)}
                      style={{ display: "none" }}
                      id="product-image-upload"
                    />
                    <label
                      htmlFor="product-image-upload"
                      style={{ display: "block", cursor: "pointer" }}
                    >
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 4,
                          textAlign: "center",
                          border: "2px dashed #b8e8f0",
                          borderRadius: "14px",
                          bgcolor: "#f8fdfe",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "#0097b2",
                            bgcolor: "#edf8fb",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "12px",
                            background: GRADIENT,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 1.5,
                          }}
                        >
                          <Upload size={22} color="#fff" />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "#555", mb: 0.5, fontWeight: 500 }}
                        >
                          Drag and drop images or click to upload
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#999" }}>
                          PNG, JPG, WEBP up to 10MB
                        </Typography>
                      </Paper>
                    </label>

                    {formData.productGallery.length > 0 && (
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}
                      >
                        {formData.productGallery.map((img, idx) => (
                          <Chip
                            key={idx}
                            label={img.name || `Image ${idx + 1}`}
                            size="small"
                            onDelete={() => removeProductImage(idx)}
                            sx={{
                              bgcolor: "rgba(0,151,178,0.08)",
                              color: "#0097b2",
                              border: "1px solid rgba(0,151,178,0.25)",
                              fontWeight: 500,
                              "& .MuiChip-deleteIcon": { color: "#0097b2" },
                            }}
                          />
                        ))}
                      </Stack>
                    )}
                  </Grid>
                </Grid>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 4, justifyContent: "flex-end" }}
                >
                  <GradientButton secondary onClick={handleSaveDraft}>
                    Save as Draft
                  </GradientButton>
                  <GradientButton onClick={() => setActiveTab(1)}>
                    Continue to Variants →
                  </GradientButton>
                </Stack>
              </Box>
            )}

            {/* ── Variants Tab ── */}
            {activeTab === 1 && (
              <Box sx={{ p: 4 }}>
                {formData.variants.length === 0 ? (
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 6,
                      textAlign: "center",
                      border: "2px dashed #b8e8f0",
                      borderRadius: "14px",
                      bgcolor: "#f8fdfe",
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "14px",
                        background: GRADIENT,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <Plus size={26} color="#fff" />
                    </Box>
                    <Typography
                      sx={{
                        color: "#1a1a1a",
                        fontWeight: 700,
                        fontSize: "1rem",
                        mb: 0.5,
                      }}
                    >
                      No variants yet
                    </Typography>
                    <Typography
                      sx={{ color: "#777", fontSize: "0.875rem", mb: 3 }}
                    >
                      Add product variants like size, color, and stock
                    </Typography>
                    <GradientButton
                      startIcon={<Plus size={15} />}
                      onClick={addVariant}
                    >
                      Add First Variant
                    </GradientButton>
                  </Paper>
                ) : (
                  <Stack spacing={2}>
                    {formData.variants.map((variant, index) => {
                      const isExpanded = expandedVariant === variant.variant_id;
                      return (
                        <Card
                          key={variant.variant_id}
                          elevation={0}
                          sx={{
                            overflow: "hidden",
                            border: isExpanded
                              ? "1.5px solid #0097b2"
                              : "1.5px solid #e0f4f7",
                            borderRadius: "14px",
                            transition: "border-color 0.2s",
                            boxShadow: isExpanded
                              ? "0 2px 16px rgba(0,151,178,0.1)"
                              : "none",
                          }}
                        >
                          {/* Variant Header */}
                          <Box
                            onClick={() =>
                              setExpandedVariant(
                                isExpanded ? null : variant.variant_id,
                              )
                            }
                            sx={{
                              bgcolor: isExpanded
                                ? "rgba(0,151,178,0.04)"
                                : "#fafafa",
                              p: 2,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              cursor: "pointer",
                              "&:hover": { bgcolor: "rgba(0,151,178,0.06)" },
                              transition: "background 0.15s",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: "8px",
                                  background: GRADIENT,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#fff",
                                  fontWeight: 700,
                                  fontSize: "0.8rem",
                                  flexShrink: 0,
                                }}
                              >
                                {index + 1}
                              </Box>
                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    fontWeight: 600,
                                    color: "#000",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  Variant {index + 1}
                                  {variant.variant_name &&
                                    ` — ${variant.variant_name}`}
                                </Typography>
                                {variant.sku && (
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "#0097b2", fontWeight: 500 }}
                                  >
                                    SKU: {variant.sku}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              {variant.is_active && (
                                <Chip
                                  label="Active"
                                  size="small"
                                  sx={{
                                    bgcolor: "rgba(126,217,87,0.15)",
                                    color: "#3a8a1e",
                                    border: "1px solid rgba(126,217,87,0.4)",
                                    fontWeight: 600,
                                    fontSize: "0.72rem",
                                  }}
                                />
                              )}
                              <Box
                                sx={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: "8px",
                                  bgcolor: isExpanded ? GRADIENT : "#e0f4f7",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  transition: "all 0.2s",
                                }}
                              >
                                <ChevronDown
                                  size={16}
                                  color={isExpanded ? "#fff" : "#0097b2"}
                                  style={{
                                    transform: isExpanded
                                      ? "rotate(180deg)"
                                      : "rotate(0deg)",
                                    transition: "transform 0.2s",
                                  }}
                                />
                              </Box>
                            </Box>
                          </Box>

                          {/* Variant Content */}
                          {isExpanded && (
                            <CardContent
                              sx={{ pt: 3, borderTop: "1.5px solid #e0f4f7" }}
                            >
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="SKU"
                                    placeholder="TS-BLK-M"
                                    value={variant.sku}
                                    onChange={(e) =>
                                      updateVariant(
                                        variant.variant_id,
                                        "sku",
                                        e.target.value,
                                      )
                                    }
                                    size="small"
                                    sx={fieldSx}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="Variant Name"
                                    placeholder="e.g., Black Medium"
                                    value={variant.variant_name}
                                    onChange={(e) =>
                                      updateVariant(
                                        variant.variant_id,
                                        "variant_name",
                                        e.target.value,
                                      )
                                    }
                                    size="small"
                                    sx={fieldSx}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="Color"
                                    placeholder="Black"
                                    value={variant.attributes.color}
                                    onChange={(e) =>
                                      updateVariantAttribute(
                                        variant.variant_id,
                                        "color",
                                        e.target.value,
                                      )
                                    }
                                    size="small"
                                    sx={fieldSx}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="Size"
                                    placeholder="M"
                                    value={variant.attributes.size}
                                    onChange={(e) =>
                                      updateVariantAttribute(
                                        variant.variant_id,
                                        "size",
                                        e.target.value,
                                      )
                                    }
                                    size="small"
                                    sx={fieldSx}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="Price"
                                    type="number"
                                    placeholder="345"
                                    value={variant.variant_price}
                                    onChange={(e) =>
                                      updateVariant(
                                        variant.variant_id,
                                        "variant_price",
                                        parseFloat(e.target.value),
                                      )
                                    }
                                    size="small"
                                    inputProps={{ step: "0.01" }}
                                    sx={fieldSx}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="Stock"
                                    type="number"
                                    placeholder="45"
                                    value={variant.variant_stock}
                                    onChange={(e) =>
                                      updateVariant(
                                        variant.variant_id,
                                        "variant_stock",
                                        parseInt(e.target.value),
                                      )
                                    }
                                    size="small"
                                    sx={fieldSx}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="Weight (grams)"
                                    type="number"
                                    placeholder="350"
                                    value={variant.weight_grams}
                                    onChange={(e) =>
                                      updateVariant(
                                        variant.variant_id,
                                        "weight_grams",
                                        parseInt(e.target.value),
                                      )
                                    }
                                    size="small"
                                    sx={fieldSx}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="HSN Code"
                                    placeholder="6109"
                                    value={variant.hsn_code}
                                    onChange={(e) =>
                                      updateVariant(
                                        variant.variant_id,
                                        "hsn_code",
                                        e.target.value,
                                      )
                                    }
                                    size="small"
                                    sx={fieldSx}
                                  />
                                </Grid>

                                {/* Dimensions */}
                                <Grid item xs={12}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      fontWeight: 700,
                                      color: "#000",
                                      mb: 1,
                                    }}
                                  >
                                    Dimensions (cm)
                                  </Typography>
                                </Grid>
                                {[
                                  ["Length", "l", "30"],
                                  ["Width", "w", "20"],
                                  ["Height", "h", "3"],
                                ].map(([label, key, ph]) => (
                                  <Grid item xs={12} sm={4} key={key}>
                                    <TextField
                                      fullWidth
                                      label={label}
                                      type="number"
                                      placeholder={ph}
                                      value={variant.dimensions_cm[key]}
                                      onChange={(e) =>
                                        updateVariantDimension(
                                          variant.variant_id,
                                          key,
                                          parseInt(e.target.value),
                                        )
                                      }
                                      size="small"
                                      sx={fieldSx}
                                    />
                                  </Grid>
                                ))}

                                <Grid item xs={12}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={variant.is_active}
                                        onChange={(e) =>
                                          updateVariant(
                                            variant.variant_id,
                                            "is_active",
                                            e.target.checked,
                                          )
                                        }
                                        sx={{
                                          color: "#b0b0b0",
                                          "&.Mui-checked": { color: "#0097b2" },
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography
                                        sx={{
                                          fontSize: "0.875rem",
                                          fontWeight: 500,
                                          color: "#000",
                                        }}
                                      >
                                        Mark as Active
                                      </Typography>
                                    }
                                  />
                                </Grid>

                                <Grid item xs={12}>
                                  <GradientButton
                                    danger
                                    fullWidth
                                    startIcon={<Trash2 size={14} />}
                                    onClick={() =>
                                      removeVariant(variant.variant_id)
                                    }
                                  >
                                    Delete Variant
                                  </GradientButton>
                                </Grid>
                              </Grid>
                            </CardContent>
                          )}
                        </Card>
                      );
                    })}

                    <GradientButton
                      secondary
                      fullWidth
                      startIcon={<Plus size={15} />}
                      onClick={addVariant}
                    >
                      Add Another Variant
                    </GradientButton>
                  </Stack>
                )}

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 4, justifyContent: "flex-end" }}
                >
                  <GradientButton secondary onClick={() => setActiveTab(0)}>
                    ← Back to Details
                  </GradientButton>
                  <GradientButton onClick={handleSubmit}>
                    Submit Product
                  </GradientButton>
                </Stack>
              </Box>
            )}
          </Paper>
        </form>
      </Container>
    </Box>
  );
}
