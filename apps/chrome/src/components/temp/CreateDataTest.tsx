import React from 'react';

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
        className="w-34 z-50 m-2 h-12 rounded-sm bg-yellow-600 text-white hover:bg-yellow-800"
        onClick={clickHandler}
      >
        Create data test
      </button>
    </div>
  );
};

export default CreateDataTest;
