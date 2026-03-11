import { Badge } from "@/components/ui/badge"
import type { EventCategory } from "@/types/eventCategory.interface"
import type { Event } from "@/types/event.interface"
import { Clock, MapPin, Trash2, Users } from "lucide-react"

interface Props {
    event: Event,
    onDelete: (id: string) => void
}

const CATEGORY_CONFIG: Record<EventCategory, { label: string; color: string }> = {
  workshop: { label: "Workshop", color: "bg-amber-100 text-amber-800" },
  tasting: { label: "Tasting", color: "bg-rose-100 text-rose-800" },
  meetup: { label: "Meetup", color: "bg-sky-100 text-sky-800" },
  sale: { label: "Sale", color: "bg-emerald-100 text-emerald-800" },
  other: { label: "Other", color: "bg-stone-100 text-stone-800" },
}

const EventCard = ({ event, onDelete} : Props) => {

    const categoryConfig = CATEGORY_CONFIG[event.category];

  return (
    <div className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <Badge variant="secondary" className={categoryConfig.color}>
            {categoryConfig.label}
          </Badge>
          <h4 className="font-semibold text-foreground">{event.title}</h4>
        </div>
        <button
          onClick={() => onDelete(event.id)}
          className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-secondary hover:text-destructive group-hover:opacity-100"
          aria-label="Delete event"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {event.description}
      </p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {event.time}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {event.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          {event.attendees} attending
        </span>
      </div>
    </div>
  )
}

export default EventCard
