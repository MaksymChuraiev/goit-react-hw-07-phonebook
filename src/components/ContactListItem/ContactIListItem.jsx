import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ContactNameItem,
  ContactTextWrap,
  ContactNameText,
  ContactNumberText,
  ContactListButton,
} from './ContactListItem.styled';
import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/contactSlice';

export const ContactListItem = ({ id, name, number }) => {
  const [showButton, setShowButton] = useState(false);
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const onShowButton = () => {
    setShowButton(!showButton);
  };
  return (
    <ContactNameItem>
      <ContactTextWrap onClick={() => onShowButton()}>
        <ContactNameText>{name}</ContactNameText>
        <ContactNumberText>{number}</ContactNumberText>
      </ContactTextWrap>
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 1 }}
          >
            <ContactListButton
              onClick={() => deleteContact(id)}
              disabled={isLoading}
            >
              Delete
            </ContactListButton>
            <ContactListButton
              // onClick={() => deleteContact(id)}
              disabled={isLoading}
            >
              Edit
            </ContactListButton>
          </motion.div>
        )}
      </AnimatePresence>
    </ContactNameItem>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
