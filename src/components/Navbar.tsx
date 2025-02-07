import { ReactElement } from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

interface NavbarType {
  RightNav?: ReactElement;
}
export const Navbar = (props: NavbarType) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex w-full h-[70px] items-center justify-between px-[40px] shadow-md fixed top-0 left-0 bg-[#ffffff50] backdrop-blur-lg">
        <div className="left">
          <img src="https://www.creditsea.com/_next/static/media/credit-sea-blue-h-latest.62519644.svg"></img>
        </div>
        <div className="rightnav">
          {props.RightNav ? (
            props.RightNav
          ) : (
            <>
              <Button
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Login
              </Button>
              <Button onClick={() => {}} typeStyle="outline">
                SignUp
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
