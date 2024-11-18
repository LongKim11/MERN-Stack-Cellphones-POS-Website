import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { IoFilter } from "react-icons/io5";
import ProductTable from "../../components/ProductTable";
import { TbDevicesPlus } from "react-icons/tb";
import {
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { CgSmartphoneChip } from "react-icons/cg";
import { FaBarcode } from "react-icons/fa6";
import { FaSackDollar } from "react-icons/fa6";
import { IoMdPricetags } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { MdOutlineDevices } from "react-icons/md";
import axios from "axios";
import { useSnackbar } from "notistack";

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    category: "",
    barcode: "",
    import_price: "",
    retail_price: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const staff = {
    fullname: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    username: "Username",
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/products").then((res) => {
      setProducts(res.data.data);
    });
  }, []);

  const [openAddProductModal, setOpenAddProductModal] = useState(false);

  const handleOpenAddProductModal = () => {
    setOpenAddProductModal(!openAddProductModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    axios
      .post("http://localhost:8080/api/v1/products", newProduct)
      .then((res) => {
        setProducts([...products, res.data]);
        setOpenAddProductModal(false);
        setNewProduct({
          name: "",
          brand: "",
          category: "",
          barcode: "",
          import_price: "",
          retail_price: "",
        });
        enqueueSnackbar("Thêm sản phẩm thành công", { variant: "success" });
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi thêm sản phẩm!", error);
        setOpenAddProductModal(false);
        enqueueSnackbar("Hãy điền đầy đủ thông tin", {
          variant: "error",
        });
      });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-7 bg-slate-100">
        <Navbar heading="Quản lý sản phẩm" staff={staff} />
        <div className="flex justify-between mt-11 items-center">
          <h1 className="text-2xl font-semibold">Danh sách</h1>
          <Button
            color="green"
            className="flex items-center gap-3"
            onClick={handleOpenAddProductModal}
          >
            <TbDevicesPlus className="text-lg" />
            Thêm sản phẩm
          </Button>
        </div>
        <Dialog
          open={openAddProductModal}
          handler={handleOpenAddProductModal}
          size="sm"
        >
          <DialogHeader className="relative m-0 block">
            <Typography variant="h3">Thêm sản phẩm mới</Typography>
            <Typography className="mt-1 font-normal text-slate-500">
              Điền các thông tin cần thiết để tiến hành thêm
            </Typography>
          </DialogHeader>
          <DialogBody>
            <div className="mb-6">
              <div className="flex gap-x-2 items-center">
                <MdOutlineDevices className="text-lg" />
                <Typography variant="h6">Tên sản phẩm</Typography>
              </div>
              <input
                className="p-2 rounded-md w-full mt-2 border border-gray-300 font-normal focus:border-blue-500 focus:outline-none"
                name="name"
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="mb-6 flex gap-x-5">
              <div className="w-full">
                <div className="flex gap-x-2 items-center">
                  <CgSmartphoneChip className="text-xl" />
                  <Typography variant="h6">Tên thương hiệu</Typography>
                </div>
                <input
                  className="p-2 rounded-md w-full mt-2 border border-gray-300 font-normal focus:border-blue-500 focus:outline-none"
                  name="brand"
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="w-full">
                <div className="flex gap-x-2 items-center">
                  <BiCategory className="text-xl" />
                  <Typography variant="h6">Loại sản phẩm</Typography>
                </div>
                <input
                  className="p-2 rounded-md w-full mt-2 border border-gray-300 font-normal focus:border-blue-500 focus:outline-none"
                  name="category"
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex gap-x-2 items-center">
                <FaBarcode className="text-xl" />
                <Typography variant="h6">Mã barcode</Typography>
              </div>
              <input
                className="p-2 rounded-md w-full mt-2 border border-gray-300 font-normal focus:border-blue-500 focus:outline-none"
                name="barcode"
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="mb-6">
              <div className="flex gap-x-2 items-center">
                <FaSackDollar className="text-xl" />
                <Typography variant="h6">Giá nhập</Typography>
              </div>
              <input
                className="p-2 rounded-md w-full mt-2 border border-gray-300 font-normal focus:border-blue-500 focus:outline-none"
                name="import_price"
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="mb-6">
              <div className="flex gap-x-2 items-center">
                <IoMdPricetags className="text-xl" />
                <Typography variant="h6">Giá bán lẻ</Typography>
              </div>
              <input
                className="p-2 rounded-md w-full mt-2 border border-gray-300 font-normal focus:border-blue-500 focus:outline-none"
                name="retail_price"
                onChange={handleInputChange}
              ></input>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button color="blue" onClick={handleAddProduct}>
              <span>Thêm mới</span>
            </Button>
          </DialogFooter>
        </Dialog>
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
          <ProductTable products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductManagementPage;
