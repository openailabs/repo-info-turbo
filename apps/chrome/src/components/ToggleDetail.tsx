import React from 'react'

type ToggleDetailProps = {
    clickHandler: () => void
    isLoading?: boolean
}

const ToggleDetail = ({ clickHandler }: ToggleDetailProps) => {
    return (
        <div className="absolute top-0 right-0 ">
            <button
                //disabled={isLoading}
                className="h-12 w-24 rounded-sm m-2 bg-blue-600 hover:bg-blue-800 text-white z-50"
                onClick={clickHandler}
            >
                Show Details
            </button>
        </div>
    )
}

export default ToggleDetail
