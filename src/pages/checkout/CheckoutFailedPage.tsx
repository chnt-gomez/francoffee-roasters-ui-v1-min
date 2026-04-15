import { XCircle, ArrowLeft, Home, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router"

export default function CheckoutFailedPage() {
    return (

        <div className="flex min-h-screen flex-col bg-background">
            {/* Header */}
            <header className="border-b border-border bg-background/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link to="/" className="font-serif text-2xl tracking-tight text-foreground">
                        Francofee Logo
                    </Link>
                    <Link to="/" className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                            <Home className="h-4 w-4" />
                            Back to Shop
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 items-center justify-center px-6 py-16">
                <Card className="w-full max-w-lg">
                    <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
                        {/* Failed Icon */}
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                            <XCircle className="h-10 w-10 text-red-600" />
                        </div>

                        {/* Title */}
                        <div className="flex flex-col gap-2">
                            <h1 className="font-serif text-3xl text-foreground">
                                Parece que algo no salió bien
                            </h1>
                            <p className="text-muted-foreground">
                                No fué posible procesar tu pago. Puedes intentarlo de nuevo o usar un método distinto de pago.
                            </p>
                        </div>

                        <Separator />

                        {/* Possible Reasons */}
                        <div className="flex w-full flex-col gap-3 rounded-lg bg-secondary/50 p-4 text-left">
                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <HelpCircle className="h-4 w-4" />
                                ¿Por qué falló mi pago?
                            </div>
                            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                                    Nuestro socio de pagos no acepta el método de pago que usaste.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                                    Hay un error con la información que usaste para procesar el pago.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                                    Tu banco ha declinado la transacción.
                                </li>
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="flex w-full flex-col gap-3 pt-2">
                            <Link to="/" className="w-full">
                                <Button variant="outline" size="lg" className="w-full gap-2">
                                    <ArrowLeft className="h-4 w-4" />
                                    Regresar a la tienda
                                </Button>
                            </Link>
                            <Link to="/contact" className="w-full">
                                <Button variant="ghost" size="lg" className="w-full">
                                    ¿Necesitas ayuda?
                                </Button>
                            </Link>
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