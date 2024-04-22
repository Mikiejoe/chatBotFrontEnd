import React from "react";

function Loading({ status }) {
  if (status)
    return (
      <div className="h-screen w-screen bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
}

export default Loading;
