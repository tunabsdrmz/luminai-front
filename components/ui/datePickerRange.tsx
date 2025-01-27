"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePickerWithRange({
  date,
  setDate,
}: {
  date: DateRange | undefined;
  setDate: (date: undefined | DateRange) => void;
}) {
  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[230px] h-10 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}>
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy-MM-dd")} - {format(date.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(date.from, "yyyy-MM-dd")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
