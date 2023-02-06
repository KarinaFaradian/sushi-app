import React from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/SushiBlock/Skeleton';
import SushiBlock from '../components/SushiBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const fetchSushi = async () => {
    setIsLoading(true);

    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      const res = await axios.get(
        `https://63c8592d5c0760f69aca662f.mockapi.io/Items?page=${currentPage}&limit=6&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sort.sortProperty}&order=desc${search}`,
      );
      setItems(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      alert('Error')
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSushi();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // React.useEffect(() => {
  //   setIsLoading(true);
  //   const search = searchValue ? `&search=${searchValue}` : '';

  //   axios.get(`https://63c8592d5c0760f69aca662f.mockapi.io/Items?page=${currentPage}&limit=6&${
  //     categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${
  //     sort.sortProperty}&order=desc${search}`)
  //     .then(((res) => {
  //       setItems(res.data);
  //       setIsLoading(false);
  //     }))

  //       window.scrollTo(0, 0);
  //       }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const sushis = items.map((obj) => <SushiBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All products</h2>
      <div className="content__items">{isLoading ? skeletons : sushis}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
