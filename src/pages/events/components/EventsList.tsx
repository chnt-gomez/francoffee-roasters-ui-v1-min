import type { Event } from "@/types/event.interface";
import { CalendarDays } from "lucide-react";

import { useMemo } from "react"
import EventCard from "./EventCard";


interface Props {
    events: Event[],
    selectedDate: Date | undefined,
    onDeleteEvent: (id: string) => void
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

const EventsList = ({events, selectedDate, onDeleteEvent} : Props) => {

    const filteredEvents = useMemo(() => {
        if (!selectedDate) return events;
        return events.filter((e) => isSameDay(e.date, selectedDate));
    },[events, selectedDate]);

     const sortedEvents = useMemo(() => {
        return [...filteredEvents.sort((a,b) => a.date.getTime() - b.date.getTime())]
     },[filteredEvents]);

     if (sortedEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-12 text-center">
        <CalendarDays className="h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">
          {selectedDate
            ? `No events scheduled for ${formatShortDate(selectedDate)}`
            : "No upcoming events"}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {sortedEvents.map((event) => (
        <div key={event.id}>
          {!selectedDate && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {formatShortDate(event.date)}
            </p>
          )}
          <EventCard event={event} onDelete={onDeleteEvent} />
        </div>
      ))}
    </div>
  )
}

export default EventsList
