type SearchBarProps = {
  query: string
  onQueryChange: (value: string) => void
  compact?: boolean
}

export function SearchBar({
  query,
  onQueryChange,
  compact = false,
}: SearchBarProps) {
  return (
    <label
      className={`search ${compact ? 'search--compact' : ''}`.trim()}
      htmlFor="search-products"
    >
      <span className="search__label">Buscar productos</span>
      <span className="search__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path
            d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.44 4.44 1.06-1.06-4.44-4.44A6.5 6.5 0 0 0 10.5 4Zm0 1.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <input
        id="search-products"
        className="search__input"
        type="search"
        placeholder="Busca por nombre o categoria"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
    </label>
  )
}
