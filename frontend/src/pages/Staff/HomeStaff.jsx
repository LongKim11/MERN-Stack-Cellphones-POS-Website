import SidebarStaff from "../../components/SidebarStaff";
import NavbarStaff from "../../components/NavbarStaff";
import DashboardBoxStaff from "../../components/DashboardBoxStaff";
import ChartStaff from "../../components/ChartStaff";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const HomeStaff = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [staff, setStaff] = useState({ fullname: "", email: "", username: "" });

  const [totalProductByMonth, setTotalProductByMonth] = useState([]);
  const [months, setMonths] = useState([]);
  const [overallStatistics, setOverallStatistics] = useState({
    totalCustomers: 0,
    totalStaff: 0,
    totalOrders: 0,
    totalAmount: 0,
    totalProductsSold: 0,
  });

  const [openCPModal, setOpenCPModal] = useState(false);
  const [openLoginViaEmailModal, setOpenLoginViaEmailModal] = useState(false);
  const [openLockedAccountModal, setOpenLockedAccountModal] = useState(false);

  useEffect(() => {
    if (cookies.jwt) {
      const staff = jwtDecode(cookies.jwt);
      setStaff({
        fullname: staff.fullname,
        email: staff.email,
        username: staff.username,
      });
    }

    Promise.all([
      axios.get(
        "http://localhost:8080/api/v1/orders/total-product-last-12-months",
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      ),
      axios.get("http://localhost:8080/api/v1/orders/overall-statistics", {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      }),
    ])
      .then(([totalProductRes, overallStatisticsRes]) => {
        setTotalProductByMonth(totalProductRes.data.totalProductByMonth);
        setMonths(totalProductRes.data.months);
        setOverallStatistics(overallStatisticsRes.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu thống kê!", error);
      });
  }, [cookies.jwt]);

  const handleOpenCPModal = () => setOpenCPModal((cur) => !cur);

  const handleOpenLoginViaEmailModal = () =>
    setOpenLoginViaEmailModal((cur) => !cur);

  const handleOpenLockedAccountModal = () =>
    setOpenLockedAccountModal((cur) => !cur);

  if (!cookies.jwt) {
    console.log("You are not authenticated");
    return <Navigate to="/" />;
  } else if (cookies.jwt) {
    if (jwtDecode(cookies.jwt).role !== "staff") {
      console.log("You are not authorized to access this resource");
      removeCookie("jwt");
      return <Navigate to="/" />;
    }
  }

  return (
    <div className="flex">
      <SidebarStaff />
      <div className="flex-1 p-7 bg-slate-100">
        <NavbarStaff heading="Hi, Welcome back 👋" staff={staff} />
        <DashboardBoxStaff
          customers={overallStatistics.totalCustomers}
          bills={overallStatistics.totalOrders}
          income={overallStatistics.totalAmount}
          products={overallStatistics.totalProductsSold}
        />
        <div className="mt-6">
          <div className="flex items-center gap-x-3 justify-end text-slate-500 cursor-pointer mb-3">
            <Link to={"/staff/analys"}>
              {" "}
              <p className="text-sm font-semibold">Đi tới trang thống kê</p>
            </Link>
            <Link to={"/staff/analys"}>
              <FaArrowRightLong />
            </Link>
          </div>

          <ChartStaff
            totalProductByMonth={totalProductByMonth}
            months={months}
          />
        </div>
        <Dialog
          size="sm"
          open={openCPModal}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[28rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Đổi mật khẩu mới
              </Typography>
              <Typography
                className="font-normal text-slate-400"
                variant="paragraph"
              >
                Mật khẩu cần ít nhất 6 kí tự.
              </Typography>
              <Typography className="" variant="h6">
                Mật khẩu cũ
              </Typography>
              <input
                type="password"
                className="border border-slate-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
              ></input>
              <Typography className="" variant="h6">
                Mật khẩu mới
              </Typography>
              <input
                type="password"
                className="border border-slate-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
              ></input>
              <Typography className="" variant="h6">
                Nhập lại mật khẩu mới
              </Typography>
              <input
                type="password"
                className="border border-slate-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
              ></input>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleOpenCPModal} fullWidth>
                Đổi mật khẩu
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
        <Dialog open={openLoginViaEmailModal} size="sm">
          <DialogHeader>Xác thực tài khoản</DialogHeader>
          <DialogBody>
            <Typography
              className="font-normal text-slate-500"
              variant="paragraph"
            >
              Vui lòng đăng nhập thông qua liên kết được gửi đến email để xác
              thực tài khoản.
            </Typography>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="gradient"
              color="blue"
              className="focus:outline-none"
            >
              <a href="/">Thoát</a>
            </Button>
          </DialogFooter>
        </Dialog>
        <Dialog open={openLockedAccountModal} size="sm">
          <DialogHeader>Khóa tài khoản</DialogHeader>
          <DialogBody>
            <Typography
              className="font-normal text-slate-500"
              variant="paragraph"
            >
              Tài khoản của bạn đã bị khóa vui lòng liên hệ với quản trị viên.
            </Typography>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="gradient"
              color="blue"
              className="focus:outline-none"
            >
              <a href="/">Thoát</a>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default HomeStaff;
