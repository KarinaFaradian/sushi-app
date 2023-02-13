import React from 'react';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/SushiBlock/Skeleton';
import SushiBlock from '../components/SushiBlock';
import Pagination from '../components/Pagination';

import NotFound from './NotFound';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectSushi } from '../redux/sushi/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchSushi } from '../redux/sushi/slice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectSushi);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getSushi = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';
    const sortBy = sort.sortProperty;

    dispatch(
      fetchSushi({
        search,
        categoryId,
        currentPage,
        sortBy,
      }),
    );
  };

  React.useEffect(() => {
    getSushi();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const sushis = items.map((obj: any) => <SushiBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

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
