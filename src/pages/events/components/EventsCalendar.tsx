import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import type { Event } from "@/types/event.interface"
import { ArrowLeft, Plus } from "lucide-react"
import { useMemo } from "react"
import EventsList from "./EventsList"

interface Props {
    events: Event[],
    selectedDate: Date | undefined,
    onAddEvent: () => void,
    onSelectDate: (date: Date | undefined) => void,
    onDeleteEvent: (id: string) => void
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

const EventsCalendar = ({events, selectedDate, onSelectDate, onAddEvent, onDeleteEvent}: Props) => {
  const eventDates = useMemo(() => {
      return events.map((e) => e.date)
    }, [events])
  
    return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Calendar */}
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onSelectDate}
              modifiers={{
                hasEvent: eventDates,
              }}
              modifiersClassNames={{
                hasEvent: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-accent",
              }}
              className="rounded-md"
            />
          </div>
          <Button onClick={onAddEvent} className="w-full gap-2" disabled={!selectedDate}>
            <Plus className="h-4 w-4" />
            Add Event {selectedDate && `on ${formatShortDate(selectedDate)}`}
          </Button>
          {selectedDate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSelectDate(undefined)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              View All Events
            </Button>
          )}
        </div>

        {/* Events List */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-serif text-xl text-foreground">
              {selectedDate ? formatDate(selectedDate) : "All Upcoming Events"}
            </h3>
            <Badge variant="secondary" className="font-normal">
              {events.filter((e) => !selectedDate || isSameDay(e.date, selectedDate)).length} events
            </Badge>
          </div>
          <EventsList
            events={events}
            selectedDate={selectedDate}
            onDeleteEvent={onDeleteEvent}
          />
        </div>
      </div>
    </section>
  )
}

export default EventsCalendar
