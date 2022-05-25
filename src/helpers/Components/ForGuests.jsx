import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectAuth } from '../../store/slices/loginSlice';

function ForGuests({ children }) {
  const auth = useSelector(selectAuth);
  if (auth) {
    return (<Navigate to="/" />);
  }
  return children;
}

ForGuests.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ForGuests;
