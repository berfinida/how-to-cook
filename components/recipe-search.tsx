"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { findIngredientMatches } from "@/lib/ingredient-matcher";
import type { LocalizedRecipe } from "@/lib/recipes";
import { RecipeCard } from "./recipe-card";

export function RecipeSearch({ locale, labels, recipes }: { locale: Locale; labels: { search: string; all: string; quick: string; empty: string; result: string; pantry: string; pantryHint: string; matched: string; missing: string } ; recipes: LocalizedRecipe[] }) {
  const [query, setQuery] = useState(""); const [category, setCategory] = useState(labels.all); const [quickOnly, setQuickOnly] = useState(false); const [pantry, setPantry] = useState("");
  const categories = [labels.all, ...new Set(recipes.map((recipe) => recipe.copy.category).filter(Boolean))];
  const results = useMemo(() => recipes
    .map((recipe) => ({ recipe, ingredientMatch: findIngredientMatches(recipe.copy.ingredients, pantry) }))
    .filter(({ recipe }) => { const copy = recipe.copy; const haystack = `${copy.title} ${copy.description} ${copy.ingredients.join(" ")}`.toLocaleLowerCase(locale); return (category === labels.all || copy.category === category) && (!quickOnly || recipe.prep + recipe.cook <= 30) && haystack.includes(query.toLocaleLowerCase(locale)); })
    .sort((first, second) => pantry.trim() ? second.ingredientMatch.matched.length - first.ingredientMatch.matched.length : 0), [category, labels.all, locale, pantry, query, quickOnly, recipes]);
  return <><div className="filters"><label><Search aria-hidden="true" size={19}/><span className="sr-only">{labels.search}</span><input aria-label={labels.search} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.search}/></label><button type="button" className={`quick-filter ${quickOnly ? "active" : ""}`} aria-pressed={quickOnly} onClick={() => setQuickOnly((value) => !value)}>{labels.quick}</button></div><details className="pantry-finder"><summary>{labels.pantry}</summary><label><span className="sr-only">{labels.pantry}</span><textarea value={pantry} onChange={(event) => setPantry(event.target.value)} placeholder={labels.pantryHint}/></label></details><div className="archive-bar"><div className="chips" aria-label="Categories">{categories.map((item) => <button type="button" aria-pressed={item === category} key={item} className={item === category ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div><strong aria-live="polite">{results.length} {labels.result}</strong></div>{results.length ? <div className="recipe-grid">{results.map(({ recipe, ingredientMatch }) => <div key={recipe.slug} className="recipe-result"><RecipeCard recipe={recipe}/>{pantry.trim() ? <p className="ingredient-match"><span>{ingredientMatch.matched.length} {labels.matched}</span><span>{ingredientMatch.missing.length} {labels.missing}</span></p> : null}</div>)}</div> : <div className="empty-state" role="status">{labels.empty}</div>}</>;
}
