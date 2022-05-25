import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectAuth } from '../../store/slices/loginSlice';

function RequireAuth({ children }) {
  const auth = useSelector(selectAuth);
  if (!auth) {
    return (<Navigate to="/login" />);
  }
  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export default RequireAuth;
