import Navbar from "@/components/navbar";
import Sidebar from "@/components/Sidebar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      {/* side bar */}
      <div className="hidden md:flex w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-200">

        <Sidebar/>
      </div>


      <main className="md:pl-72">
        <Navbar/>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
