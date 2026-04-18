export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  badge?: string;
  icon: string;
  desc: string;
  portal: string;
  deadline: string;
  tender_no: string;
}
export type ViewMode = "grid" | "list";
// After (all 6 menu items covered)
export type DashTab = "orders" | "bids" | "profile" | "alerts" | "reports" | "settings";

export const BADGE_COLOR: Record<string, string> = {
  Hot: "danger",
  New: "primary",
  Active: "success",
};
