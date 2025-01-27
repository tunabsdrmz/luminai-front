"use client";
import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Header from "../components/Header";
import TicketCard from "../components/TicketCard";
import Comments from "../components/Comments";
import { useRouter } from "next/navigation";
import HomeService, { Reservations, User } from "@/service/endpoints";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

export default function page() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });
  const [user, setUser] = React.useState<User | null>(null);
  const [data, setData] = React.useState<Reservations[]>([]);
  const router = useRouter();
  const localId = localStorage.getItem("localId");
  const idToken = localStorage.getItem("idToken");

  useEffect(() => {
    if (!localId || !idToken) {
      router.replace("/");
    }
    getUser();
    getData();
  }, []);

  const getUser = async () => {
    const response = await HomeService.user({ id: localId! });
    setUser(response);
  };

  const getData = async () => {
    const response = await HomeService.data(idToken!);
    setData(response);
  };

  const filterFlightsByDate = (flights: Reservations[], range?: DateRange) => {
    if (!range) return flights;

    const { from, to } = range;

    return flights.filter((flight) => {
      const departureDate = new Date(flight.departure.date_time);
      return departureDate >= from! && departureDate <= to!;
    });
  };

  let filteredFlights = filterFlightsByDate(data, date);

  useEffect(() => {
    filteredFlights = filterFlightsByDate(data, date);
  }, [date]);
  return (
    <div className="flex flex-col gap-8 items-center justify-start min-h-screen bg-neutral-200 text-[#333333] font-[family-name:var(--font-geist-sans)]">
      <Header
        user={user}
        date={date}
        setDate={setDate}
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center max-h-[75vh] overflow-y-auto">
        {data &&
          user?.displayName === "ADMIN" &&
          filteredFlights?.map?.((item, idx) => (
            <Dialog key={idx}>
              <DialogTrigger>
                <TicketCard item={item} />
              </DialogTrigger>
              <DialogContent className="flex flex-col gap-3">
                <DialogHeader>
                  <DialogTitle>Flight Comments</DialogTitle>
                </DialogHeader>
                {item.passengers.map((comment, idx) => (
                  <Comments
                    key={idx}
                    comment={comment.comment}
                    name={comment.name}
                    ticketType={comment.ticket_type}
                  />
                ))}
              </DialogContent>
            </Dialog>
          ))}

        {data &&
          user?.displayName !== "ADMIN" &&
          data?.map?.((item, idx) => (
            <TicketCard
              key={idx}
              item={item}
            />
          ))}

        {!data && filteredFlights.length === 0 && (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-lg font-semibold text-black animate-pulse">
              No data available
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
