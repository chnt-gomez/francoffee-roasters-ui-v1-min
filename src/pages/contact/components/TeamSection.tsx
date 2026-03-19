import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"


const TEAM_MEMBERS = [
  {
    name: "Elena Marchetti",
    role: "Founder & Creative Director",
    bio: "With over 15 years in artisanal craftsmanship, Elena founded Francofee to bring thoughtful design to everyday living.",
    email: "elena@francofee.com",
  },
  {
    name: "Marcus Chen",
    role: "Head of Operations",
    bio: "Marcus ensures every product meets our quality standards and reaches customers with care and precision.",
    email: "marcus@francofee.com",
  },
  {
    name: "Sofia Andersson",
    role: "Customer Experience Lead",
    bio: "Sofia is dedicated to making every interaction with Francofee a delightful experience from start to finish.",
    email: "sofia@francofee.com",
  },
]

const TeamSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Meet the Team
        </p>
        <h3 className="font-serif text-2xl tracking-tight text-foreground md:text-4xl">
          The people behind Francofee
        </h3>
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
          A small team with a big passion for craftsmanship and customer care.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM_MEMBERS.map((member) => (
          <Card key={member.name} className="border-border bg-card">
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary font-serif text-xl text-foreground">
                {member.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground">{member.name}</h4>
                <p className="text-sm text-accent">{member.role}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-sm text-foreground transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4" />
                {member.email}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default TeamSection
