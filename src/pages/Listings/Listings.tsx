import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import TenderCard from "../../components/TenderCard/TenderCard";
import { PRODUCTS, CATEGORIES } from "../../data/products";
import { fmt } from "../../utils";
import { ViewMode } from "../../types";
import "./Listings.css";

export default function Listings() {
  const [view, setView]               = useState<ViewMode>("grid");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice]       = useState(400);
  const [sortBy, setSortBy]           = useState("deadline");
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(urlQuery);

  const toggleCat = (c: string) =>
    setSelectedCats(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );

  const resetFilters = () => {
    setSelectedCats([]);
    setMaxPrice(400);
  };

  let filtered = [...PRODUCTS];
  if (selectedCats.length) filtered = filtered.filter(p => selectedCats.includes(p.category));
  filtered = filtered.filter(p => p.price <= maxPrice * 1_000_000);
  if (sortBy === "price")    filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "deadline") filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  if (sortBy === "rating")   filtered.sort((a, b) => b.rating - a.rating);

  const FilterSidebar = () => (
    <div className="filter-panel">
      {/* Categories */}
      <div className="filter-section-title">Categories</div>
      {CATEGORIES.filter(c => c !== "All").map(c => (
        <label key={c} className="filter-check">
          <input
            type="checkbox"
            checked={selectedCats.includes(c)}
            onChange={() => toggleCat(c)}
          />
          {c}
        </label>
      ))}

      {/* Price Range */}
      <div className="filter-section-title mt-4">Max Value</div>
      <input
        type="range"
        className="price-slider w-100"
        min={1}
        max={400}
        value={maxPrice}
        onChange={e => setMaxPrice(+e.target.value)}
      />
      <div className="d-flex justify-content-between mt-2" style={{ fontSize: ".8rem", color: "var(--gem-muted)" }}>
        <span>₹10L</span>
        <span className="fw-bold" style={{ color: "var(--gem-sky)" }}>{fmt(maxPrice * 1_000_000)}</span>
      </div>

      {/* Portals */}
      <div className="filter-section-title mt-4">Portals</div>
      {["GeM", "CPPP", "IREPS", "DPSU", "State Portal"].map(p => (
        <label key={p} className="filter-check">
          <input type="checkbox" /> {p}
        </label>
      ))}

      {/* Status */}
      <div className="filter-section-title mt-4">Status</div>
      {["Active", "Hot", "New", "Closing Today"].map(s => (
        <label key={s} className="filter-check">
          <input type="checkbox" /> {s}
        </label>
      ))}

      <button className="filter-reset-btn mt-4" onClick={resetFilters}>
        ↺ Reset Filters
      </button>
    </div>
  );

  return (
    <div className="container-xl py-4">
      {/* ── Top Bar ── */}
      <div className="listings-topbar">
        <div>
          <h2 className="section-title mb-0">All Tenders</h2>
          <p style={{ fontSize: ".85rem", color: "var(--gem-muted)", marginTop: 2 }}>
            {filtered.length} results
          </p>
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          {/* Mobile filter toggle */}
          <button
            className="mobile-filter-btn d-lg-none"
            onClick={() => setShowFilters(s => !s)}
          >
            ⚙ Filters {selectedCats.length > 0 && `(${selectedCats.length})`}
          </button>

          <select
            className="listings-sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="deadline">Sort: Closing Soon</option>
            <option value="price">Sort: Price ↑</option>
            <option value="rating">Sort: Rating ↓</option>
          </select>

          <div className="view-toggle">
            <button
              className={view === "grid" ? "active" : ""}
              onClick={() => setView("grid")}
              title="Grid view"
            >⊞</button>
            <button
              className={view === "list" ? "active" : ""}
              onClick={() => setView("list")}
              title="List view"
            >☰</button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* ── Sidebar (desktop always visible, mobile toggled) ── */}
        <div className={`col-lg-3 ${showFilters ? "d-block" : "d-none d-lg-block"}`}>
          <FilterSidebar />
        </div>

        {/* ── Results ── */}
        <div className="col-lg-9">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h5>No Tenders Found</h5>
              <p>Adjust your filters to see more results.</p>
              <button className="btn-bid mt-3" onClick={resetFilters}>Reset Filters</button>
            </div>
          ) : view === "grid" ? (
            <div className="row g-3">
              {filtered.map(p => (
                <div key={p.id} className="col-sm-6 col-xl-4">
                  <TenderCard product={p} viewMode="grid" />
                </div>
              ))}
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {filtered.map(p => (
                <TenderCard key={p.id} product={p} viewMode="list" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
