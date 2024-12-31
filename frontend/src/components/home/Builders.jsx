function Builders() {
  return (
    <div id="builder" className="bg-gray-100">
      <section className="flex flex-col md:flex-row items-center justify-center p-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
          {/* Mobile mockup */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/assets/images/work.png"
              alt="Mobile Vector"
              className="mx-auto -mt-24"
              width={500}
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-lg text-gray-500 uppercase mb-2">
              For Builders
            </h2>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Expand Your Business, Faster: Simplify Your Operations and Reach
              More Contractors with BuildHub
            </h1>
            <p className="text-gray-600 mb-8">
              Grow, Streamline, and Accelerate Your Business with BuildHub
            </p>
            <ul className="space-y-6">
              <li className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.791 0-3.438.58-4.805 1.573C5.1 11.1 4 12.94 4 15v1a4 4 0 004 4h8a4 4 0 004-4v-1c0-2.06-1.1-3.9-3.195-5.427A7.955 7.955 0 0012 8z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 0V8m0 4v4m0-4H8m4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Get More Orders
                  </h3>
                  <p className="text-gray-600">
                    Reach more customers, increase demand.
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.791 0-3.438.58-4.805 1.573C5.1 11.1 4 12.94 4 15v1a4 4 0 004 4h8a4 4 0 004-4v-1c0-2.06-1.1-3.9-3.195-5.427A7.955 7.955 0 0012 8z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 0V8m0 4v4m0-4H8m4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Simplify Your Order Management
                  </h3>
                  <p className="text-gray-600">
                    Save time by reducing phone calls and staying organized.
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.791 0-3.438.58-4.805 1.573C5.1 11.1 4 12.94 4 15v1a4 4 0 004 4h8a4 4 0 004-4v-1c0-2.06-1.1-3.9-3.195-5.427A7.955 7.955 0 0012 8z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 0V8m0 4v4m0-4H8m4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Pocket Instant Payments
                  </h3>
                  <p className="text-gray-600">
                    Improve cash flow, say goodbye to late payments.
                  </p>
                </div>
              </li>
            </ul>
            <p className="text-gray-600 mt-6">
              *BuildHub charges a small service fee for each order placed.
            </p>
          </div>
        </div>
      </section>
      <div className="py-8 text-xl text-center justify-center w-1/3 mx-auto ">
        <p>
          “Since joining BuildHub, we’ve increased our revenue by 15% and
          receive 3x more orders than we were previously with even less customer
          interaction”
        </p>
        <h3 className=" mt-5">
          <span className="font-bold">JR Singh </span>
          <br />
          Owner of Quality Bins
        </h3>
      </div>
    </div>
  );
}

export default Builders;
