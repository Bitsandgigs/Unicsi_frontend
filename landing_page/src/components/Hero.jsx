
import React, { useState } from 'react';
import { Search, Heart, Camera } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div 
      className="absolute"
      style={{
        width: '1379.9998779296927px',
        height: '930.000122070316px',
        top: '30px',
        left: '30px',
        borderBottomRightRadius: '24px',
        borderBottomLeftRadius: '24px',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        overflow: 'hidden'
      }}
    >
      {/* Background Image - Office setting with people working */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        // style={{
        //   backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900"><defs><linearGradient id="cityscape" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%2387CEEB" /><stop offset="100%" stop-color="%234169E1" /></linearGradient></defs><rect width="1400" height="900" fill="url(%23cityscape)"/><rect x="0" y="500" width="1400" height="400" fill="%23F5F5DC" opacity="0.3"/><g fill="%23708090" opacity="0.6"><rect x="100" y="200" width="80" height="300"/><rect x="200" y="150" width="60" height="350"/><rect x="280" y="180" width="90" height="320"/><rect x="400" y="120" width="70" height="380"/><rect x="500" y="160" width="85" height="340"/><rect x="600" y="100" width="75" height="400"/><rect x="700" y="140" width="95" height="360"/><rect x="820" y="110" width="80" height="390"/><rect x="920" y="170" width="70" height="330"/><rect x="1010" y="130" width="85" height="370"/><rect x="1120" y="190" width="90" height="310"/><rect x="1230" y="160" width="75" height="340"/></g></svg>')`
        // }}
        style={{
          backgroundImage: `url('../assets/images/')`
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Navigation */}
      <nav className="relative z-50 px-[32px] py-[24px] flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div className="flex space-x-6 text-white">
            <a href="#" className="hover:text-blue-300 transition-colors font-Montserrat">All Categories</a>
            <a href="#" className="hover:text-blue-300 transition-colors font-Montserrat">Solutions</a>
            <a href="#" className="hover:text-blue-300 font-medium border-b-2 border-blue-400 pb-1 font-Montserrat">Why UNICSI</a>
            <a href="#" className="hover:text-blue-300 transition-colors font-Montserrat">Pricing</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-blue-300 transition-colors font-Montserrat">Login</button>
          <button className="text-white px-6 py-2 rounded-full font-medium transition-colors font-Montserrat" style={{ backgroundColor: '#943A09', hoverBackgroundColor: '#7A2E07' }}>
            Sign up
          </button>
        </div>
      </nav>

      

      {/* Main Hero Content */}
      <div className="relative z-40 px-8 pt-[189px] pb-8 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-[2.813rem] font-bold text-white mb-6 leading-tight tracking-wide font-Montserrat">
            Fulfill Your Dropshipping
          </h1>
          <h1 className="text-6xl md:md:text-[2.813rem] font-bold text-white mb-8 leading-tight tracking-wide font-Montserrat">
            WITH UNICSI
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-white mb-12 font-medium max-w-4xl mx-auto">
            From Global Suppliers to Seamless Automation – Your Gateway to Hassle-Free Success Starts Here!
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-white/95 backdrop-blur-md rounded-full p-3 flex items-center shadow-2xl">
              <Search className="ml-6 mr-4 text-gray-500" size={22} />
              <input
                type="text"
                placeholder="Find the product you're looking for"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-lg"
              />
              <div className="flex items-center mr-3">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2">
                  <Camera className="text-gray-500" size={22} />
                  
                </button>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-3 rounded-full font-semibold text-lg transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>

          

        </div>
      </div>


      
    </div>

    
  );
};

export default Hero;