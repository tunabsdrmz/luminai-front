import React from "react";

type Props = {
  comment: string;
  name: string;
  ticketType: string;
};

export default function Comments({ comment, name, ticketType }: Props) {
  return (
    <div className="flex flex-col items-start justify-center p-3 gap-2 border border-black rounded hover:scale-105 transition-all ease-in-out duration-300">
      <div className="flex items-center justify-between w-full">
        <p className="text-base font-semibold text-black">{name}</p>
        <p className="text-xs font-bold text-black">{ticketType}</p>
      </div>
      <p className="text-sm font-normal line-clamp-2 text-black">{comment}</p>
    </div>
  );
}
