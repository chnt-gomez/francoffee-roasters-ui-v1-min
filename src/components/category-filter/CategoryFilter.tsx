interface Props {
    categories: string[],
    active: string,
    onChange: (cat: string) => void
}

const CategoryFilter = ({categories, active, onChange} : Props) => {
  return (
     <div className="flex flex-wrap items-center gap-2">
      { categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === cat
              ? "bg-foreground text-background"
              : "bg-secondary text-secondary-foreground hover:bg-border"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
