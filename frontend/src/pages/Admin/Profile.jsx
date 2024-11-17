import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ProfileForm from "../../components/ProfileForm";

const Profile = () => {
  const staff = {
    fullname: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    username: "Username",
  };

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="flex-1 p-7 bg-slate-100">
        <Navbar heading="Thông tin cá nhân" staff={staff}></Navbar>
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

export default Profile;
