import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Button } from "@material-tailwind/react";
import { IoFilter } from "react-icons/io5";
import ProductTable from "../../components/ProductTable";
import { TbDevicesPlus } from "react-icons/tb";

const ProductManagementPage = () => {
  const TABLE_ROWS = [
    {
      barcode: "P000001",
      name: "Iphone 13 Pro Max 256GB",
      import_price: "2000",
      retail_price: "2500",
      category: { name: "phone", type: "smartphone" },
      createdAt: "2021-10-10",
    },
    {
      barcode: "P000001",
      name: "Sạc Smartphone Samsung 25W",
      import_price: "2000",
      retail_price: "2500",
      category: { name: "accessories", type: "charging" },
      createdAt: "2021-10-10",
    },
    {
      barcode: "P000001",
      name: "Xiomi Redmi Note 10 Pro 128GB",
      import_price: "2000",
      retail_price: "2500",
      category: { name: "phone", type: "smartphone" },
      createdAt: "2021-10-10",
    },
    {
      barcode: "P000001",
      name: "Apple Watch Series 7 44mm",
      import_price: "2000",
      retail_price: "2500",
      category: { name: "accessories", type: "watch" },
      createdAt: "2021-10-10",
    },
    {
      barcode: "P000001",
      name: "Iphone 13 Pro Max 256GB",
      import_price: "2000",
      retail_price: "2500",
      category: { name: "phone", type: "smartphone" },
      createdAt: "2021-10-10",
    },
  ];
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-7 bg-slate-100">
        <Navbar
          heading="Quản lý sản phẩm"
          username="Username"
          fullname="Nguyễn Văn A"
          email="nguyenvana@gmail.com"
          avatar="./src/assets/user-avatar.png"
        />
        <div className="flex justify-between mt-11 items-center">
          <h1 className="text-2xl font-semibold">Danh sách</h1>
          <Button color="green" className="flex items-center gap-3">
            <TbDevicesPlus className="text-lg" />
            Thêm sản phẩm
          </Button>
        </div>
        <div className="w-full bg-white rounded-xl mt-7 border border-slate-200">
          <div className="flex justify-between items-center p-5">
            <form>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-slate-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  className="block w-full p-3 ps-10 text-sm border border-gray-300 rounded-lg  focus:ring-blue-500 focus:outline-none focus:ring-1 focus:border-blue-500 "
                  placeholder="Tìm sản phẩm.."
                  required
                />
              </div>
            </form>
            <div>
              <Button variant="text" size="sm">
                <IoFilter className="text-lg"></IoFilter>
              </Button>
            </div>
          </div>
          <ProductTable TABLE_ROWS={TABLE_ROWS} />
        </div>
      </div>
    </div>
  );
};

export default ProductManagementPage;