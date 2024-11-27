import { successStore } from "@/store/successStore";
import { Button } from "../ui/button";
import { useEffect } from "react";

function ShowSuccess() {
  const { success, clearSuccess } = successStore();

  useEffect(() => {
    setTimeout(() => {
      clearSuccess({ status: false, message: "" });
    }, 3000);
  }, [success, clearSuccess]);

  return (
    <span className="flex justify-center items-center mx-auto p-2 bg-green-200 text-center text-green-950 w-full max-w-[400px] sticky top-0 left-0 z-50">
      {success.message}
      <Button
        type="button"
        className="bg-green-500 mx-2 text-green-950"
        onClick={() => clearSuccess({ status: false, message: "" })}
      >
        Ok
      </Button>
    </span>
  );
}
export { ShowSuccess };
