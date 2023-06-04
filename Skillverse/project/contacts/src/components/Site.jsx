import React from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom';

// Pages
import Admin from '../pages/Admin';
import Monster from '../pages/Monster';

// Components
import BigButton from './BigButton/BigButton';
import Navbar from './Navbar/Navbar';
import Welcome from './Welcome Message/Welcome';

function Site () {
  const [token, setToken] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [availability, setAvailability] = React.useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const IsToken = localStorage.getItem('token');
    const IsEmail = localStorage.getItem('email');
    if (IsToken) {
      setToken(IsToken);
    }
    if (IsEmail) {
      setEmail(IsEmail);
    }
  }, []);

  React.useEffect(() => {
    if (token !== null) {
      if (pathname === '/login' || pathname === '/register') {
        navigate('/dashboard');
      }
    }
  })

  const allListingBtn = () => {
    navigate('/listings');
  }

  const hostListingBtn = () => {
    navigate('/listings/host/' + email);
  }

  const logout = async () => {
    const response = await fetch('http://localhost:5005/user/auth/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    const data = await response.json();
    localStorage.removeItem('token', data.token);
    setToken(null);

    parent.location = 'http://localhost:3000/';
  }

  return (
    <div>
        <nav>
            <ul>
                {!token && (
                <>
                    <Navbar login={'/login'} register={'/register'} logoutFn={logout}/>
                </>
                )}
            </ul>
              {token && (
                <>
                  <BigButton onClick={allListingBtn}>View All Listing</BigButton>
                  <BigButton onClick={hostListingBtn}>View Hosted Listing</BigButton>
                  <br/>
                  <BigButton onClick={logout}>Logout</BigButton>
                </>
              )}
        </nav>

      <Routes>
        <Route path='/dashboard' element={<b>Dashboard</b>}></Route>
        <Route path='/listings/publish/:id' element={<PublishListing token={token} availability={availability}/>}></Route>
        <Route path='/listings/confirmDelete/:id' element={<ConfirmDelete token={token}/>}></Route>
        <Route path='/listings/host/:owner' element={<HostedListings token={token} setAvailabilityFn={setAvailability}/>}></Route>
        <Route path='/listings/edit/:listingId' element={<EditListing token={token}/>}></Route>
        <Route path='/listings' element={<ALLListings token={token} />}></Route>
        <Route path='/listings/new' element={<ListingNew token={token} />}></Route>
        <Route path='/login' element={<Login setTokenFn={setToken} setEamilFn={setEmail}/>}></Route>
        <Route path='/register' element={<Register setTokenFn={setToken} setEamilFn={setEmail}/>}></Route>
        <Route path='/' element={<Welcome allListingFn={allListingBtn}/>}></Route>
      </Routes>
    </div>
  );
}

export default Site;
