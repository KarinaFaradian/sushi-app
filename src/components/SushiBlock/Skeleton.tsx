import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader 
    className="sushi-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#e4e4e4ea"
    foregroundColor="#ecebeb"
  >
    <rect x="93" y="187" rx="0" ry="0" width="118" height="0" /> 
    <rect x="10" y="2" rx="10" ry="10" width="260" height="261" /> 
    <rect x="10" y="273" rx="15" ry="15" width="260" height="25" /> 
    <rect x="0" y="306" rx="15" ry="15" width="280" height="88" /> 
    <rect x="5" y="421" rx="15" ry="15" width="115" height="31" /> 
    <rect x="165" y="414" rx="20" ry="20" width="100" height="45" />
  </ContentLoader>
)

export default Skeleton;