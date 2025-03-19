import DOMPurify from "dompurify"
import Fuse from "fuse.js"

interface ISearchData {
  item: ISearchItem
  refIndex?: number
  score?: number
}

interface ISearchItem {
  collection: string
  urn: string
  title: string
  description: string
  date: string
  tags: string
  body: string
}
export function enableSearch() {
  const BODY_LENGTH = 100
  let PREV_QUERY: string | undefined
  let SEARCH_DATA: ISearchItem[]
  let FUSE_INSTANCE: Fuse<ISearchItem>
  const FUSE_OPTIONS = {
    includeScore: true,
    shouldSort: true,
    threshold: 0.4,
    keys: [
      {
        name: "title",
        weight: 1,
      },
      {
        name: "description",
        weight: 0.75,
      },
      {
        name: "body",
        weight: 0.5,
      },
    ],
  }

  const searchResults = {
    element: document.getElementById("searchResults") as HTMLElement,
    show() {
      this.element.style.display = "block"
    },
    hide() {
      this.element.style.display = "none"
    },
    clear() {
      while (this.element.firstChild) this.element.removeChild(this.element.firstChild)
    },
    showEmpty(query?: string) {
      const searchResultItem = document.createElement("div")
      searchResultItem.className = "searchResultItem"
      searchResultItem.innerHTML = `No results found for query ${query ?? ""}`
      this.element.append(searchResultItem)
    },
    add(result: ISearchData) {
      const resultPage = document.createElement("div")
      resultPage.style.marginBottom = "2rem"
      resultPage.className = "searchResultItem"

      const resultTitle = document.createElement("a")
      resultTitle.className = "searchResultTitle"
      resultTitle.href = result.item.urn
      resultTitle.innerHTML = `[${result.item.collection}] ${result.item.title}`
      resultPage.append(resultTitle)

      const resultBody = document.createElement("div")
      resultBody.className = "searchResultBody"
      resultBody.innerHTML = (result.item.description ?? result.item.body)?.substring(0, BODY_LENGTH) ?? ""
      resultPage.append(resultBody)
      this.element.append(resultPage)
    },
    updateMetadata(query?: string) {
      document.title = query ? `Search results for “${query}”` : "Search the Blog"
    },
    updateHistory(query?: string) {
      if (query) {
        const url = new URL(window.location.href)
        url.searchParams.set("query", query)
        window.history.replaceState(null, "", url)
      }
    },
  }

  async function search(query: string): Promise<ISearchData[] | undefined> {
    if (query?.length === 0) return
    if (!SEARCH_DATA) {
      try {
        const res = await fetch("/search/search-index.json")
        if (!res.ok) {
          throw new Error("Something went wrong… please try again")
        }
        const data = await res.json()
        SEARCH_DATA = data
      } catch (e) {
        console.error(e)
      }
    }
    if (SEARCH_DATA && query?.startsWith("#")) {
      const tag = query?.substring(1)?.toLocaleLowerCase()
      return SEARCH_DATA.filter((item) => item.tags.includes(tag))
        .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
        .map((item) => {
          return { item }
        })
    } else {
      if (SEARCH_DATA && !FUSE_INSTANCE) {
        FUSE_INSTANCE = new Fuse(SEARCH_DATA, FUSE_OPTIONS)
      }
      if (!FUSE_INSTANCE) return
      return FUSE_INSTANCE.search(query)?.sort((a: ISearchData, b: ISearchData) => (a.refIndex ?? 0) - (b.refIndex ?? 0))
    }
  }

  async function triggerSearch(query: string) {
    // Only trigger a search when 2 chars. at least have been provided and the query has changed
    if (query.length < 2) {
      searchResults.hide()
      return
    } else if (PREV_QUERY === query) {
      return
    }
    // Display search results
    PREV_QUERY = query
    searchResults.clear()
    const searchResultList = await search(query)
    searchResults.updateMetadata(query)
    if ((searchResultList ?? []).length > 0) {
      (searchResultList ?? []).forEach((result: ISearchData) => searchResults.add(result))
      searchResults.show()
    } else {
      searchResults.clear()
      searchResults.showEmpty()
    }
  }

  const searchBox = document.getElementById("searchBox") as HTMLInputElement
  searchBox.addEventListener("input", () => {
    const query = DOMPurify.sanitize(searchBox.value)
    triggerSearch(query)
    searchResults.updateHistory(query)
  })

  window.addEventListener("DOMContentLoaded", () => {
    const query = DOMPurify.sanitize(new URLSearchParams(window.location.search).get("query") ?? "")
    triggerSearch(query)
    searchBox.value = query
    searchBox.focus()
  })
}
