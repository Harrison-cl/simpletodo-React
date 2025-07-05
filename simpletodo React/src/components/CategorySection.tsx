import { useState } from "react";

interface CategorySectionProps {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;  
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories((prevCategories) => [...prevCategories, newCategory]);
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