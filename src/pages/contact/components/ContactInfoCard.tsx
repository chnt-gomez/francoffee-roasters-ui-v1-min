import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

interface Props {
    icon: React.ElementType
    title: string,
    children: React.ReactNode
}

const ContactInfoCard = ({icon: Icon, title, children}: Props) => {
  return (
    <Card className="border-border bg-card">
      <CardContent className="flex flex-col gap-3 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
      </CardContent>
    </Card>
  )
}

export default ContactInfoCard
