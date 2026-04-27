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
