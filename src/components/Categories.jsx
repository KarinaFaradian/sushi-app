import React from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    'All',
    'Rolls',
    'Hot rolls',
    'Sashimi',
    'Sushi',
    'Gunkans'
  ]

    return (
      <div className="categories">
        <ul>
          {categories.map((value, i) => (
            <li 
            onClick={() => setActiveIndex(i)} 
            className={activeIndex === i ? 'active' : ''}
            key={i}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    )
  }

export default Categories;