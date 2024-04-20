import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrdersOfUSer } from "@/lib/database/actions/order.action";

const page = async ({ params: { id } }) => {
  const orders = await getOrdersOfUSer(id);
  console.log("🚀 ~ page ~ orders", orders);
  return (
    <div className="w-full p-6 px-8">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Table>
        <TableCaption>
          {orders.length === 0
            ? "You hanve not placed any orders yet"
            : "A list of your recent invoices."}
        </TableCaption>
        <TableHeader className=" bg-primary">
          <TableRow className=" text-white font-bold">
            <TableHead className="w-[100px]  text-white font-bold">
              Order ID
            </TableHead>
            <TableHead className="w-[100px]  text-white font-bold ">
              Customer Name
            </TableHead>
            <TableHead className="w-[100px]  text-white font-bold">
              Total Amount
            </TableHead>
            <TableHead className="w-[100px]  text-white font-bold">
              Payment Method
            </TableHead>
            <TableHead className="w-[100px]  text-white font-bold">
              Total Items
            </TableHead>
            <TableHead className="w-[100px]  text-white font-bold">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id.trim(5)}>
              {/* <TableCell>
                <div className=" flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center justify-center gap-1"></div>
                </div>
              </TableCell> */}
              <TableCell className=" capitalize ">{order._id}</TableCell>
              <TableCell className=" capitalize ">
                {order.user.username}
              </TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>{order.items.length}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
