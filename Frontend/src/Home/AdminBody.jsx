import React, { useEffect, useState } from "react";
import MyProfileSection from "./MyProfileSection";
import UploadNewDocument from "../Admin/UploadNewDocument";
import UploadedDocument from "../Admin/UploadedDocument";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiUpload,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { motion } from "framer-motion";

export const AdminBody = () => {
  
  const [selected, setSelected] = useState("Dashboard");

  return (
    <div
      className="flex h-screen bg-white overflow-hidden"
      
      >
      <Sidebar selected={selected} setSelected={setSelected} />
      
      {/* Right Side Content */}
      <div className="flex-1 overflow-auto p-6">
        {selected === "Dashboard" ? (
          <MyProfileSection />
        ): selected === "UploadNewDocument" ? (
          <UploadNewDocument />
        ): selected === "UploadedDocument" ? (
          <UploadedDocument />
        ) : (
          <ExampleContent selected={selected} />
        )}
      </div>
    </div>
  );
};


const Sidebar = ({ selected, setSelected }) => {
  const [open, setOpen] = useState(true);
  

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2 "
      style={{
        width: open ? "300px" : "fit-content",
      }}
    >
      {/* <TitleSection open={open} /> */}

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiUpload }
          title="UploadNewDocument"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={3}
        />

        <Option
          Icon={FiUpload }
          title="UploadedDocument"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={3}
        />
        
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs }) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-black text-white"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}

      
    </motion.button>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">TomIsLoading</span>
              <span className="block text-xs text-slate-500">Pro Plan</span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const ExampleContent = () => <div className="h-[200vh] w-full ">
  <h1 className="text-white">hello</h1>
</div>;

export default AdminBody;
