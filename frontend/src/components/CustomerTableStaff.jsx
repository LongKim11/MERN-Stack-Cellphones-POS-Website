import { Card, Typography, Tooltip } from "@material-tailwind/react";
import { RiBillLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const TABLE_HEAD = [
  "Họ và tên",
  "Địa chỉ",
  "Số điện thoại",
  "Ngày tạo",
  "Thao tác",
];

const CustomerTableStaff = ({ TABLE_ROWS }) => {
  return (
    <Card className="h-full w-full">
      <table className="w-full min-w-max table-auto">
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
          {TABLE_ROWS.map(({ fullname, address, phone, createdAt }, index) => {
            return (
              <tr key={index} className="hover:bg-slate-50">
                <td className="p-4 text-center">
                  <Typography
                    variant="mmedium"
                    className="font-semibold text-blue-700"
                  >
                    {fullname}
                  </Typography>
                </td>
                <td className="p-4 text-center">
                  <Typography
                    variant="medium"
                    className="font-semibold text-slate-600"
                  >
                    {address}
                  </Typography>
                </td>
                <td className="p-4 text-center">
                  <Typography
                    variant="medium"
                    className="font-semibold text-slate-600"
                  >
                    {phone}
                  </Typography>
                </td>
                <td className="p-4 text-center">
                  <Typography
                    variant="medium"
                    className="font-semibold text-slate-600"
                  >
                    {createdAt}
                  </Typography>
                </td>
                <td className="p-4 flex justify-center">
                  <Tooltip
                    content="Lịch sử mua hàng"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <Link to="/staff/purchase-history">
                      <RiBillLine className="text-2xl text-orange-500" />
                    </Link>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default CustomerTableStaff;
