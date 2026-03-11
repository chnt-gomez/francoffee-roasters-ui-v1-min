import type { EventCategory } from "./eventCategory.interface"

export interface Event {
  id: string
  title: string
  date: Date
  time: string
  location: string
  description: string
  category: EventCategory
  attendees: number
}