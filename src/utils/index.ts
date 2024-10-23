export function formatDate(date: string | number | Date): string {
  return date ? new Date(date).toLocaleDateString('pt-BR') : '--/--/----'
}

export function enableCopyToClipboardButton() {
  const copyButtonLabel = "Copy🪄"

  document.querySelectorAll("pre").forEach((preBlock: HTMLPreElement) => {
    if (navigator.clipboard) {
      const wrapper = document.createElement("div")
      wrapper.className = "tag-wrapper"

      preBlock?.parentNode?.insertBefore(wrapper, preBlock)
      preBlock.setAttribute("tabindex", "0")

      const copy = document.createElement("button")
      copy.className = "tag"
      copy.innerHTML = copyButtonLabel

      wrapper.appendChild(copy)
      wrapper.appendChild(preBlock)

      const copyOnClick = async () => {
        const code = preBlock.querySelector("code")
        await navigator.clipboard.writeText(code?.innerText ?? "")
        copy.innerText = "Copied✨"
        setTimeout(() => {
          copy.innerText = copyButtonLabel
        }, 1500)
      }

      copy.addEventListener("click", copyOnClick)
      preBlock.addEventListener("click", copyOnClick)
    }
  })
}
