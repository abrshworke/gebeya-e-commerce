import React from "react";

const About = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 text-gray-800 space-y-24">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700">
          Welcome to Gebeya
        </h1>
        <p className="text-xl md:text-2xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
          <span className="font-semibold text-blue-700">Gebeya</span> is an
          Ethiopian-born e-commerce platform built to redefine how our people
          buy, sell, and thrive online. The word “Gebeya” means{" "}
          <span className="italic">market</span> in Amharic — and like our
          traditional markets, our platform is lively, diverse, and full of
          opportunity.
        </p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Whether you're a shopper searching for unbeatable deals or a seller
          looking to expand your business digitally, Gebeya is your one-stop
          solution for a smarter marketplace.
        </p>
      </div>

      {/* Mission & Values */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-4xl font-bold mb-4 text-blue-800">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Our mission is simple: <strong>empower Ethiopian entrepreneurs</strong> by giving
            them a digital platform to grow, scale, and succeed. We believe in
            a future where local businesses are no longer limited by geography,
            but driven by digital transformation.
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-semibold mb-4 text-blue-700">
            What We Stand For
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
            <li><strong>Trust & Transparency</strong> in every transaction</li>
            <li><strong>Inclusivity</strong> across all regions and communities</li>
            <li><strong>Cultural pride</strong> rooted in Ethiopian identity</li>
            <li><strong>Customer-first design</strong> for seamless experience</li>
          </ul>
        </div>
      </div>

      {/* Ethiopian-Centered Platform */}
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-center text-blue-800">Built for Ethiopia, By Ethiopians</h2>
        <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
          At Gebeya, we understand the local market better than anyone because we live it. Our platform is tailored to reflect Ethiopia’s unique economic environment and social behavior. From support for birr-based transactions to adapting to delivery realities in remote areas — we design with **purpose and empathy**.
        </p>
        <div className="grid md:grid-cols-2 gap-8 pt-6">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">Local Payment & Delivery</h3>
            <p className="text-gray-700">
              We’re integrating with payment systems like Telebirr and CBE Birr, and partnering with local courier services for reliable nationwide delivery.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">Accessible for All</h3>
            <p className="text-gray-700">
              Our mobile-first design, Amharic support, and simplified interfaces make it easy for all Ethiopians — urban and rural — to use our platform.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-center text-blue-800">Modern Tech. Local Impact.</h2>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto">
          Gebeya runs on a powerful modern technology stack to ensure performance, flexibility, and growth — enabling us to serve users reliably and at scale.
        </p>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h4 className="text-xl font-semibold text-blue-700">MongoDB</h4>
            <p className="text-gray-600 mt-2">
              A scalable NoSQL database powering our product, user, and order management system.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h4 className="text-xl font-semibold text-blue-700">Express.js</h4>
            <p className="text-gray-600 mt-2">
              A minimalist backend framework that handles our server-side logic and APIs.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h4 className="text-xl font-semibold text-blue-700">React.js</h4>
            <p className="text-gray-600 mt-2">
              A fast, component-based frontend library that delivers a sleek and responsive UI.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h4 className="text-xl font-semibold text-blue-700">Node.js</h4>
            <p className="text-gray-600 mt-2">
              A non-blocking runtime that drives our backend with real-time performance.
            </p>
          </div>
        </div>
      </div>

      {/* Security and Roadmap */}
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-blue-800 text-center">Security First, Future Focused</h2>
        <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
          Gebeya is committed to creating a secure and trustworthy environment. We use industry standards in data protection and access control — ensuring every user’s privacy is respected and protected.
        </p>
        <div className="bg-gray-100 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">What’s Coming Next</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
            <li><strong>AI-powered product recommendations</strong> to enhance shopping experience</li>
            <li><strong>Built-in chat</strong> so buyers and sellers can communicate directly</li>
            <li><strong>Vendor analytics dashboard</strong> with insights and sales tracking</li>
            <li><strong>PWA support</strong> for offline and mobile-native experience</li>
          </ul>
        </div>
        <p className="text-center text-lg text-gray-700">
          Gebeya isn’t just a website — it's a movement. And we’re just getting started. 💙
        </p>
      </div>

      {/* Final CTA */}
      <div className="text-center pt-12">
        <h3 className="text-3xl font-bold text-blue-700 mb-4">Join the Journey</h3>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-6">
          Whether you're shopping for your next favorite item or building a brand online, Gebeya is here to empower you. Together, let's build Ethiopia’s digital marketplace.
        </p>
        <button className="bg-blue-700 text-white px-6 py-3 rounded-full text-lg shadow hover:bg-blue-800 transition">
          Start Exploring
        </button>
      </div>
    </section>
  );
};

export default About;
