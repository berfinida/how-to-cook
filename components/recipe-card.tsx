import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { LocalizedRecipe } from "@/lib/recipes";

export function RecipeCard({ recipe }: { recipe: LocalizedRecipe }) { const copy = recipe.copy; return <article className="recipe-card"><Link href={`/recipes/${recipe.slug}`}><div className="card-image"><Image src={recipe.image} alt={copy.title} fill loading="eager" sizes="(max-width: 700px) 100vw, 33vw"/></div><div className="card-body"><span>{copy.category} · {copy.cuisine}</span><h3>{copy.title}</h3><p>{copy.description}</p><div className="meta"><span><Clock size={15}/>{recipe.prep + recipe.cook} min</span><span><Users size={15}/>{recipe.servings}</span></div></div></Link></article>; }
