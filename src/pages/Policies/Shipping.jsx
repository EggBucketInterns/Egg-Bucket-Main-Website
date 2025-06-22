// src/pages/Policies/Shipping.jsx
import { FaShippingFast } from "react-icons/fa";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12 md:px-24 lg:px-48">
      <h1 className="text-4xl mt-20 font-bold text-[#f87709] mb-8 border-b-2 pb-2 border-[#f87709]">
        Shipping Policy
      </h1>

      {/* Highlighted shipping duration */}
      <div className="flex items-center gap-3 bg-orange-100 border-l-4 border-[#f87709] text-orange-800 px-4 py-4 rounded-md shadow-md mb-6">
        <FaShippingFast className="text-2xl" />
        <p className="text-lg font-semibold">
          Shipping will be done in <span className="underline">1 to 4 hours</span>.
        </p>
      </div>

      {/* Detailed policy */}
      <div className="space-y-5 text-base leading-7">
        <p>
          At Egg Bucket, we are committed to delivering your orders as quickly and safely as possible. We currently serve select areas with fast local delivery.
        </p>

        <p>
          Once your order is confirmed, our logistics team will begin processing immediately to ensure freshness and prompt delivery.
        </p>

        <p>
          Delivery time may vary slightly based on your location, traffic conditions, and order volume, but we aim to complete every delivery within the mentioned time window.
        </p>

        <p>
          If you have any questions about shipping to your location, please contact our support team at{" "}
          <a
            href="mailto:support@eggbucket.in"
            className="text-blue-600 underline hover:text-blue-800"
          >
            support@eggbucket.in
          </a>.
        </p>
      </div>
    </div>
  );
};

export default Shipping;
