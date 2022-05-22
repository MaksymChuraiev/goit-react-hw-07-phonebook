import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter, addFilter } from 'redux/contactSlice';
import { ContactFilterLabel, ContactFilterInput } from './ContactFilter.styled';

export const ContactFilter = () => {
  const filterItems = useSelector(getFilter);
  const dispatch = useDispatch();

  const filterContact = e => {
    dispatch(addFilter(e.target.value));
  };

  return (
    <ContactFilterLabel>
      Find contacts by name
      <ContactFilterInput
        type="text"
        name="filter"
        value={filterItems}
        onChange={filterContact}
      />
    </ContactFilterLabel>
  );
};

// ContactFilter.propTypes = {
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };
