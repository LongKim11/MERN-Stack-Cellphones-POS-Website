import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { FaUserPlus } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import StaffTable from "../../components/StaffTable";
import {
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";

const StaffManagementPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [admin, setAdmin] = useState({ fullname: "", email: "", username: "" });

  const [openAddStaffModal, setOpenAddStaffModal] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [staffs, setStaffs] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (cookies.jwt) {
      const admin = jwtDecode(cookies.jwt);
      setAdmin({
        fullname: admin.fullname,
        email: admin.email,
        username: admin.username,
      });
    }

    axios
      .get("http://localhost:8080/api/v1/staffs", {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      })
      .then((res) => {
        const entries = res.data;
        const list = Object.values(entries.data);
        setStaffs(list);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu thống kê!", error);
      });
  }, [cookies.jwt]);

  if (!cookies.jwt) {
    console.log("You are not authenticated");
    return <Navigate to="/" />;
  } else if (cookies.jwt) {
    if (jwtDecode(cookies.jwt).role !== "admin") {
      console.log("You are not authorized to access this resource");
      removeCookie("jwt");
      return <Navigate to="/" />;
    }
  }

  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOpenAddStaffModal = () => {
    setOpenAddStaffModal(!openAddStaffModal);
  };

  const handleAddNewStaff = () => {
    const newStaff = {
      fullname,
      email,
    };

    if (!newStaff.fullname || !newStaff.email) {
      enqueueSnackbar("Vui lòng điền đầy đủ thông tin", { variant: "error" });
      setOpenAddStaffModal(!openAddStaffModal);
    }

    axios
      .post(`http://localhost:8080/api/v1/staffs`, newStaff, {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      })
      .then((res) => {
        const result = res.data.data;
        setStaffs([result, ...staffs]);
        enqueueSnackbar("Thêm nhân viên thành công", { variant: "success" });
        setOpenAddStaffModal(!openAddStaffModal);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Thêm nhân viên thất bại!", { variant: "error" });
      });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-7 bg-slate-100">
        <Navbar heading="Quản lý nhân viên" staff={admin} />
        <div className="flex justify-between mt-11 items-center">
          <h1 className="text-2xl font-semibold">Danh sách</h1>
          <Button
            color="green"
            className="flex items-center gap-3"
            onClick={handleOpenAddStaffModal}
          >
            <FaUserPlus className="text-lg" />
            Thêm nhân viên
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
                  placeholder="Tìm nhân viên.."
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
          <StaffTable staffs={staffs} />
        </div>
      </div>
      <Dialog
        open={openAddStaffModal}
        handler={handleOpenAddStaffModal}
        size="sm"
      >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h3">Thêm nhân viên mới</Typography>
          <Typography className="mt-1 font-normal text-slate-500">
            Điền các thông tin cần thiết để tiến hành thêm
          </Typography>
        </DialogHeader>
        <DialogBody>
          <div className="mb-6">
            <div className="flex gap-x-2 items-center">
              <FaRegUser className="text-lg" />
              <Typography variant="h6">Họ và tên</Typography>
            </div>
            <input
              className="p-2 rounded-md w-full mt-2 border border-gray-300 font-normal focus:border-blue-500 focus:outline-none"
              onChange={handleFullnameChange}
            ></input>
          </div>
          <div className="mb-6">
            <div className="flex gap-x-2 items-center">
              <MdMailOutline className="text-xl" />
              <Typography variant="h6">Địa chỉ email</Typography>
            </div>
            <input
              className="p-2 rounded-md w-full mt-2 border border-gray-300 font-normal focus:border-blue-500 focus:outline-none"
              onChange={handleEmailChange}
            ></input>
          </div>
          {/* <div className="mb-6">
            <div className="flex gap-x-2 items-center">
              <FaRegAddressCard className="text-xl" />
              <Typography variant="h6">Ảnh đại diện</Typography>
            </div>
            <input
              type="file"
              className="mt-2 font-semibold file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            ></input>
          </div> */}
        </DialogBody>
        <DialogFooter>
          <Button color="blue" onClick={handleAddNewStaff}>
            <span>Thêm mới</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default StaffManagementPage;
