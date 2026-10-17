"use client";

import { Check, Trash2 } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { readShoppingList } from "@/lib/shopping-list";

export function ShoppingList({ labels }: { labels: { clear: string; empty: string; savedLocally: string } }) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const storedValue = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("how-to-cook-shopping-list", onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("how-to-cook-shopping-list", onStoreChange);
      };
    },
    () => window.localStorage.getItem("how-to-cook-shopping-list"),
    () => null,
  );
  const items = useMemo(() => readShoppingList(storedValue), [storedValue]);

  function clearList() {
    window.localStorage.removeItem("how-to-cook-shopping-list");
    window.dispatchEvent(new Event("how-to-cook-shopping-list"));
    setCheckedItems([]);
  }

  if (!items.length) return <div className="empty-state"><p>{labels.empty}</p><p className="local-note">{labels.savedLocally}</p></div>;
  return <div className="shopping-list"><div className="list-toolbar"><p className="local-note">{labels.savedLocally}</p><button type="button" onClick={clearList}><Trash2 size={16}/>{labels.clear}</button></div><ul>{items.map((item) => { const itemId = `${item.recipeSlug}:${item.ingredient}`; const checked = checkedItems.includes(itemId); return <li key={itemId}><label><input type="checkbox" checked={checked} onChange={() => setCheckedItems((current) => checked ? current.filter((currentItem) => currentItem !== itemId) : [...current, itemId])}/><span>{checked ? <Check size={15} aria-hidden="true"/> : null}{item.ingredient}</span><small>{item.title}</small></label></li>; })}</ul></div>;
}
