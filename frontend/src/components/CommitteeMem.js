import React from "react";

function CommitteeMem() {
  return (
    <div className="h-screen bg-gradient-to-b from-blue-700 to-blue-900 w-screen flex items-center justify-center flex-col">
      {/* <div className="w-4/6 border-t-2 border-black absolute pb-6 " />
      <div className="w-4/6 flex flex-row justify-evenly relative pt-[336px]">
        <div className="h-2 w-2 bg-black rounded-full" />
        <div className="h-2 w-2 bg-black rounded-full" />
        <div className="h-2 w-2 bg-black rounded-full" />
        <div className="h-2 w-2 bg-black rounded-full" />
        <div className="h-2 w-2 bg-black rounded-full" />
        <div className="h-2 w-2 bg-black rounded-full" />
        <div className="h-2 w-2 bg-black rounded-full" />
        <div className="h-2 w-2 bg-black rounded-full" />
        <div className="h-2 w-2 bg-black rounded-full" />
      </div> */}

      <h3 className="font-medium border-b-2 border-gray-800 mt-6 px-4">
        COMMITTEE MEMBERS
      </h3>

      <div className="h-[375px] w-[500px] border-2 border-gray-900 rounded-2xl mt-20 bg-[#168AAD] overflow-scroll">
        <div className="h-1/6 w-full flex items-center justify-evenly border-b-2 border-gray-900">
          <h2 className="font-bold  ">LIST</h2>
        </div>
        <div className="h-full w-full flex flex-col items-center justify-evenly pb-8">
          <div className="w-3/4 py-2 rounded-full bg-white flex  items-center justify-center text-gray-600">
            Fred
          </div>
          <div className="w-3/4 py-2 rounded-full bg-white flex  items-center  justify-center text-gray-600">
            George
          </div>
          <div className="w-3/4 py-2 rounded-full bg-white flex  items-center justify-center text-gray-600">
            Joshua
          </div>
          <div className="w-3/4 py-2 rounded-full bg-white flex  items-center justify-center text-gray-600">
            Joshua
          </div>
          <div className="w-3/4 py-2 rounded-full bg-white flex  items-center justify-center text-gray-600">
            Joshua
          </div>
          <div className="w-3/4 py-2 rounded-full bg-white flex  items-center justify-center text-gray-600">
            Joshua
          </div>
          <div className="w-3/4 py-2 rounded-full bg-white flex  items-center justify-center text-gray-600">
            Joshua
          </div>
          <div className="w-3/4 py-2 rounded-full bg-white flex  items-center justify-center text-gray-600">
            Joshua
          </div>
          <div className="w-3/4 py-2 rounded-full bg-white flex  items-center justify-center text-gray-600">
            Joshua
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

export default CommitteeMem;
