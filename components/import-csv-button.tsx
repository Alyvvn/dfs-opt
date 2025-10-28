"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

type ImportCsvButtonProps = {
  onFileSelected?: (file: File) => void
  size?: React.ComponentProps<typeof Button>["size"]
  variant?: React.ComponentProps<typeof Button>["variant"]
  className?: string
  children?: React.ReactNode
}

export function ImportCsvButton({
  onFileSelected,
  size = "sm",
  variant = "outline",
  className,
  children,
}: ImportCsvButtonProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  function handleClick() {
    inputRef.current?.click()
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file && file.type === "text/csv") {
      onFileSelected?.(file)
    } else if (file) {
      // Allow .csv without mime type in some browsers
      const isCsvByName = file.name.toLowerCase().endsWith(".csv")
      if (isCsvByName) onFileSelected?.(file)
    }
    // reset so selecting the same file again triggers change
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={handleChange}
      />
      <Button onClick={handleClick} size={size} variant={variant} className={className}>
        <Download className="w-4 h-4 mr-2" />
        {children ?? "Import CSV"}
      </Button>
    </>
  )
}


