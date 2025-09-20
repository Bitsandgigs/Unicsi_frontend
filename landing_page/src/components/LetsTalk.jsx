import call from "../assets/images/call.svg"
const LetsTalk = () => {
  return (
<section className="bg-gray-100 py-12">
  <div className="container mx-auto relative rounded-xl overflow-hidden">
    {/* Background Image */}
    <img
      src={call}
      alt="Call Icon"
      className="w-full h-64 object-cover" // set height and cover image
    />

    {/* Overlay Content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center  px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Join millions of dropshippers who are making <br /> money easily.
      </h2>
      <button className="bg-orange-700 hover:bg-orange-800 text-white font-semibold px-12 py-3 rounded-full flex items-center gap-2">
        Get Started →
      </button>
    </div>
  </div>
</section>


  );
};

export default LetsTalk;
