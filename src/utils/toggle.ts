import { LANG } from "./constants"
import type { IToggle } from "./types"

export function toggle(prefix: string, { id, defaultOption: defaultOption, alternativeOption: alternativeOption }: IToggle) {
  const defaultElement = document.getElementById(`${prefix}-${defaultOption}`)
  const alternativeElement = document.getElementById(`${prefix}-${alternativeOption}`)

  if (localStorage.getItem(id) === alternativeOption) {
    defaultElement?.classList.remove("hidden")
  } else {
    alternativeElement?.classList.remove("hidden")
  }

  document.getElementById(`${prefix}-${id}`)?.addEventListener("click", () => {
    defaultElement?.classList.toggle("hidden")
    alternativeElement?.classList.toggle("hidden")

    const currentOption = localStorage.getItem(id)
    const isDefault = currentOption === defaultOption || (!currentOption && document.documentElement.classList.contains(defaultOption))

    if (isDefault) {
      document.documentElement.classList.remove(defaultOption)
      document.documentElement.classList.add(alternativeOption)
      localStorage.setItem(id, alternativeOption)
    } else {
      document.documentElement.classList.remove(alternativeOption)
      document.documentElement.classList.add(defaultOption)
      localStorage.setItem(id, defaultOption)
    }

    if (id === LANG.id) {
      const from = isDefault ? defaultOption : alternativeOption
      const to = isDefault ? alternativeOption : defaultOption

      if (window.location.href.includes(`/${from}/`)) {
        localStorage.setItem(id, to)
        window.location.href = window.location.href.replace(`/${from}/`, `/${to}/`)
        return
      }
    }
  })
}
