import React from 'react';

const Spinner = () => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="flex flex-col items-center justify-center space-y-2">
                <div
                    className="animate-spin inline-block w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full shadow-lg"
                    role="status"></div>
                <span className="text-blue-600 text-sm font-medium">Loading, please wait...</span>
            </div>
        </div>
    );
};

export default Spinner;