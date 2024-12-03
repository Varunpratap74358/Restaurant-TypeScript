import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Success = () => {
  const orders = [1, 2];
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      {orders.length === 0 ? (
        <h1 className="text-3xl font-extrabold text-red-500">
          No Orders found
        </h1>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-lg p-6 max-w-lg w-full rounded-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Orders Status: <span className="text-red-400">{"Confirm".toUpperCase()}</span>
            </h1>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Order Summery</h2>
            {/* your orers items dispalay */}
            <div className="mb-4">
                <div className="flex justify-between items-center">
                    <div className="flex  items-center">
                        <img src="/public/FaastFood.webp" alt="" className="h-14 w-14 rounded-md object-cover" />
                        <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">Samosa</h3>
                    </div>
                    <div className="text-right">
                        <div className="text-gray-800 dark:text-gray-200 flex items-center">
                            <IndianRupee />
                            <span className="text-lg font-medium">180</span>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
            </div>
          </div>
          <Link to={'/cart'}>
            <Button className="bg-yellow-600 hover:bg-yellow-700 duration-300 w-full ">Continue Shoping</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Success;
