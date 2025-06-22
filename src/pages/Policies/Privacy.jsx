// src/pages/Policies/Privacy.jsx
import { MdPrivacyTip } from "react-icons/md";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12 md:px-24 lg:px-48">
      <h1 className="text-4xl mt-20 font-bold text-[#f87709] mb-8 border-b-2 pb-2 border-[#f87709]">
        Privacy Policy
      </h1>

      {/* Highlighted note */}
      <div className="flex items-center gap-3 bg-orange-100 border-l-4 border-[#f87709] text-orange-800 px-4 py-4 rounded-md shadow mb-6">
        <MdPrivacyTip className="text-2xl" />
        <p className="text-lg font-semibold">
          Your privacy is important to us. We are committed to protecting your personal information.
        </p>
      </div>

      {/* Policy Content */}
      <div className="space-y-6 text-base leading-7">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
          <p>
            We collect information such as your name, phone number, address, and email when you register or place an order.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. How We Use Your Information</h2>
          <p>
            We use your data to process orders, send notifications, improve customer support, and enhance user experience on our platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Data Protection</h2>
          <p>
            We implement secure technologies and encryption practices to protect your data from unauthorized access, alteration, or misuse.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Third-Party Services</h2>
          <p>
            We do not sell or rent your personal data. Some services (like payment gateways) may receive information necessary to process transactions securely.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Contact Us</h2>
          <p>
            For any privacy concerns, email us at{" "}
            <a
              href="mailto:support@eggbucket.in"
              className="text-blue-600 underline hover:text-blue-800"
            >
              support@eggbucket.in
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
