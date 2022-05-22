import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactSlice';
import {
  ContactNameItem,
  ContactNameText,
  ContactNumberText,
  ContactListButton,
} from './ContactListItem.styled';
import PropTypes from 'prop-types';

export const ContactListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const deleteContacts = id => dispatch(deleteContact(id));

  return (
    <ContactNameItem>
      <ContactNameText>{name}</ContactNameText>
      <ContactNumberText>{number}</ContactNumberText>
      <ContactListButton onClick={() => deleteContacts(id)}>
        Delete
      </ContactListButton>
    </ContactNameItem>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
