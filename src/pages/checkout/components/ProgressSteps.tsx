const ProgressSteps = () => {
  return (
    <div className="mb-10 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                1
              </div>
              <span className="text-sm font-medium text-foreground">Details</span>
            </div>
            <div className="h-px w-12 bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-muted-foreground">
                2
              </div>
              <span className="text-sm text-muted-foreground">Payment</span>
            </div>
            <div className="h-px w-12 bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-muted-foreground">
                3
              </div>
              <span className="text-sm text-muted-foreground">Confirmation</span>
            </div>
          </div>
  )
}

export default ProgressSteps
