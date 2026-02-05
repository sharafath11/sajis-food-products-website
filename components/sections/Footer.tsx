'use client'

export default function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid gap-6 text-center sm:text-left">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">
              Manufactured &amp; Marketed By
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 text-sm text-muted-foreground">
            <div className="space-y-1">
              <p className="text-foreground">Sajis Food Products</p>
              <p>Kuttichira, Kozhikode – 673003</p>
            </div>
            <div className="space-y-1 sm:text-right">
              <p>FSSAI License No: 21325242000947</p>
              <p>Customer Care: 9961585808</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground/80">
            FSSAI Licensed Food Business Operator
          </p>
        </div>
      </div>
    </footer>
  )
}
