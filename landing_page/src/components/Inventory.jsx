import inventory1 from "../assets/images/inventory1.svg";
import inventory2 from "../assets/images/inventory2.svg";
const Inventory = () => {
  return (
    <div
      className=""
      style={{
        height: "571.46px",
        width: "100%",
        backgroundColor: "lightblue",
        display: "flex",
      }}
    >
      <div style={{ width: "50%", backgroundColor: "yellow", display: "flex" }}>
        <div>
          <img src={inventory1} alt="image" />
          <p>Image Description</p>
        </div>
        <div
          style={{
            alignItems: "flex-end",
            display: "flex",
            height: "100%",
            backgroundColor: "purple",
          }}
        >
          <img src={inventory2} alt="image" />
        </div>
      </div>

    <div
  style={{
    width: "50%",
    backgroundColor: "green",
    border: "5px solid red",
    display: "flex",
    justifyContent: "space-between", // fixed typo here
    flexDirection: "column",
    //   padding: "20px",
  }}
>
  <div>
    <h1 className="text-5xl">Top India-Based <br/>Inventory</h1>
  </div>
  <div style={{ border: "2px solid red", padding: "40px" }}>
    <p>
      90% of products are stocked in U.S. warehouses, and our suppliers
      include top 500 U.S. brands for fast, reliable fulfillment. 90% of
      products are stocked in U.S. warehouses, and our suppliers
      include top 500 U.S. brands for fast, reliable fulfillment.
    </p>
  </div>
  <div>
    <h1>Top India-Based Inventory</h1>
  </div>
  <div>
    <p>Already Running a Store?​</p>
  </div>
</div>
    </div>
  );
};

export default Inventory;
