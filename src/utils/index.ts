import { type IPage } from "./types";

export function formatDate(date: string | number | Date): string {
  return date ? new Date(date).toLocaleDateString('pt-BR') : '--/--/----'
}

export function newIPageMock(data: any[]): IPage {
  return {
    data: data.map((item) => ({
      frontmatter: {
        hero: item.hero,
        title: item.title,
        pubDate: item.pubDate,
      },
      url: item.url
    })),
    start: 1,
    end: 1,
    size: data.length,
    total: 1,
    currentPage: 1,
    lastPage: 1,
    url: {
      current: data[0].url,
      prev: undefined,
      next: undefined,
    },
  }
}

export function enableCopyToClipboardButton() {
  const copyButtonLabel = "Copy🪄";

  document.querySelectorAll("pre").forEach((preBlock: HTMLPreElement) => {
    if (navigator.clipboard) {
      let wrapper = document.createElement("div");
      wrapper.className = "copy-wrapper";

      preBlock?.parentNode?.insertBefore(wrapper, preBlock);
      preBlock.setAttribute("tabindex", "0");

      let copy = document.createElement("button");
      copy.className = "copy-button";
      copy.innerHTML = copyButtonLabel;

      wrapper.appendChild(copy);
      wrapper.appendChild(preBlock);

      const copyOnClick = async () => {
        let code = preBlock.querySelector("code");
        await navigator.clipboard.writeText(code?.innerText ?? "");
        copy.innerText = "Copied✨";
        setTimeout(() => {
          copy.innerText = copyButtonLabel;
        }, 1500);
      }

      copy.addEventListener("click", copyOnClick );
      preBlock.addEventListener("click", copyOnClick );
    }
  });
}
