import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/SushiBlock/Skeleton';
import SushiBlock from '../components/SushiBlock';

const Home = () => {

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('https://63c8592d5c0760f69aca662f.mockapi.io/Items')
        .then((res) => res.json())
        .then((json) => {
        setItems(json);
        setIsLoading(false);
        })
    }, []) 

  return (
    <>
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">All products</h2>
        <div className="content__items">
          {
            isLoading 
            ? [...new Array(9)].map((_, i) => <Skeleton key={i} />) 
            : items.map((obj) => (
              <SushiBlock key={obj.id} {...obj} />
            ))
          }
        </div>
    </>
  )
}

export default Home;