import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserName,
  setUserLoginDetails,
  selectUserPhoto,
  setSignOutState,
} from "../feature/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  const setUser = useCallback(
    (user) => {
      dispatch(
        setUserLoginDetails({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
  setUser(user);
  if (window.location.pathname === "/") {
    navigate("/home");
  }
}

    });
    return () => unsubscribe();
  }, [setUser, navigate]);

  const handleAuth = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => setUser(result.user))
        .catch((error) => alert(error.message));
    } else {
      auth.signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <Nav>
      <Logo>
        <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="Disney+" />
      </Logo>
      {!userName ? (
        <Login onClick={handleAuth}>LOGIN</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home"><img src={`${process.env.PUBLIC_URL}/images/home-icon.svg`} alt="HOME" /><span>HOME</span></a>
            <button><img src={`${process.env.PUBLIC_URL}/images/search-icon.svg`} alt="SEARCH" /><span>SEARCH</span></button>
            <button><img src={`${process.env.PUBLIC_URL}/images/watchlist-icon.svg`} alt="WATCHLIST" /><span>WATCHLIST</span></button>
            <button><img src={`${process.env.PUBLIC_URL}/images/original-icon.svg`} alt="ORIGINALS" /><span>ORIGINALS</span></button>
            <button><img src={`${process.env.PUBLIC_URL}/images/movie-icon.svg`} alt="MOVIES" /><span>MOVIES</span></button>
            <button><img src={`${process.env.PUBLIC_URL}/images/series-icon.svg`} alt="SERIES" /><span>SERIES</span></button>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown><span onClick={handleAuth}>Sign Out</span></DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

// Styled Components

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a,
  button {
    display: flex;
    align-items: center;
    padding: 0 12px;
    background: none;
    border: none;
    cursor: pointer;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0 0 18px 0;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
