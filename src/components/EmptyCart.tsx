import React from 'react';
import { Link } from 'react-router-dom';

import emptyCartIcon from '../assets/img/empty-cart.png';

const EmptyCart: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          This cart is empty <span>😕</span>
        </h2>
        <p>
          It seem like you had never made an order.
          <br />
          Go to the main page to make an order.
        </p>
        <img src={emptyCartIcon} alt="Empty cart" />
        <Link to="/sushi-app" className="button button--white">
          <span className="button--text">Come back</span>
        </Link>
      </div>
    </>
  );
};

export default EmptyCart;
