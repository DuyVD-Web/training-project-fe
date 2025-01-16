import { Link, useNavigate } from "react-router";
import NavButton from "./NavButton.tsx";
import baseRequest from "@/libs/axios.ts";
import { useUser } from "@/hooks/useUser.tsx";
import { useAuth } from "@/hooks/useAuth.tsx";
import { useToast } from "@/hooks/useToast.tsx";

export const NavBar = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useUser();
  const { isLoggedIn, logout } = useAuth();
  const { showToast } = useToast();

  async function handleLogout() {
    const response = await baseRequest("post", "/logout");
    if (response.code === 500) {
      showToast(response.message, "error");
    } else {
      showToast(response.message, "error");
    }
    logout();
    setUserInfo(null);
    navigate("/");
    showToast("Logged out successfully.");
  }

  const toLogin = () => {
    navigate("/login");
  };

  const toSignup = () => {
    navigate("/signup");
  };

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide fixed z-50 w-full top-0">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <Link to="/">Logo</Link>
        <div className="flex max-lg:ml-auto space-x-3">
          {isLoggedIn ? (
            <NavButton value={"Logout"} onClick={handleLogout} />
          ) : (
            <>
              <NavButton value={"Login"} onClick={toLogin} />
              <NavButton value={"Signup"} onClick={toSignup} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
