import profileImg from "../assets/images/profileImg.svg";
const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">
          What Do Other Dropshippers Say?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex gap-2">
              <img
                src={profileImg}
                alt="Customer 1"
                className="w-16 h-16 rounded-full mb-4"
              />
              <div className="display-flex flex-col">
                <h4>Jenny Wilson</h4>
                <p className="text-gray-500">CEO, TechCorp</p>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              "Unicsi transformed our supply chain management. Their solutions
              are top-notch!"
            </p>
            <div className="text-sm text-gray-500">
              - John Doe, CEO of Acme Corp
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
                   <div className="flex gap-2">
              <img
                src={profileImg}
                alt="Customer 1"
                className="w-16 h-16 rounded-full mb-4"
              />
              <div className="display-flex flex-col">
                <h4>Jenny Wilson</h4>
                <p className="text-gray-500">CEO, TechCorp</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              "The team at Unicsi is incredibly knowledgeable and responsive.
              Highly recommend!"
            </p>
            <div className="text-sm text-gray-500">
              - Jane Smith, Operations Manager at Beta Inc
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
