import axios from 'axios';
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const FullSushi = () => {
  const [sushi, setSushi] = React.useState();
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchSushi() {
      try {
        const { data } = await axios.get('https://63c8592d5c0760f69aca662f.mockapi.io/Items/' + id);
        setSushi(data);
      } catch (error) {
        alert('Something is wrong');
        navigate('/');
      }
    }
    fetchSushi();
  }, [id]);

  if (!sushi) {
    return 'Loading...';
  }
  

  return (
    <div className="container">
      <img className="sushi-block__image" src={sushi.imageUrl} alt="sushi" />
      <h3 className="sushi-block__title">{sushi.title}</h3>
      <p className="sushi-block__composition">{sushi.composition}</p>
      <h4 className="sushi-block__price">{sushi.price} $</h4>
      <div className="cart__bottom-buttons">
        <Link to="/sushi-app">
          <button className="button button--outline button--add go-back-btn">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Come back</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullSushi;
