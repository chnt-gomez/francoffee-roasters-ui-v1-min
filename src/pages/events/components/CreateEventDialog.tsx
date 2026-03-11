import type { EventCategory } from "@/types/eventCategory.interface"
import type { Event } from "@/types/event.interface"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    selectedDate: Date | undefined,
    onCreateEvent: (event:Event) => void,
    timeSlots: string[],
    categoryConfig : Record<EventCategory, { label: string; color: string }>
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

const CreateEventDialog = ({open, onOpenChange, selectedDate, onCreateEvent, timeSlots, categoryConfig} : Props) => {

    const [title, setTitle] = useState("")
      const [time, setTime] = useState("")
      const [location, setLocation] = useState("")
      const [description, setDescription] = useState("")
      const [category, setCategory] = useState<EventCategory>("workshop")
      const [attendees, setAttendees] = useState("10")

      function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDate || !title || !time || !location) return

    const newEvent: Event = {
      id: generateId(),
      title,
      date: selectedDate,
      time,
      location,
      description,
      category,
      attendees: parseInt(attendees) || 10,
    }

    onCreateEvent(newEvent)
    resetForm()
    onOpenChange(false)
  }

  function resetForm() {
    setTitle("")
    setTime("")
    setLocation("")
    setDescription("")
    setCategory("workshop")
    setAttendees("10")
  }
      
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Schedule Event</DialogTitle>
          <DialogDescription>
            {selectedDate
              ? `Create an event for ${formatDate(selectedDate)}`
              : "Select a date first"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup>
            <Field>
              <FieldLabel>Event Title</FieldLabel>
              <Input
                placeholder="e.g., Leather Care Workshop"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Time</FieldLabel>
                <Select value={time} onValueChange={setTime} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Category</FieldLabel>
                <Select value={category} onValueChange={(v) => setCategory(v as EventCategory)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field>
              <FieldLabel>Location</FieldLabel>
              <Input
                placeholder="e.g., Francofee Studio"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel>Expected Attendees</FieldLabel>
              <Input
                type="number"
                min="1"
                placeholder="10"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                placeholder="Describe the event..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedDate || !title || !time || !location}>
              Create Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEventDialog
