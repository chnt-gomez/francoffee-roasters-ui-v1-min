import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { ContactFormType } from '@/types/contactForm.interface'
import { CheckCircle2, Send } from 'lucide-react';
import React, { useState } from 'react'

const ContactForm = () => {

    const [form, setForm] = useState<ContactFormType>({
        name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    }

    if (submitted) {
        return (
          <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </div>
        <h3 className="font-serif text-xl text-foreground">Message Sent!</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSubmitted(false)
            setForm({ name: "", email: "", phone: "", subject: "", message: "" })
          }}
        >
          Send Another Message
        </Button>
      </div> 
        )
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel>Your Name</FieldLabel>
            <Input
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Field>
          <Field>
            <FieldLabel>Email Address</FieldLabel>
            <Input
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel>Phone (Optional)</FieldLabel>
            <Input
              type="tel"
              placeholder="(555) 123-4567"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel>Subject</FieldLabel>
            <Select
              value={form.subject}
              onValueChange={(v) => setForm({ ...form, subject: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="order">Order Question</SelectItem>
                <SelectItem value="custom">Custom Order</SelectItem>
                <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                <SelectItem value="press">Press & Media</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field>
          <FieldLabel>Your Message</FieldLabel>
          <Textarea
            placeholder="Tell us how we can help..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={5}
            required
          />
        </Field>
      </FieldGroup>
      <Button type="submit" size="lg" className="gap-2">
        <Send className="h-4 w-4" />
        Send Message
      </Button>
    </form>
  )
}

export default ContactForm
