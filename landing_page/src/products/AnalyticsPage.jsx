import Pagination from "../ui/Pagination";
import ProductTable from "./ProductTable";
import Tabs from "./Tabs";
import SubTabs from "./SubTabs";
import FiltersBar from "./FiltersBar";
import AnalyticsCard from "../components/AnalyticsCard";
import DashboardChart from "../analytics/DashboardChart";

export default function AnalyticsPage() {
  return (
    <div className=" ">
      <h2 className="text-lg font-semibold mb-4 ">
        Get detailed insights about your Orders, Margins, GMV, RTO% etc.
      </h2>
      <Tabs tabItems={["Overall", "Products"]} />
      <FiltersBar type="analytics" />

      <div className="grid grid-cols-5 gap-2 mb-4">
        <AnalyticsCard
          title="Total Orders"
          value="0"
          percentage="0%"
          description="Compared to last month"
          icon="orders"
        />
        <AnalyticsCard
          title="Total Sales"
          value="₹0"
          percentage="0%"
          description="Compared to last month"
          icon="sales"
        />
        <AnalyticsCard
          title="Total Sales"
          value="₹0"
          percentage="0%"
          description="Compared to last month"
          icon="sales"
        />
        <AnalyticsCard
          title="Total Sales"
          value="₹0"
          percentage="0%"
          description="Compared to last month"
          icon="sales"
        />
        <AnalyticsCard
          title="Total Sales"
          value="₹0"
          percentage="0%"
          description="Compared to last month"
          icon="sales"
        />
      </div>

      <div className="p-4 mb-4 bg-white border rounded-lg shadow-sm">
        <DashboardChart />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <AnalyticsCard
          title="Total Orders"
          value="0"
          percentage="0%"
          description="Compared to last month"
          icon="orders"
          width="332.32757568359375px"
        />
        <AnalyticsCard
          title="Total Sales"
          value="₹0"
          percentage="0%"
          description="Compared to last month"
          icon="sales"
          height="332.32757568359375px"
        />
        <AnalyticsCard
          title="Total Sales"
          value="₹0"
          percentage="0%"
          description="Compared to last month"
          icon="sales"
          height="332.32757568359375px"
        />
      </div>

      <ProductTable
        TableHeader={[
          "Date & Time",
          "Product Details",
          "Payment",
          "Shipment Details",
          "Customer Details",
          "Delivery Attempts",
          "Actions",
        ]}
      />
      {/* <Pagination /> */}
    </div>
  );
}
