"use client";
import { useState } from "react";
import Navbar from "@/Components/dashboard/Components/Navbar";
import Sidebar from "@/Components/dashboard/Components/Sidebar";
import Geography from "@/Components/dashboard/Components/Geography";
import Overview from "./Components/Overview";

export default function Dashboard() {
  const [tabI, setTabI] = useState<number>(0);

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

  console.log(tabI);

  return (
    <div>
      <div className="flex">
        <Sidebar tabI={tabI} setTabI={setTabI} />
        <div
          className="w-full pl-5"
          style={{ borderLeft: "2px solid var(--background-secondary)" }}
        >
          <Navbar />
          <div>
            {tabI === 4 ? <Geography /> : tabI === 6 ? <Overview /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
