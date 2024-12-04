import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import PaymentMethodsPopup from "../components/paymentpopup/PaymentMethodPopup";

const Cart = () => {
  const [showPaymentMethods, setShowPaymentsMethods] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0); // New state for amount
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBuyItem = (item) => {
    setPaymentAmount(item.price * item.qty); // Set amount for a single item
    setShowPaymentsMethods(true); // Open popup
  };

  const handleBuyAll = () => {
    if (cartList.length > 0) {
      setPaymentAmount(totalPrice); // Set total price as the amount
      setShowPaymentsMethods(true); // Open popup
    } else {
      alert("No items in the cart to purchase.");
    }
  };

  return (
    <>
      <section className="cart-items">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              {cartList.length === 0 && (
                <h1 className="no-items product">No Items are added in Cart</h1>
              )}
              {cartList.map((item) => {
                const productQty = item.price * item.qty;
                return (
                  <div className="cart-list" key={item.id}>
                    <Row>
                      <Col className="image-holder" sm={4} md={3}>
                        <img src={item.imgUrl} alt="" />
                      </Col>
                      <Col sm={8} md={9}>
                        <Row className="cart-content justify-content-center">
                          <Col xs={12} sm={9} className="cart-details">
                            <h3>{item.productName}</h3>
                            <h4>
                              Rs.{item.price}.00 * {item.qty}
                              <span>Rs.{productQty}.00</span>
                            </h4>
                          </Col>
                          <Col xs={12} sm={3} className="cartControl">
                            <button
                              className="incCart"
                              onClick={() =>
                                dispatch(addToCart({ product: item, num: 1 }))
                              }
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                            <button
                              className="desCart"
                              onClick={() => dispatch(decreaseQty(item))}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          </Col>
                        </Row>
                        <Row>
                          <button
                            className="buyItem"
                            onClick={() => handleBuyItem(item)}
                          >
                            Buy This
                          </button>
                        </Row>
                      </Col>
                      <button
                        className="delete"
                        onClick={() => dispatch(deleteProduct(item))}
                      >
                        <ion-icon name="close"></ion-icon>
                      </button>
                    </Row>
                  </div>
                );
              })}
            </Col>
            <Col md={4}>
              <div className="cart-total">
                <h2>Cart Summary</h2>
                <div className="d_flex">
                  <h4>Total Price :</h4>
                  <h3>Rs.{totalPrice}.00</h3>
                </div>
                <button className="buyAll" onClick={handleBuyAll}>
                  Buy All Items
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {showPaymentMethods && (
        <PaymentMethodsPopup
          amount={paymentAmount} // Pass the amount to the popup
          onClose={() => setShowPaymentsMethods(false)}
        />
      )}
    </>
  );
};

export default Cart;
