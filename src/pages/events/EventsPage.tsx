import { useState } from "react"

import type { Event } from "@/types/event.interface"

import EventsCalendar from "./components/EventsCalendar"
import HeroBanner from "@/components/hero/HeroBanner"
import Footer from "../store/components/Footer"
import CreateEventDialog from "./components/CreateEventDialog"
import type { EventCategory } from "@/types/eventCategory.interface"


// --- Sample Events ---

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

// --- Utilities ---

// --- Main Page ---

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  function handleDeleteEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  function handleAddEvent() {
    setCreateDialogOpen(true)
  }

    function handleCreateEvent(event: Event) {
    setEvents((prev) => [...prev, event])
  }

  return (
    <div>

      <main className="flex-1">
        <HeroBanner />        
        <EventsCalendar
          events={events}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
        />
        <CreateEventDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} selectedDate={selectedDate} onCreateEvent={handleCreateEvent} categoryConfig={CATEGORY_CONFIG} timeSlots={TIME_SLOTS}/>
      </main>
      <Footer />
    </div>
  )
}
