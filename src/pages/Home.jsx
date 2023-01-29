import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/SushiBlock/Skeleton';
import SushiBlock from '../components/SushiBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

    const {searchValue} = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);

    const onChangeCategory = (id) => {
      dispatch(setCategoryId(id));
    }

    React.useEffect(() => {
      setIsLoading(true);

      const search = searchValue ? `&search=${searchValue}` : '';

      
        fetch(`https://63c8592d5c0760f69aca662f.mockapi.io/Items?page=${currentPage}&limit=6&${
          categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${
          sortType}&order=desc${search}`)
        .then((res) => res.json())
        .then((json) => {
        setItems(json);
        setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]) 

    const sushis = items.map((obj) => (
      <SushiBlock key={obj.id} {...obj} />
    ));

    const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">All products</h2>
        <div className="content__items">
          { isLoading ? skeletons : sushis }
        </div>
        <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </div>
  )
}

export default Home;