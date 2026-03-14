import EventsCalendar from "./components/EventsCalendar"
import HeroBanner from "./components/HeroBanner"

export default function EventsPage() {

  return (
    <div>

      <main className="flex-1">
        <HeroBanner />        
        <EventsCalendar />
    
      </main>
    </div>
  )
}
