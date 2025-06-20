const Refund = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header Section */}
      <div className="bg-[#edd2b0] mt-24 text-center py-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold">Refund Policy</h1>
        <p className="mt-2 text-base md:text-lg">
          We prioritize customer satisfaction, but please review our policy before placing an order.
        </p>
      </div>

      {/* Policy Content */}
      <div className="max-w-4xl mx-auto py-10 px-4 text-justify leading-relaxed text-base space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">Important Notice</h2>
          <p>
            At Egg Bucket, we strive to deliver fresh and high-quality eggs to your doorstep. 
            However, due to the nature of our products, we do not offer refunds or returns after delivery.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Please Check Before Receiving</h2>
          <p>
            We request all customers to inspect the product at the time of delivery. 
            If you notice any damage or issues, kindly notify the delivery executive immediately. 
            Once the product is accepted, it will be considered as received in good condition and no refund or return will be entertained thereafter.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">In Case of Complaints</h2>
          <p>
            If you have a concern or complaint about your order, you may reach out to us 
            at <strong>support@eggbucket.in.</strong> Please include your order ID and a clear description of your issue.
            We will do our best to address it promptly and courteously.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Final Policy</h2>
          <p>
            No refunds or returns will be processed once the product has been delivered and accepted by the customer.
            We thank you for your understanding and cooperation.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Refund;
