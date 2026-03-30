import { Link } from 'react-router'

const CheckoutFooter = () => {
  return (
    <footer className="border-t border-border py-6">
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  {"2026 Francofee. All rights reserved."}
                </p>
                <div className="flex items-center gap-4">
                  <Link
                    to="/"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Return to Shop
                  </Link>
                  <Link
                    to="/contact"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Need Help?
                  </Link>
                </div>
              </div>
            </div>
          </footer>
  )
}

export default CheckoutFooter
