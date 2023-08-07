import React from 'react';

type ToggleDetailProps = {
    clickHandler: () => void;
    isLoading?: boolean;
};

const ToggleDetail = ({ clickHandler, isLoading }: ToggleDetailProps) => {
    //   console.log("is loading: ", isLoading);
    return (
        <div className="">
            <button
                //disabled={isLoading}
                className="z-50 m-0 inline-block h-10 w-full rounded-sm bg-blue-600 text-sm text-white transition-colors ease-linear hover:bg-blue-800"
                onClick={clickHandler}
            >
                Show Details
            </button>
        </div>
    );
};

export default ToggleDetail;
