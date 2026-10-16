"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { LocalizedRecipe } from "@/lib/recipes";
import { RecipeCard } from "./recipe-card";

export function RecipeSearch({ locale, labels, recipes }: { locale: Locale; labels: { search: string; all: string; empty: string }; recipes: LocalizedRecipe[] }) {
  const [query, setQuery] = useState(""); const [category, setCategory] = useState(labels.all);
  const categories = [labels.all, ...new Set(recipes.map((recipe) => recipe.copy.category).filter(Boolean))];
  const results = useMemo(() => recipes.filter((recipe) => { const copy = recipe.copy; const haystack = `${copy.title} ${copy.description} ${copy.ingredients.join(" ")}`.toLocaleLowerCase(locale); return (category === labels.all || copy.category === category) && haystack.includes(query.toLocaleLowerCase(locale)); }), [category, labels.all, locale, query, recipes]);
  return <><div className="filters"><label><Search aria-hidden="true" size={19}/><span className="sr-only">{labels.search}</span><input aria-label={labels.search} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.search}/></label><div className="chips" aria-label="Categories">{categories.map((item) => <button type="button" aria-pressed={item === category} key={item} className={item === category ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div></div>{results.length ? <div className="recipe-grid">{results.map((recipe) => <RecipeCard key={recipe.slug} recipe={recipe}/>)}</div> : <div className="empty-state" role="status">{labels.empty}</div>}</>;
}
