import {
  Card,
  Typography,
  Avatar,
  Chip,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { IoIosMail } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const TABLE_HEAD = [
  "Barcode",
  "Tên sản phẩm",
  "Giá nhập",
  "Giá bán lẻ",
  "Loại sản phẩm",
  "Ngày tạo",
  "Thao tác",
];

const ProductTable = ({ TABLE_ROWS }) => {
  return (
    <Card className="h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-4 bg-gray-100">
                <Typography variant="h6" color="black">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(
            ({ img, name, createdAt, status, is_locked, date }, index) => {
              return (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center gap-x-3">
                      <Avatar
                        src={img}
                        alt={name}
                        size="md"
                        withBorder={true}
                        color="blue"
                        className="border object-contain p-1"
                      />
                      <Typography variant="small" className="font-semibold">
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" className="font-semibold">
                      {createdAt}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <div className="w-max">
                      <Chip
                        size="lg"
                        variant="ghost"
                        value={status}
                        color={status == "Active" ? "green" : "amber"}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="w-max">
                      <Chip
                        size="lg"
                        variant="ghost"
                        value={is_locked}
                        color={is_locked == "true" ? "red" : "cyan"}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <Button
                      className="flex items-center gap-3"
                      size="sm"
                      color="blue"
                      variant="outlined"
                    >
                      <IoIosMail className="text-xl text-blue-500" />
                      Gửi
                    </Button>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" className="font-semibold">
                      {date}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-x-5">
                      <Tooltip
                        content="Chỉnh sửa"
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        <a href="#">
                          <AiOutlineEdit className="text-2xl text-green-600" />
                        </a>
                      </Tooltip>
                      <Tooltip
                        content="Xóa sản phẩm"
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        <a href="#">
                          <MdOutlineDelete className="text-2xl text-red-600" />
                        </a>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default ProductTable;