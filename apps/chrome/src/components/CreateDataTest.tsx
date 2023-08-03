import React from "react";

type ToggleDetailProps = {
  clickHandler: () => void;
  isLoading?: boolean;
};

const CreateDataTest = ({ clickHandler, isLoading }: ToggleDetailProps) => {
  //   console.log("is loading: ", isLoading);
  return (
    <div className=" right-20 top-0 ">
      <button
        //disabled={isLoading}
        className="z-50 m-2 h-12 w-24 rounded-sm bg-blue-600 text-white hover:bg-blue-800"
        onClick={clickHandler}
      >
        Create data test
      </button>
    </div>
  );
};

export default CreateDataTest;
