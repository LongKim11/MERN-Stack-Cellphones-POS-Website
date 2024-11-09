import {
  Avatar,
  Typography,
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { GrUpdate } from "react-icons/gr";
import { useState } from "react";
import { PiNumpad } from "react-icons/pi";

const ProfileForm = ({ avatar, username, email, fullname }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  return (
    <div className="px-11 mx-auto mt-11 flex items-center">
      <div className="w-1/2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar
              src={avatar}
              alt="avatar"
              size="xl"
              withBorder={true}
              className="p-1"
              color="blue"
            />
            <div className="ml-5">
              <h1 className="text-2xl font-semibold">{username}</h1>
              <p className="text-gray-500">{email}</p>
            </div>
          </div>
          <Button
            variant="gradient"
            className="flex items-center gap-3"
            color="blue"
          >
            <GrUpdate className="text-lg" />
            Đổi ảnh mới
          </Button>
        </div>
        <form className="mt-9 ">
          <div className="mb-5">
            <Typography variant="h6">Tên đăng nhập</Typography>
            <input
              type="text"
              className="p-3 w-full rounded-lg bg-slate-200 focus:border-[#004AAD] focus:outline-none border-2 mt-2"
              value={username}
              disabled
            />
          </div>
          <div className="mb-5">
            <Typography variant="h6">Họ và tên</Typography>
            <input
              type="text"
              className="p-3 w-full rounded-lg bg-slate-200 focus:border-[#004AAD] focus:outline-none border-2 mt-2"
              value={fullname}
              disabled
            />
          </div>
          <div className="mb-5">
            <Typography variant="h6">Địa chỉ email</Typography>
            <input
              type="text"
              className="p-3 w-full rounded-lg bg-slate-200 focus:border-[#004AAD] focus:outline-none border-2 mt-2"
              value={email}
              disabled
            />
          </div>
          <div className="flex justify-center mt-14">
            <Button
              variant="gradient"
              className="flex items-center gap-3"
              onClick={handleOpen}
            >
              <PiNumpad className="text-lg" />
              Đổi mật khẩu
            </Button>
            <Dialog
              size="sx"
              open={open}
              handler={handleOpen}
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
                  <Button variant="gradient" onClick={handleOpen} fullWidth>
                    Đổi mật khẩu
                  </Button>
                </CardFooter>
              </Card>
            </Dialog>
          </div>
        </form>
      </div>
      <div className="w-1/2">
        <img
          src="./src/assets/profile-bg.jpg"
          className="mix-blend-multiply"
        ></img>
      </div>
    </div>
  );
};

export default ProfileForm;
