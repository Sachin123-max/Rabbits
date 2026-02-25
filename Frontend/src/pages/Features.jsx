import { Link } from "react-router-dom";
import { HiOutlineTruck, HiOutlineShieldCheck, HiOutlineRefresh, HiOutlineSupport, HiOutlineCreditCard, HiOutlineStar } from "react-icons/hi";

const Features = () => {
  return (
    <div className="flex">
      {/* Left Side - Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">Our Features</h2>
          <p className="text-gray-600 mb-6 text-center">
            Discover what makes Rabbit your best choice for fashion shopping.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <HiOutlineTruck className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Free Shipping</h3>
                <p className="text-gray-600 text-sm">
                  Enjoy free shipping on all orders above $50. Fast and reliable delivery to your doorstep.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <HiOutlineShieldCheck className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Secure Payment</h3>
                <p className="text-gray-600 text-sm">
                  Shop with confidence using our secure payment options. Your transactions are safe with us.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <HiOutlineRefresh className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Easy Returns</h3>
                <p className="text-gray-600 text-sm">
                  Not satisfied? Return any item within 30 days for a full refund. No questions asked.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <HiOutlineSupport className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">24/7 Support</h3>
                <p className="text-gray-600 text-sm">
                  Our dedicated support team is available round the clock to assist you with any queries.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <HiOutlineCreditCard className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Easy Checkout</h3>
                <p className="text-gray-600 text-sm">
                  Fast and hassle-free checkout process with multiple payment options including PayPal.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <HiOutlineStar className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Quality Products</h3>
                <p className="text-gray-600 text-sm">
                  We curate only the best quality products from trusted brands and manufacturers.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Have questions?</p>
            <Link
              to="/contact"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center p-12">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
            alt="Features"
            className="h-[750px] w-full object-cover opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
