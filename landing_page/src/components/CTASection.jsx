import inventory from '../assets/images/inventory.svg'
const CTASection = () => {
  return (
    <div
      className=""
      style={{ height: "547px", width: "100%", backgroundColor: "lightblue", display: "flex",  }}
    >
      <div style={{ width: "50%", backgroundColor: "green", }}>
        <div style={{  display: "flex", width: "80%", justifyContent: "flex-end", border: "5px solid green" }}>
          <div >
            <div style={{ border: "2px solid red", padding:"40px" }}>
              <p>Call to Action</p>
              <h2>Ready to get started?</h2>
            </div>
            <div style={{ border: "2px solid red", padding:"40px" }}>
              <p>Call to Action</p>
              <button>Ready to get started?</button>
            </div>
          </div>
          <div>
            <div style={{ border: "2px solid red", padding:"40px" }}>
              <p>Call to Action</p>
              <h2>Ready to get started?</h2>
            </div>
            <div style={{ border: "2px solid red", padding:"40px"  }}>
              <p>Call to Action</p>
              <h2>Ready to get started?</h2>
            </div>
          </div>
        </div>
        <p>Already Running a Store?​</p>
      </div>



      <div style={{ width: "50%", backgroundColor: "yellow", display: "flex", }}>
        <div >
            <img src={inventory} alt="image" />
            <p>Image Description</p>
        </div>
        <div style={{ alignItems: "flex-end", display : "flex", height: "100%", backgroundColor: "purple" }}>
            <img src={inventory} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default CTASection;
