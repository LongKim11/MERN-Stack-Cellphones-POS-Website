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
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

const StaffManagementPage = () => {
  const TABLE_ROWS = [
    {
      img: "./src/assets/user-avatar.png",
      name: "John Michael",
      createdAt: "2021-10-10",
      status: "Active",
      is_locked: "false",
    },
    {
      img: "./src/assets/user-avatar.png",
      name: "Alexa Liras",
      createdAt: "2021-10-10",
      status: "Inactive",
      is_locked: "true",
    },
    {
      img: "./src/assets/user-avatar.png",
      name: "Laurent Perrier",
      createdAt: "2021-10-10",
      status: "Active",
      is_locked: "false",
    },
    {
      img: "./src/assets/user-avatar.png",
      name: "Michael Levi",
      createdAt: "2021-10-10",
      status: "Inactive",
      is_locked: "true",
    },
    {
      img: "./src/assets/user-avatar.png",
      name: "Michael Levi",
      createdAt: "2021-10-10",
      status: "Active",
      is_locked: "true",
    },
  ];

  const [openAddStaffModal, setOpenAddStaffModal] = useState(false);

  const handleOpenAddStaffModal = () =>
    setOpenAddStaffModal(!openAddStaffModal);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-7 bg-slate-100">
        <Navbar
          heading="Quản lý nhân viên"
          username="Username"
          fullname="Nguyễn Văn A"
          email="nguyenvana@gmail.com"
          avatar="./src/assets/user-avatar.png"
        />
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
          <StaffTable TABLE_ROWS={TABLE_ROWS} />
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
            <input className="p-2 rounded-md w-full mt-2 border border-gray-300 font-normal focus:border-blue-500 focus:outline-none"></input>
          </div>
          <div className="mb-6">
            <div className="flex gap-x-2 items-center">
              <MdMailOutline className="text-xl" />
              <Typography variant="h6">Địa chỉ email</Typography>
            </div>
            <input className="p-2 rounded-md w-full mt-2 border border-gray-300 font-normal focus:border-blue-500 focus:outline-none"></input>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="blue" onClick={handleOpenAddStaffModal}>
            <span>Thêm mới</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default StaffManagementPage;
