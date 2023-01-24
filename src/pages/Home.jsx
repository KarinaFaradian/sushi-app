import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/SushiBlock/Skeleton';
import SushiBlock from '../components/SushiBlock';

const Home = ( {searchValue} ) => {

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState({
      name: "popular",
      sortProperty: 'rating'
    });

    React.useEffect(() => {
      setIsLoading(true);

      const search = searchValue ? `&search=${searchValue}` : '';

      
        fetch(`https://63c8592d5c0760f69aca662f.mockapi.io/Items?${
          categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${
          sortType.sortProperty}&order=desc${search}`
        )
        .then((res) => res.json())
        .then((json) => {
        setItems(json);
        setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue]) 

    const sushis = items.map((obj) => (
      <SushiBlock key={obj.id} {...obj} />
    ));

    const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
          <Sort value={sortType} onClickSort={(type) => setSortType(type)} />
        </div>
        <h2 className="content__title">All products</h2>
        <div className="content__items">
          {
            isLoading 
            ? skeletons
            : sushis
          }
        </div>
    </div>
  )
}

export default Home;