import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { triggerIsSignedIn } from "../atoms/atoms";

export const SignInComponent = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setTriggerAtom = useSetRecoilState(triggerIsSignedIn);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    // setIsLoading((r) => !r);
    const response = await axios.post(
      "https://test-backend-k3y5.onrender.com/signin",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.data.value) {
      console.log("Signed In Successfully");
      setTriggerAtom((r) => r + 1);
      navigate("/dashboard");
    }
    // setIsLoading((r) => !r);
    console.log("Form Submitted", data);
  };

  return (
    <div className="w-screen h-screen text-white flex items-center flex-col">
      {/* Logo Section */}
      <div className="mt-10 h-fit logo font-black font-[Roboto] text-[#272727] text-2xl flex items-center justify-center space-x-2">
        <i className="fa-solid fa-dna text-3xl"></i>
        <h1 className="text-2xl">
          <img src="https://www.creditsea.com/_next/static/media/credit-sea-blue-h-latest.62519644.svg"></img>
        </h1>
      </div>

      {/* Form Section */}
      <div className="form flex flex-col items-center">
        <h2 className="mt-28 mb-8 flex justify-center text-2xl font-bold text-[#272727]">
          Login
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center flex-col gap-2"
        >
          {/* Username Input */}
          <input
            className="border-2 border-[#157FFE] px-3 py-1 rounded-md text-black placeholder-[#575757] w-[270px] outline-none"
            type="text"
            placeholder="Username"
            autoComplete="off"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            //@ts-ignore
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}

          {/* Password Input */}
          <input
            className="border-2 border-[#157FFE] px-3 py-1 rounded-md text-black placeholder-[#575757] w-[270px] outline-none"
            type="password"
            placeholder="Password"
            autoComplete="off"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            //@ts-ignore
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-1">
            <input
              className="rounded-md bg-[#1A1A1A]"
              type="checkbox"
              {...register("rememberMe")}
            />
            <label className="text-sm text-[#575757]">Remember me</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="outline-2 outline-[#157FFE] bg-[#32C80F] py-1 rounded-md mt-5 w-full"
          >
            Login
          </button>
        </form>

        <a href="/signup" className="text-sm text-[#575757] underline mt-6">
          Don't have an account? Sign up
        </a>
      </div>
    </div>
  );
};
