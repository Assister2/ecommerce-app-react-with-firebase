import React from "react";
import { connect } from "react-redux";

import { addCartItem } from "../redux/reducers/cart-list/CartListActions";

import ButtonAnimated from "./buttons/ButtonAnimated";

import useStyles from "../styles/components/ProductListItemStyles";

import spirtes from "../img/svg/sprites.svg";
import { useHistory } from "react-router-dom";

const ProductListItem = ({
  id,
  img,
  ratings,
  name,
  category,
  price,
  isAvailable,
  isFavorite,
  addCartItem,
}) => {
  // History hook
  const history = useHistory();

  // Event handlers
  // Item Click Event
  const handleItemClick = (event) => {
    history.push(`/product/${id}`);
  };

  // ADD TO CART Button Click Event
  const handleAddToCart = (event) => {
    // Stop event propagation
    event.stopPropagation();

    // Add item to cart
    addCartItem({
      id,
      img,
      ratings,
      name,
      category,
      price,
      isAvailable,
      isFavorite,
    });
  };

  //Add to Favorite event
  const handleAddToFavorite = (event) => {
    // Stop Event Propagation
    event.stopPropagation();

    // TODO : add to current user's favorite list
  };

  const classes = useStyles({ img, isAvailable });

  return (
    <div className={classes.ProductListItem} onClick={handleItemClick}>
      <div className={classes.Item_img}>
        <div className={classes.Item_ratings}>{ratings} / 5.0</div>
      </div>
      <div className={classes.Item_content}>
        <div className={classes.Item_details}>
          <h3 className={classes.Item_name}>{name}</h3>
          <p className={classes.Item_category}>{category}</p>
          <p className={classes.Item_price}>{`$ ${price}`}</p>
        </div>
        <div className={classes.Item_btnSet}>
          <ButtonAnimated
            primaryColor="#3C2858"
            secondaryColor="#fff"
            onClick={handleAddToCart}
            isSmall={true}
            styles={{
              padding: "1.2rem 1rem",
            }}
          >
            Add to cart
          </ButtonAnimated>

          {/* <button className={classes.Item_addToCartBtn} onClick={}>
            Add to Cart
          </button> */}
          <svg className={classes.Item_favoriteBtn}>
            {isFavorite ? (
              <use xlinkHref={`${spirtes}#icon-heart-filled`}></use>
            ) : (
              <use xlinkHref={`${spirtes}#icon-heart-empty`}></use>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addCartItem: (item) => dispatch(addCartItem(item)),
});

export default connect(null, mapDispatchToProps)(ProductListItem);
