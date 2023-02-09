import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const categories = ['All', 'Rolls', 'Hot rolls', 'Sashimi', 'Sushi', 'Gunkans'];

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''} key={i}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
