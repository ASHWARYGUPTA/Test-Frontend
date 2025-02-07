import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { triggerGetAccounts } from "../atoms/atoms";

interface formType {
  file: File[];
}

export const InputForm = () => {
  const setTriggerGetAccounts = useSetRecoilState(triggerGetAccounts);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>();

  const validateXML = async (file: File[]) => {
    if (!file || file.length === 0) {
      return "File is required";
    }

    const allowedType = "text/xml";
    if (file[0].type !== allowedType) {
      return "Only XML files are allowed";
    }

    return true;
  };

  const onSubmit = async (data: formType) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    await axios.post(
      "https://test-backend-k3y5.onrender.com/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    setTriggerGetAccounts((r) => r + 1);
  };

  return (
    <>
      <div className="h-[90px]  w-[600px] flex justify-center items-center outline-2 rounded-md my-5 bg-slate-100">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center items-center">
            <div className="flex-col">
              <input
                {...register("file", { validate: validateXML })}
                name="file"
                type="file"
                width={"50px"}
              ></input>
              {errors.file && (
                <p style={{ color: "red" }}>{errors.file.message}</p>
              )}
            </div>
            <div>
              <Button onClick={() => {}} typeButton="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
