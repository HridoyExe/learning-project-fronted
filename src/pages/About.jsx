import { FiAward, FiUsers, FiClock, FiShield } from "react-icons/fi";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"
        }}></div>
        <div className="container-professional relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-scale-in">
            We are <span className="text-blue-500 text-shimmer">SwiftCart</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-blur-fade">
            Redefining the digital shopping experience through quality, innovation, and customer-first approach since 2025.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="container-professional">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10k+</div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wider">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50k+</div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wider">Products Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wider">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24h</div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wider">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-professional">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Our Core Values</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <FiAward size={28} />
              </div>
              <h3 className="heading-3 mb-4">Quality First</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in providing only the best. Every product on our platform undergoes a rigorous quality check before it reaches you.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <FiUsers size={28} />
              </div>
              <h3 className="heading-3 mb-4">Customer Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our support team is available 24/7 to help you with any queries. Your satisfaction is our primary metric of success.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <FiShield size={28} />
              </div>
              <h3 className="heading-3 mb-4">Secure Shopping</h3>
              <p className="text-gray-600 leading-relaxed">
                We use enterprise-grade encryption for all transactions. Your data and privacy are always our top priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container-professional">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                alt="Our Team"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="heading-2">Mission to Empower</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to empower consumers by providing a transparent, fair, and high-quality marketplace. We strive to connect you with the brands you love while ensuring a seamless shopping journey.
              </p>
              <div className="flex items-center gap-4 py-4">
                <div className="flex -space-x-3 overflow-hidden">
                  <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?u=1" alt="" />
                  <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?u=2" alt="" />
                  <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?u=3" alt="" />
                </div>
                <div className="text-sm font-medium text-gray-500">
                  Join <span className="text-gray-900 font-bold">50,000+</span> happy customers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
