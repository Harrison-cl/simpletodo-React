import { useState } from "react";
import type { SetStateAction } from "react";

interface CategorySectionProps {
  categories: string[];
  setCategories: (value: SetStateAction<string[]>) => void;
}

const CategorySection = ({ categories, setCategories }: CategorySectionProps) => {
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) { // Added .trim() for robustness
      setCategories((prevCategories: string[]) => [...prevCategories, newCategory.trim()]); // Added .trim()
      setNewCategory("");
    }
  };

 return (
    <section className="category-section">
      <h2>Categories</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Add new category"
      />
      <button onClick={addCategory}>Add Category</button>
      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </section>
  );
};

export default CategorySection;