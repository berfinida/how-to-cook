import {describe,expect,it} from "vitest";
import {recipeInputSchema} from "@/lib/recipe-schema";
describe("recipeInputSchema",()=>{it("accepts a valid localized draft",()=>{expect(recipeInputSchema.safeParse({slug:"mercimek-corbasi",servings:4,prepMinutes:10,cookMinutes:30,translations:[{locale:"TR",title:"Mercimek Çorbası",description:"Geleneksel, ipeksi dokulu kırmızı mercimek çorbası."}]}).success).toBe(true)});it("rejects an unsafe slug",()=>{expect(recipeInputSchema.safeParse({slug:"Bad Slug!",servings:4,prepMinutes:10,cookMinutes:30,translations:[]}).success).toBe(false)})});
