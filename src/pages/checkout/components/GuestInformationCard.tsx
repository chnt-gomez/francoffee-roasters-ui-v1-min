import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { User } from 'lucide-react'
import useCheckout from '../hooks/useCheckout'

const GuestInformationCard = () => {

  const { errors, guestInfo, handleGuestInfoChange } = useCheckout();

  return (
    <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif text-xl">
                    <User className="h-5 w-5" />
                    Guest Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FieldGroup>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={guestInfo.name}
                          onChange={(e) =>
                           handleGuestInfoChange('name', e.target.value)
                          }
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && <FieldError>{errors.name}</FieldError>}
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={guestInfo.phone}
                          onChange={(e) =>
                            handleGuestInfoChange('phone', e.target.value )
                          }
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && <FieldError>{errors.phone}</FieldError>}
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel htmlFor="email">Email Address</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={guestInfo.email}
                        onChange={(e) =>
                          handleGuestInfoChange('email', e.target.value )
                        }
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <FieldError>{errors.email}</FieldError>}
                      <p className="text-xs text-muted-foreground">
                        We&apos;ll send your order confirmation to this email
                      </p>
                    </Field>
                  </FieldGroup>
                </CardContent>
              </Card>
  )
}

export default GuestInformationCard
