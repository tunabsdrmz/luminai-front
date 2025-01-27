import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datePickerRange";
import { User } from "@/service/endpoints";
import React from "react";
import { DateRange } from "react-day-picker";

export default function Header({
  user,
  date,
  setDate,
}: {
  user: User | null;
  date: DateRange | undefined;
  setDate: (date: undefined | DateRange) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row w-full items-center justify-between px-4 py-6 border-black/10 border-b shadow">
      <h2 className="text-2xl font-bold">LuminFlights</h2>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
        {user?.displayName === "ADMIN" ? (
          <DatePickerWithRange
            date={date}
            setDate={setDate}
          />
        ) : null}

        <Button variant={"default"}>{user?.displayName}</Button>
      </div>
    </div>
  );
}
