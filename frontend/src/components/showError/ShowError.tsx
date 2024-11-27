import { errorStore } from "@/store/errorsStore";
import { Button } from "../ui/button";
import { useEffect } from "react";

function ShowError() {
  const { error, clearError } = errorStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      clearError({ status: false, message: "" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [error, clearError]);

  return (
    <span className="flex justify-center items-center mx-auto p-2 bg-red-200 text-center text-red-950 w-full max-w-[400px] sticky top-0 left-0 z-50">
      {error.message}
      <Button
        type="button"
        className="bg-red-500 mx-2 text-red-950"
        onClick={() => clearError({ status: false, message: "" })}
      >
        Ok
      </Button>
    </span>
  );
}
export { ShowError };
