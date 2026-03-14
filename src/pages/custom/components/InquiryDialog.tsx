import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { InquiryForm } from "@/types/inquiryForm.interface"
import type { ServiceType } from "@/types/serviceType.interface"
import { CheckCircle2, GraduationCap, MessageCircle, Palette } from "lucide-react"
import { useState } from "react"

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    defaultService: ServiceType,
}

const SERVICE_CONFIG: Record<ServiceType, { label: string; icon: React.ElementType }> = {
  training: { label: "Craft Training", icon: GraduationCap },
  "custom-order": { label: "Custom Order", icon: Palette },
  consultation: { label: "Design Consultation", icon: MessageCircle },
}

const InquiryDialog = ({open, onOpenChange, defaultService} : Props) => {

    const [form, setForm] = useState<InquiryForm>({
        name: "",
        email: "",
        phone: "",
        serviceType: defaultService,
        message: "",
        preferredDate: "",
      })
      const [submitted, setSubmitted] = useState(false)

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
      }

      const handleClose = () => {
        onOpenChange(false);
        setTimeout(() => {
            setSubmitted(false);
            setForm({
                name: "",
                email: "",
                phone: "",
                serviceType: defaultService,
                message: "",
                preferredDate: ""
            })
        }, 200)
      }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <DialogTitle className="font-serif text-xl">Thank You!</DialogTitle>
            <DialogDescription className="max-w-xs">
              {"We've received your inquiry and will get back to you within 24 hours."}
            </DialogDescription>
            <Button onClick={handleClose} className="mt-2">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">Request Information</DialogTitle>
              <DialogDescription>
                Tell us about your project and we will reach out to schedule a consultation.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Your Name</FieldLabel>
                  <Input
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Phone</FieldLabel>
                    <Input
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Service Type</FieldLabel>
                  <Select
                    value={form.serviceType}
                    onValueChange={(v) => setForm({ ...form, serviceType: v as ServiceType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SERVICE_CONFIG).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Preferred Date (Optional)</FieldLabel>
                  <Input
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                  />
                </Field>
                <Field>
                  <FieldLabel>Tell Us About Your Project</FieldLabel>
                  <Textarea
                    placeholder="Describe what you're looking for..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    required
                  />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">Submit Inquiry</Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default InquiryDialog
