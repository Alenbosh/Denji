import { useState } from "react"
import { useSubjects } from "../SubjectContext"

export function SubjectCreate() {
  const { addSubject } = useSubjects()
  const [value, setValue] = useState("")

  return (
    <input
      className="subject-create"
      placeholder="Add subject…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          addSubject(value)
          setValue("")
        }
        if (e.key === "Escape") {
          setValue("")
        }
      }}
    />
  )
}
