import { Separator } from "@base-ui/react"

const Footer = () => {
  return (
     <footer id="contact" className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-xl text-foreground">Francofee</h3>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Curated goods for the modern home. Thoughtfully sourced, beautifully made.
          </p>
        </div>
        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shop</p>
            <a href="#products" className="text-sm text-foreground transition-colors hover:text-muted-foreground">All Products</a>
            <a href="#products" className="text-sm text-foreground transition-colors hover:text-muted-foreground">Kitchen</a>
            <a href="#products" className="text-sm text-foreground transition-colors hover:text-muted-foreground">Home</a>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Company</p>
            <a href="#about" className="text-sm text-foreground transition-colors hover:text-muted-foreground">About</a>
            <a href="#contact" className="text-sm text-foreground transition-colors hover:text-muted-foreground">Contact</a>
            <a href="#" className="text-sm text-foreground transition-colors hover:text-muted-foreground">Shipping</a>
          </div>
        </div>
      </div>
      <Separator />
      <div className="mx-auto max-w-7xl px-6 py-6">
        <p className="text-xs text-muted-foreground">
          {'2026 Francoffee. All rights reserved.'}
        </p>
      </div>
    </footer>
  )
}

export default Footer
