
const Return = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="bg-[#edd2b0] text-center mt-24 py-10">
        <h1 className="text-4xl font-bold">Return Policy</h1>
        <p className="mt-2 text-lg">
          We accept returns under specific conditions to ensure product quality.
        </p>
      </div>

      <div className="max-w-4xl mx-auto py-10 px-4 text-justify leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4">Return Eligibility</h2>
        <p>
          Returns are accepted only for defective or incorrect items received.
          Items must be unused and in the same condition as delivered. We do
          not accept returns for perishable goods unless damaged.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Return Process</h2>
        <p>
          To initiate a return, please contact us at{" "}
          <strong>support@eggbucket.in</strong> with your order ID, reason, and
          product image. We will arrange a pickup and process your return
          accordingly.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Conditions</h2>
        <p>
          All return requests must be made within 48 hours of delivery. Returns
          are subject to inspection and approval by our team.
        </p>
      </div>
    </div>
  );
};

export default Return;
