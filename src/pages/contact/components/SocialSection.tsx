import { Instagram, Linkedin, Twitter } from 'lucide-react'

const SOCIAL_LINKS = [
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/francofee" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/francofee" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/company/francofee" },
]

const SocialSection = () => {
  return (
    <section className="border-t border-border bg-secondary/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 text-center">
        <h3 className="font-serif text-xl text-foreground">Follow Our Journey</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          Stay connected with us on social media for behind-the-scenes content, new arrivals, and artisan spotlights.
        </p>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-accent hover:text-accent"
              aria-label={`Follow us on ${social.name}`}
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialSection
