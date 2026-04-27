type CategoryFilterProps = {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <section className="panel" id="categorias">
      <h2>Categorias</h2>
      <div className="chip-list">
        {categories.map((category) => {
          const isActive = selectedCategory === category

          return (
            <button
              key={category}
              type="button"
              className={`chip ${isActive ? 'chip--active' : ''}`.trim()}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          )
        })}
      </div>
    </section>
  )
}
