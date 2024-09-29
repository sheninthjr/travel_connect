import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";

export function HomeBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto text-white flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
