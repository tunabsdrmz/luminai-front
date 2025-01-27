import { Reservations } from "@/service/endpoints";
import React from "react";

type Props = {
  item: Reservations;
};

export default function TicketCard({ item }: Props) {
  return (
    <div className="flex flex-col border border-black rounded-md p-4 w-[340px] bg-black hover:scale-105 transition-all ease-in-out duration-300">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start justify-center gap-3 text-xs">
          <p className="font-semibold text-white">
            <span className="font-normal text-gray-200">Aircraft:</span>
            {item.aircraft}
          </p>
          <p className="font-semibold text-white">
            <span className="font-normal text-gray-200">Airline:</span>
            {item.airline}
          </p>
          <p className="font-semibold text-white">
            <span className="font-normal text-gray-200">Flight ID:</span>
            {item.flight_id}
          </p>
        </div>

        <p className="text-2xl font-bold text-green-600">
          {item.currency} {item.price}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 text-white">
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-lg font-bold">Departure</p>
          <p className="text-sm font-semibold">{item.departure.city}</p>
          <p className="text-sm font-normal">{item.departure.date_time.slice(0, 10)}</p>
        </div>
        <span>- - - - - - - </span>
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-lg font-bold">Arrival</p>
          <p className="text-sm font-semibold">{item.arrival.city}</p>
          <p className="text-sm font-normal">{item.arrival.date_time.slice(0, 10)}</p>
        </div>
      </div>
    </div>
  );
}
