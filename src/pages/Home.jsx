import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/SushiBlock/Skeleton';
import SushiBlock from '../components/SushiBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchSushi } from '../redux/slices/sushiSlice';
import NotFound from './NotFound';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.sushi);

  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getSushi = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchSushi({
        search,
        categoryId,
        currentPage,
        sort,
      }),
    );
  };

  React.useEffect(() => {
    getSushi();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const sushis = items.map((obj) => <SushiBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All products</h2>
      {status === 'error' ? (
        <NotFound />
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : sushis}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
