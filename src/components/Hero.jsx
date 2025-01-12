import React from 'react';

function Hero() {
  return (
    <section className="relative h-[400px] rounded-lg overflow-hidden">
      <img
        src="/images/hero-image.jpg"
        alt="Hero"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-white text-4xl font-bold mb-4">
            Latest Salesforce News and Updates
          </h1>
          <p className="text-white/90 text-lg">
            Stay informed with the latest trends, certifications, and community insights
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;