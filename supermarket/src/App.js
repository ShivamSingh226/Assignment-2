import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import { useContext } from 'react';
import { Store } from './Store';
import OrderScreen from './screens/OrderScreen';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import  NavDropdown  from 'react-bootstrap/NavDropdown';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
function App() {
  const { state,dispatch:ctxDispatch } = useContext(Store);
  const { cart ,userInfo} = state;
  const signoutHandler=()=>{
    ctxDispatch({type:'USER_SIGNOUT'})
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('cartItems')
    window.location.href='/signin'
  }
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1}/>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Supermarket</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
              <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="me-auto  w-100  justify-content-end">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a,c)=>a+c.quantity,0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
              {userInfo ?(
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                   <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider/>
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                      </Link>
                </NavDropdown>
              ):(
                <Link className="nav-link" to="/signin">
                Sign In
              </Link>
              )}
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {/* <Link to="/">Supermarket</Link> */}
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen/>}/>
              <Route path="/signin" element={<SignInScreen/>}/>
              <Route path="/signup" element={<SignUpScreen/>}/>
              <Route path="/profile" element={<ProfileScreen/>}/>
              <Route path="/shipping" element={<ShippingAddressScreen/>}/>
              <Route path="/payment" element={<PaymentMethodScreen/>}/>
              <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
              <Route path="/order/:id" element={<OrderScreen/>}/>
              <Route path="/orderhistory" element={<OrderHistoryScreen/>}/>
              
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All Rights Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
