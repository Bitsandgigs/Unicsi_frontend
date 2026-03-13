import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const areaData = [
  { date: "13 Aug", orders: 0, gmv: 0 },
  { date: "14 Aug", orders: 0, gmv: 0 },
  { date: "15 Aug", orders: 0, gmv: 0 },
  { date: "16 Aug", orders: 0, gmv: 0 },
  { date: "17 Aug", orders: 0, gmv: 0 },
  { date: "18 Aug", orders: 0, gmv: 0 },
  { date: "19 Aug", orders: 0, gmv: 0 },
  { date: "20 Aug", orders: 0, gmv: 0 },
];

const barData = [
  { date: "12 Aug", value: 0 },
  { date: "13 Aug", value: 0 },
  { date: "14 Aug", value: 0 },
  { date: "15 Aug", value: 0 },
  { date: "16 Aug", value: 0 },
  { date: "17 Aug", value: 0 },
  { date: "18 Aug", value: 0 },
  { date: "19 Aug", value: 0 },
  { date: "20 Aug", value: 0 },
  { date: "21 Aug", value: 0 },
  { date: "22 Aug", value: 0 },
  { date: "23 Aug", value: 0 },
  { date: "24 Aug", value: 0 },
  { date: "25 Aug", value: 0 },
  { date: "26 Aug", value: 0 },
  { date: "27 Aug", value: 0 },
  { date: "28 Aug", value: 0 },
  { date: "29 Aug", value: 0 },
  { date: "30 Aug", value: 0 },
  { date: "31 Aug", value: 0 },
  { date: "1 Sep", value: 0 },
  { date: "2 Sep", value: 0 },
  { date: "3 Sep", value: 0 },
  { date: "4 Sep", value: 0 },
  { date: "5 Sep", value: 0 },
  { date: "6 Sep", value: 0 },
];

const lineData = [
  { time: "12 AM", value: 0 },
  { time: "4 AM", value: 0 },
  { time: "8 AM", value: 0 },
  { time: "12 PM", value: 0 },
  { time: "4 PM", value: 0 },
  { time: "8 PM", value: 0 },
  { time: "11 PM", value: 0 },
];

// ── Custom Tooltip ────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#fff",
        border: "1.5px solid #e0f4f7",
        borderRadius: "10px",
        padding: "10px 14px",
        boxShadow: "0 4px 16px rgba(0,151,178,0.12)",
        fontSize: "0.78rem",
      }}
    >
      <p style={{ fontWeight: 700, color: "#000", marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, margin: "2px 0", fontWeight: 600 }}>
          {p.name}: {p.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

// ── Stat badge ────────────────────────────────────────────────────────────────
function StatBadge({ value, label, up = true }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: up ? "rgba(126,217,87,0.15)" : "rgba(229,57,53,0.1)",
        border: `1px solid ${up ? "rgba(126,217,87,0.4)" : "rgba(229,57,53,0.3)"}`,
        color: up ? "#2e7d1e" : "#c62828",
        fontSize: "0.72rem",
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: "20px",
      }}
    >
      {up ? "↑" : "↓"} {value}
    </span>
  );
}

// ── Orders & GMV ─────────────────────────────────────────────────────────────
function OrdersAndGMVCard() {
  return (
    <div
      style={{
        border: "1.5px solid #e0f4f7",
        borderRadius: "16px",
        background: "#fff",
        padding: "16px",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        boxShadow: "0 2px 12px rgba(0,151,178,0.07)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0097b2" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#0097b2" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradGMV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7ed957" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#7ed957" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#000" }}>
          Orders & GMV
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#0097b2",
                  display: "inline-block",
                }}
              />
              Orders
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#7ed957",
                  display: "inline-block",
                }}
              />
              GMV
            </span>
          </div>
          <div
            style={{
              padding: "4px 10px",
              border: "1px solid #e0f4f7",
              borderRadius: "8px",
              fontSize: "0.75rem",
              color: "#555",
              fontWeight: 500,
            }}
          >
            Jan 2025 – Dec 2025
          </div>
        </div>
      </div>

      {/* Stat */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontSize: "1.8rem",
            fontWeight: 800,
            color: "#000",
            letterSpacing: "-0.02em",
          }}
        >
          0
        </span>
        <StatBadge value="0%" up />
      </div>

      {/* Chart */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={areaData}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="aOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0097b2" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#0097b2" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="aGMV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7ed957" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#7ed957" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8f6f9" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#888" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#888" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#0097b2"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#aOrders)"
              dot={false}
              activeDot={{ r: 4, fill: "#0097b2" }}
            />
            <Area
              type="monotone"
              dataKey="gmv"
              stroke="#7ed957"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#aGMV)"
              dot={false}
              activeDot={{ r: 4, fill: "#7ed957" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Margin Applied % ──────────────────────────────────────────────────────────
function MarginAppliedCard() {
  return (
    <div
      style={{
        border: "1.5px solid #e0f4f7",
        borderRadius: "16px",
        background: "#fff",
        padding: "14px",
        height: 200,
        boxSizing: "border-box",
        boxShadow: "0 2px 12px rgba(0,151,178,0.07)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        style={{
          fontWeight: 700,
          fontSize: "0.85rem",
          color: "#000",
          marginBottom: 6,
        }}
      >
        Margin Applied %
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#000" }}>
          0
        </span>
        <StatBadge value="As a % of GMV" up />
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barData}
            margin={{ top: 0, right: 0, left: -28, bottom: 0 }}
            barSize={5}
          >
            <XAxis dataKey="date" hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#0097b2" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Total Orders ──────────────────────────────────────────────────────────────
function TotalOrdersCard() {
  return (
    <div
      style={{
        border: "1.5px solid #e0f4f7",
        borderRadius: "16px",
        background: "#fff",
        padding: "14px",
        height: 200,
        boxSizing: "border-box",
        boxShadow: "0 2px 12px rgba(0,151,178,0.07)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        style={{
          fontWeight: 700,
          fontSize: "0.85rem",
          color: "#000",
          marginBottom: 6,
        }}
      >
        Total Orders
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#000" }}>
          0
        </span>
        <StatBadge value="0%" up />
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={lineData}
            margin={{ top: 0, right: 0, left: -28, bottom: 0 }}
          >
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: "#888" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0097b2"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: "#0097b2" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Dashboard Layout ──────────────────────────────────────────────────────────
export default function DashboardChart() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: 12,
        height: 420,
      }}
    >
      <OrdersAndGMVCard />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <MarginAppliedCard />
        <TotalOrdersCard />
      </div>
    </div>
  );
}
