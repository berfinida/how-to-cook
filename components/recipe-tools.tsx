"use client";

import { Check, ClipboardCopy, Heart, Minus, Plus, Printer, Share2 } from "lucide-react";
import { useMemo, useState } from "react";
import { readShoppingList } from "@/lib/shopping-list";

type RecipeToolsLabels = {
  addToList: string;
  addedToList: string;
  copyLink: string;
  copied: string;
  favorite: string;
  print: string;
  servings: string;
  savedLocally: string;
};

function scaleIngredient(ingredient: string, factor: number) {
  const match = ingredient.match(/^(\d+(?:[.,]\d+)?)(\s|\/)/u);
  if (!match) return ingredient;
  const originalAmount = Number(match[1].replace(",", "."));
  if (!Number.isFinite(originalAmount)) return ingredient;
  const scaledAmount = Math.round(originalAmount * factor * 100) / 100;
  return ingredient.replace(match[1], String(scaledAmount).replace(".", ","));
}

export function RecipeTools({ ingredients, labels, recipeSlug, servings, title }: { ingredients: string[]; labels: RecipeToolsLabels; recipeSlug: string; servings: number; title: string }) {
  const [currentServings, setCurrentServings] = useState(servings);
  const [completedIngredients, setCompletedIngredients] = useState<string[]>([]);
  const [listAdded, setListAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const scaledIngredients = useMemo(() => ingredients.map((ingredient) => scaleIngredient(ingredient, currentServings / servings)), [currentServings, ingredients, servings]);

  function saveShoppingList() {
    const existingItems = readShoppingList(window.localStorage.getItem("how-to-cook-shopping-list"));
    const nextItems = [...existingItems.filter((item) => item.recipeSlug !== recipeSlug), ...scaledIngredients.map((ingredient) => ({ recipeSlug, ingredient, title }))];
    window.localStorage.setItem("how-to-cook-shopping-list", JSON.stringify(nextItems));
    window.dispatchEvent(new Event("how-to-cook-shopping-list"));
    setListAdded(true);
  }

  async function shareRecipe() {
    const shareData = { title, url: window.location.href };
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  }

  function toggleFavorite() {
    const storedSlugs = window.localStorage.getItem("how-to-cook-favorites");
    let favorites: string[] = [];
    try {
      const parsedSlugs: unknown = storedSlugs ? JSON.parse(storedSlugs) : [];
      favorites = Array.isArray(parsedSlugs) ? parsedSlugs.filter((slug): slug is string => typeof slug === "string") : [];
    } catch {
      favorites = [];
    }
    const nextFavorites = favorites.includes(recipeSlug) ? favorites.filter((slug) => slug !== recipeSlug) : [...favorites, recipeSlug];
    window.localStorage.setItem("how-to-cook-favorites", JSON.stringify(nextFavorites));
    setFavorited(nextFavorites.includes(recipeSlug));
  }

  return <div className="recipe-tools">
    <div className="serving-control" aria-label={labels.servings}>
      <span>{labels.servings}</span>
      <button type="button" aria-label={`${labels.servings} -`} disabled={currentServings <= 1} onClick={() => setCurrentServings((value) => value - 1)}><Minus size={16}/></button>
      <strong aria-live="polite">{currentServings}</strong>
      <button type="button" aria-label={`${labels.servings} +`} onClick={() => setCurrentServings((value) => value + 1)}><Plus size={16}/></button>
    </div>
    <div className="tool-actions">
      <button type="button" onClick={saveShoppingList}><ClipboardCopy size={16}/>{listAdded ? labels.addedToList : labels.addToList}</button>
      <button type="button" aria-pressed={favorited} onClick={toggleFavorite}><Heart size={16} fill={favorited ? "currentColor" : "none"}/>{labels.favorite}</button>
      <button type="button" onClick={shareRecipe}><Share2 size={16}/>{copied ? labels.copied : labels.copyLink}</button>
      <button type="button" onClick={() => window.print()}><Printer size={16}/>{labels.print}</button>
    </div>
    <p className="local-note">{labels.savedLocally}</p>
    <ul className="ingredient-checklist">{scaledIngredients.map((ingredient) => { const completed = completedIngredients.includes(ingredient); return <li key={ingredient}><label><input type="checkbox" checked={completed} onChange={() => setCompletedIngredients((current) => completed ? current.filter((item) => item !== ingredient) : [...current, ingredient])}/><span>{completed ? <Check aria-hidden="true" size={15}/> : null}{ingredient}</span></label></li>; })}</ul>
  </div>;
}
