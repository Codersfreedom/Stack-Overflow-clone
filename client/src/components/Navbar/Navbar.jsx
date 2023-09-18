import React,{useEffect}  from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector} from "react-redux";
import decode from "jwt-decode"

import logo from "../../assests/logo.png";
import search from "../../assests/search-solid.svg";
import Avatar from "../../components/Avatar/Avatar";
import "./Navbar.css";

import bars from "../../assests/bars-solid.svg";
import { setCurrentUser } from "../../actions/currentUser";


const Navbar = ({ handleSlideIn }) => {
 const dispatch = useDispatch()
  // var User = null;
  var User =useSelector((state) => (state.currentUserReducer))
  useEffect(() =>{
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  },[dispatch])

const navigate = useNavigate();

  const handleLogout =() =>{
    dispatch({type:"LOGOUT"});
    navigate("/");
    dispatch(setCurrentUser(null));
    console.log(User);
  };


  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);


  return (
    <nav className="main-nav">
      <div className="navbar">
        <button className="slide-in-icon" onClick={() => handleSlideIn()}>
          <img src={bars} alt="bars" width="15" />
        </button>
        <div className="navbar-1">
          <Link to="/Home" className="nav-item nav-logo">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            About
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            Products
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            For Teams
          </Link>
          <form>
            <input type="text" placeholder="Search..." />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
        </div>
        <div className="navbar-2">
          {User === null ? (
            <Link to="/Auth" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                {User.result.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button className="nav-item nav-links" onClick={handleLogout} >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;