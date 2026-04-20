import { useState } from 'react';
import '../css/searchbar.css';


const filterOptions = {
 difficulty: ["Under 15 min", "Under 30 min", "Under 1 hour", "Easy", "5 ingredients or less"],
 diet: ["Vegan", "Vegetarian", "Gluten-free", "Dairy-free", "Keto", "Pescatarian", "Halal"],
 mealType: ["Breakfast", "Lunch", "Dinner", "Snacks", "Desserts", "Brunch"]
};


export default function SearchBar({ onSearch }) {
 const [query, setQuery] = useState('');
 const [focused, setFocused] = useState(false);
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


 function handleSearch() {
   // console.log("search clicked", query, selected);
   onSearch({ query, filters: selected });
   setFocused(false);
 }


 return (
   <div className="search-wrapper">
     <div className="search-input-row">
       <input
         className="search-input"
         placeholder="Search recipes..."
         value={query}
         onChange={e => setQuery(e.target.value)}
         onFocus={() => setFocused(true)}
       />
       <button className="search-button" onClick={handleSearch}>Search</button>
     </div>


     {focused && (
       <div className="filter-panel">
         {Object.entries(filterOptions).map(([category, options]) => (
           <div className="filter-section" key={category}>
             <div className="filter-label">{category.toUpperCase()}</div>
             <div className="filter-chips">
               {options.map(option => (
                 <span
                   key={option}
                   className={`chip ${(selected[category] || []).includes(option) ? 'active' : ''}`}
                   onClick={() => toggleChip(category, option)}
                 >
                   {option}
                 </span>
               ))}
             </div>
           </div>
         ))}
       </div>
     )}
   </div>
 );
}
