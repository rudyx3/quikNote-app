import React from "react";
import { PiNotebookFill } from "react-icons/pi";
import { MdEditNote, MdDelete } from "react-icons/md";

export const Note = ({ title, date, content, handleEdit, handleDelete }) => {
  return (
    <div className="border rounded-md hover:shadow-xl transition-all ease-in-out flex text-custom-green">
      <div className="text-xl bg-[#cdd2c8] flex items-center px-3">
        <PiNotebookFill size={50} />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start px-4 py-2">
          <div className="flex flex-col">
            <h6 className="text-md font-semibold">{title}</h6>
            <p className="text-sm font-medium">
              {content.length > 60 ? content.slice(0, 60) + "..." : content}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <MdEditNote
              size={25}
              onClick={handleEdit}
              className="cursor-pointer hover:scale-110 transition-all ease-out"
              color="#608273"
            />
            <MdDelete
              size={25}
              onClick={handleDelete}
              className="cursor-pointer hover:scale-110 transition-all ease-out"
            />
          </div>
        </div>
        <span className="text-sm text-right px-4 pb-2 mt-auto text-[#608273]">
          {date}
        </span>
      </div>
    </div>
  );
};
