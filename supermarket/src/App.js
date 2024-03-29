import { HashRouter, Link, Route, Routes,BrowserRouter } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import { useContext, useEffect, useState } from 'react';
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
import { Button } from 'react-bootstrap';
import { getError } from './utils';
import SearchBox from './components/SearchBox';
import axios from 'axios';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from "./components/AdminRoute"
function App() {
  const[sidebarIsOpen,SetSidebarIsOpen]=useState(false);
  const[categories,SetCategories]=useState([]);


  useEffect(()=>{
    const fetchCategories=async()=>{
      try {
        const {data}=await axios.get('/api/products/categories')
        SetCategories(data);
      } catch (err) {
        toast.error(getError(err))
      }
    };
    fetchCategories();

  })
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
      <div className={sidebarIsOpen?"d-flex flex-column site-container active-cont":"d-flex flex-column site-container"}>
       
        <ToastContainer position="bottom-center" limit={1}/>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
              variant="dark"
              onClick={()=>SetSidebarIsOpen(!sidebarIsOpen)}>
                <i className='fas fa-bars'></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>Supermarket</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
              <Navbar.Collapse id="basic-navbar-nav">
               <SearchBox/> 
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
              {userInfo && userInfo.isAdmin &&(
                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <LinkContainer to="admin/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="admiin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {/* <Link to="/">Supermarket</Link> */}
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category)=>(
              <Nav.Item key={category}>
                 <LinkContainer
                  to={{
                    pathname:'/search',
                    search:`category=${category}`
                  }}
                  onClick={() => SetSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
          </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen/>}/>
              <Route path="/search" element={<SearchScreen/>}/>
              <Route path="/signin" element={<SignInScreen/>}/>
              <Route path="/signup" element={<SignUpScreen/>}/>
              <Route path="/profile" element={<ProtectedRoute><ProfileScreen/></ProtectedRoute>}/>
              <Route path="/shipping" element={<ShippingAddressScreen/>}/>
              <Route path="/payment" element={<PaymentMethodScreen/>}/>
              <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
              <Route path="/order/:id" element={<ProtectedRoute><OrderScreen/></ProtectedRoute>}/>
              <Route path="/orderhistory" element={<ProtectedRoute><OrderHistoryScreen/></ProtectedRoute>}/>
              <Route path="/admin/dashboard" element={<AdminRoute><DashboardScreen/></AdminRoute>}/>
              
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
