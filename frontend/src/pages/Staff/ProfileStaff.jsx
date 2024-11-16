import SidebarStaff from "../../components/SidebarStaff";
import NavbarStaff from "../../components/NavbarStaff";
import ProfileForm from "../../components/ProfileForm";

const ProfileStaff = () => {
  return (
    <div className="flex">
      <SidebarStaff></SidebarStaff>
      <div className="flex-1 p-7 bg-slate-100">
        <NavbarStaff
          heading="Thông tin cá nhân"
          username="Username"
          fullname="Nguyễn Văn A"
          email="nguyenvana@gmail.com"
          avatar="./src/assets/user-avatar.png"
        ></NavbarStaff>
        <ProfileForm
          avatar="./src/assets/user-avatar.png"
          username="Username"
          email="nguyenvana@gmail.com"
          fullname="Nguyễn Văn A"
        ></ProfileForm>
      </div>
    </div>
  );
};

export default ProfileStaff;
