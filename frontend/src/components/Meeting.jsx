import React from "react";

function Meeting() {
  return (
    <div className="h-screen bg-gradient-to-b from-blue-700 to-blue-900 w-screen flex items-center justify-center flex-col">
      <h3 className="font-medium border-b-2 border-gray-800 mt-6 px-4">
        MEETINGS
      </h3>
      <div className="w-full flex items-center justify-evenly">
        <div className="h-[375px] w-[500px] border-2 border-gray-900 rounded-2xl mt-20 bg-[#168AAD]">
          <div className="h-1/6 w-full flex items-center justify-evenly border-b-2 border-gray-900">
            <h2 className="font-bold">ONLINE MEETING</h2>
          </div>
          <div className="h-full w-full flex items-center justify-evenly pb-8 flex-col">
            <div className="w-3/4 py-2 rounded-full bg-white flex  items-center  justify-center text-gray-600">
              Enter a meeting
            </div>
            <div className="w-3/4 py-2 rounded-full bg-white flex  items-center  justify-center text-gray-600">
              Create the meeting
            </div>
          </div>
        </div>
        <div className="h-[375px] w-[500px] border-2 border-gray-900 rounded-2xl mt-20 bg-[#168AAD]">
          <div className="h-1/6 w-full flex items-center justify-evenly border-b-2 border-gray-900">
            <h2 className="font-bold  ">OFFLINE MEETING</h2>
          </div>
          <div className="h-full w-full flex items-center justify-evenly pb-8 flex-col">
            <div className="w-3/4 py-2 rounded-full bg-white flex  items-center  justify-center text-gray-600">
              Book a Auditorium
            </div>
          </div>
          <div className="h-8 w-full flex flex-row items-center justify-end">
            <button className="h-full w-20 bg-white rounded-lg mr-4 border-2 border-blue-800">
              Back
            </button>
            <button className="h-full w-20 bg-white rounded-lg mr-4 border-2 border-blue-800">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meeting;
