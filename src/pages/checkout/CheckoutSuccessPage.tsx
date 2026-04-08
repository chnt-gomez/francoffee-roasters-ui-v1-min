import { CheckCircle2, Package, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link, useSearchParams } from "react-router"

export default function CheckoutSuccessPage() {
    const [searchParams] = useSearchParams();

    const orderNumber = searchParams.get('external_reference');
    const paymentId = searchParams.get('payment_id');

    return (
        <div className="flex min-h-screen flex-col bg-background">
            {/* Header */}
            <header className="border-b border-border bg-background/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link to="/" className="font-serif text-2xl tracking-tight text-foreground">
                        Francofee
                    </Link>
                    <Button variant="ghost" size="sm" asChild>
                        <Link to="/" className="gap-2">
                            <Home className="h-4 w-4" />
                            Back to Shop
                        </Link>
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 items-center justify-center px-6 py-16">
                <Card className="w-full max-w-lg">
                    <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
                        {/* Success Icon */}
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>

                        {/* Title */}
                        <div className="flex flex-col gap-2">
                            <h1 className="font-serif text-3xl text-foreground">
                                Payment Successful
                            </h1>
                            <p className="text-muted-foreground">
                                Thank you for your order! Your payment has been processed successfully.
                            </p>
                        </div>

                        <Separator />

                        {/* Order Info */}
                        <div className="flex w-full flex-col gap-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Order Number</span>
                                <span className="font-mono font-semibold text-foreground">
                                    # {orderNumber}
                                </span>
                            </div>
                            {paymentId && (
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Payment ID</span>
                                    <span className="text-xs font-mono text-muted-foreground">
                                        {paymentId}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Status</span>
                                <span className="flex items-center gap-1.5 font-medium text-green-600">
                                    <span className="h-2 w-2 rounded-full bg-green-600" />
                                    Confirmed
                                </span>
                            </div>
                        </div>

                        <Separator />

                        {/* Next Steps */}
                        <div className="flex w-full flex-col gap-3 rounded-lg bg-secondary/50 p-4 text-left">
                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <Package className="h-4 w-4" />
                                What happens next?
                            </div>
                            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                                    You will receive an email confirmation shortly.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                                    Our team will prepare your order for shipping.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                                    Tracking information will be sent once dispatched.
                                </li>
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="flex w-full flex-col gap-3 pt-2">
                            <Button size="lg" asChild className="w-full gap-2">
                                <Link to="/">
                                    Continue Shopping
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild className="w-full">
                                <Link to="/contact">Contact Support</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>

            {/* Footer */}
            <footer className="border-t border-border py-6">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <p className="text-xs text-muted-foreground">
                        {"2026 Francofee. All rights reserved."}
                    </p>
                </div>
            </footer>
        </div>
    )
}