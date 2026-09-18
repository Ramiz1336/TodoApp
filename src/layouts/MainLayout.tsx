import { ReactNode } from "react";
import { BottomNav, ProfileSidebar } from "../components";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <ProfileSidebar />
      {children}
      <div style={{ marginTop: "100px" }} />
      <BottomNav />
    </>
  );
};

export default MainLayout;
