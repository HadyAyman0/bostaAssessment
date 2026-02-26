import { Outlet } from "react-router-dom";
import NavbarSimple from "./NavbarSimple";
import type { FC } from "react";

const MainLayout: FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSimple />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;
