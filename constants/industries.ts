import {
  Rocket,
  Building2,
  ShoppingBag,
  Store,
  HeartPulse,
  GraduationCap,
  BedDouble,
  Landmark,
  Home,
  Factory,
} from "lucide-react";
import type { Industry } from "@/types/content";

export const INDUSTRIES: Industry[] = [
  { name: "Startups", icon: Rocket },
  { name: "SMEs", icon: Building2 },
  { name: "E-commerce", icon: ShoppingBag },
  { name: "Local Business", icon: Store },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Education", icon: GraduationCap },
  { name: "Hospitality", icon: BedDouble },
  { name: "Finance", icon: Landmark },
  { name: "Real Estate", icon: Home },
  { name: "Industrial", icon: Factory },
];
