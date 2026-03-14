import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import type { Event } from "@/types/event.interface"
import { ArrowLeft, Plus } from "lucide-react"
import { useMemo, useState } from "react"
import EventsList from "./EventsList"
import CreateEventDialog from "./CreateEventDialog"
import type { EventCategory } from "@/types/eventCategory.interface"

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


const INITIAL_EVENTS: Event[] = [
  {
    id: "1",
    title: "Leather Care Workshop",
    date: new Date(2026, 2, 15),
    time: "02:00 PM",
    location: "Francofee Studio",
    description: "Learn how to care for and maintain your leather goods with our master craftsman.",
    category: "workshop",
    attendees: 12,
  },
  {
    id: "2",
    title: "Spring Collection Preview",
    date: new Date(2026, 2, 20),
    time: "06:00 PM",
    location: "Francofee Flagship Store",
    description: "Be the first to see our new spring collection with exclusive early access to shop.",
    category: "sale",
    attendees: 45,
  },
  {
    id: "3",
    title: "Coffee Tasting Event",
    date: new Date(2026, 2, 22),
    time: "10:00 AM",
    location: "Partner Roastery",
    description: "Sample artisanal coffees paired with our ceramic pour-over collection.",
    category: "tasting",
    attendees: 20,
  },
]

const CATEGORY_CONFIG: Record<EventCategory, { label: string; color: string }> = {
  workshop: { label: "Workshop", color: "bg-amber-100 text-amber-800" },
  tasting: { label: "Tasting", color: "bg-rose-100 text-rose-800" },
  meetup: { label: "Meetup", color: "bg-sky-100 text-sky-800" },
  sale: { label: "Sale", color: "bg-emerald-100 text-emerald-800" },
  other: { label: "Other", color: "bg-stone-100 text-stone-800" },
}

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
]



const EventsCalendar = () => {

    function handleDeleteEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  function handleAddEvent() {
    setCreateDialogOpen(true)
  }

    function handleCreateEvent(event: Event) {
    setEvents((prev) => [...prev, event])
  }

  function handleSelectDate(date: Date | undefined) {
    setSelectedDate(date);
  }

     const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const eventDates = useMemo(() => {
      return INITIAL_EVENTS.map((e) => e.date)
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
              onSelect={handleSelectDate}
              modifiers={{
                hasEvent: eventDates,
              }}
              modifiersClassNames={{
                hasEvent: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-accent",
              }}
              className="rounded-md"
            />
          </div>
          <Button onClick={handleAddEvent} className="w-full gap-2" disabled={!selectedDate}>
            <Plus className="h-4 w-4" />
            Add Event {selectedDate && `on ${formatShortDate(selectedDate)}`}
          </Button>
          {selectedDate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSelectDate(undefined)}
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
            onDeleteEvent={handleDeleteEvent}
          />
        </div>
      </div>
      <CreateEventDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} selectedDate={selectedDate} onCreateEvent={handleCreateEvent} categoryConfig={CATEGORY_CONFIG} timeSlots={TIME_SLOTS}/>
    </section>
  )
}

export default EventsCalendar
