import { useState } from 'react';
import '../css/searchbar.css';


const filterOptions = {
  time: ["Under 15 min", "Under 30 min", "Under 1 hour"],
  nutrition: ["High protein", "Low calorie", "High fiber", "Low carbs"],
  convenience: ["Microwave only", "5 ingredients or less", "Easy"],
  mealType: ["Breakfast", "Lunch", "Dinner", "Snacks", "Desserts", "Brunch"]
};


export default function SearchBar({ onSearch }) {
 const [query, setQuery] = useState('');
 const [showFilters, setShowFilters] = useState(false);
 const [selected, setSelected] = useState({});


 function toggleChip(category, value) {
   setSelected(prev => {
     const current = prev[category] || [];
     return {
       ...prev,
       [category]: current.includes(value)
         ? current.filter(v => v !== value)
         : [...current, value]
     };
   });
 }

 function clearFilters() {
   setSelected({});
 }


 function handleSearch() {
   onSearch({ query, filters: selected });
   setShowFilters(false);
 }


 return (
   <div className="search-wrapper">
     <div className="search-input-row">
       <input
         className="search-input"
         placeholder="Search recipes..."
         value={query}
         onChange={e => setQuery(e.target.value)}
       />
       <button
         type="button"
         className={`filter-button ${showFilters ? 'open' : ''}`}
         onClick={() => setShowFilters(prev => !prev)}
       >
         Filters
       </button>
       <button type="button" className="search-button" onClick={handleSearch}>Search</button>
     </div>

     {showFilters && (
       <div className="filter-dialog-backdrop" onClick={() => setShowFilters(false)}>
         <div
           className="filter-dialog"
           role="dialog"
           aria-modal="true"
           aria-label="Recipe filters"
           onClick={e => e.stopPropagation()}
         >
           <div className="filter-dialog-header">
             <h2>Choose filters</h2>
             <button
               type="button"
               className="filter-dialog-close"
               onClick={() => setShowFilters(false)}
               aria-label="Close filters"
             >
               x
             </button>
           </div>
           <div className="filter-panel">
             {Object.entries(filterOptions).map(([category, options]) => (
               <div className="filter-section" key={category}>
                 <div className="filter-label">{category.toUpperCase()}</div>
                 <div className="filter-chips">
                   {options.map(option => (
                     <button
                       type="button"
                       key={option}
                       className={`chip ${(selected[category] || []).includes(option) ? 'active' : ''}`}
                       onClick={() => toggleChip(category, option)}
                     >
                       {option}
                     </button>
                   ))}
                 </div>
               </div>
             ))}
           </div>
           <div className="filter-dialog-actions">
             <button type="button" className="filter-text-button" onClick={clearFilters}>
               Clear all
             </button>
             <button type="button" className="search-button" onClick={handleSearch}>
               Apply filters
             </button>
           </div>
         </div>
       </div>
     )}
   </div>
 );
}
