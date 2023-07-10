"use client";
import Navbar from "@/Components/dashboard/Components/Navbar";
import Sidebar from "@/Components/dashboard/Components/Sidebar";
import { useState } from "react";
import Geography from "@/Components/dashboard/Components/Geography";

export default function Dashboard() {
  const [tabI, setTabI] = useState<number>(
    Number(localStorage?.getItem("__index__tab_!")) || 0
  );

  /*
  0 - Dashboard
  1 - Products
  2 - Customer
  3 - Transactions
  4 - Geography
  5 - Admin
  6 - Performance
  7 - Profile
  */

  return (
    <div>
      <div className="flex">
        <Sidebar tabI={tabI} setTabI={setTabI} />
        <div className="w-full">
          <Navbar />
          <div>{tabI === 4 ? <Geography /> : null}</div>
        </div>
      </div>
    </div>
  );
}
