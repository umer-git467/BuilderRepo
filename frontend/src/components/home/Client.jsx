function Client() {
  return (
    <div>
      <section
        id="client"
        className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8 items-center"
      >
        <div className="-mt-24 p-5">
          <h2 className="text-lg text-gray-500 uppercase mb-2">For Client</h2>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Lock in Competitive Prices and Skyrocket Your Project Efficiency
            with BuildHub
          </h1>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <div className="p-2 bg-gray-200 rounded-full">
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
                  Save money
                </h3>
                <p className="text-gray-600">
                  By choosing the best bid from your local supplier.
                </p>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <div className="p-2 bg-gray-200 rounded-full">
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
                <h3 className="text-lg font-medium text-gray-900">Save time</h3>
                <p className="text-gray-600">
                  With real-time order tracking for ultimate project control.
                </p>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <div className="p-2 bg-gray-200 rounded-full">
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
                  Reduce headaches
                </h3>
                <p className="text-gray-600">
                  Secure and hassle-free online payments with our partner
                  Stripe.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <img
            src="./assets/images/client.png"
            alt="Mobile Vector"
            className="mx-auto"
            width={500}
          />
        </div>
      </section>
    </div>
  );
}

export default Client;
