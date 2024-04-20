import { getAllOrders } from "@/lib/database/actions/order.action";
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

const page = async () => {
  const orders = await getAllOrders();
  console.log("🚀 ~ page ~ All orders:", orders);
  return (
    <div className="w-full p-6 px-8">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Table>
        <TableCaption>
          {" "}
          {orders.length === 0
            ? " No orders placed yet"
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
              <TableCell>{order._id}</TableCell>
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
