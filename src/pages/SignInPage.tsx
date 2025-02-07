import { SignInComponent } from "../components/SignInComponent";
import { Navbar } from "../components/Navbar";

const SignInPage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[70px]">
        <SignInComponent />
      </div>
    </div>
  );
};

export default SignInPage;
