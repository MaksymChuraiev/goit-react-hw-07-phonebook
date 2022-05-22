import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ContactNameItem,
  ContactTextWrap,
  ContactNameText,
  ContactNumberText,
  ContactListButton,
  Form,
  FormInputWrap,
  FormInput,
  FormButton,
} from './ContactListItem.styled';
import PropTypes from 'prop-types';
import {
  useDeleteContactMutation,
  useUpdateContactMutation,
} from 'redux/contactSlice';
// import { ModalForm } from 'components/ModalForm/ModalForm';

export const ContactListItem = ({ id, name, number }) => {
  const [showButton, setShowButton] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const { register, handleSubmit } = useForm();

  const [updateContact] = useUpdateContactMutation();
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const onShowButton = () => {
    setShowButton(!showButton);
  };

  const onShowEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const onSubmit = async contact => {
    console.log(contact);
    await updateContact({ id, ...contact });
    setShowEditForm(!showEditForm);
  };

  return (
    <>
      <ContactNameItem>
        {!showEditForm && (
          <>
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
                  transition={{ duration: 0.5 }}
                >
                  <ContactListButton
                    onClick={() => deleteContact(id)}
                    disabled={isLoading}
                  >
                    Delete
                  </ContactListButton>
                  <ContactListButton onClick={() => onShowEditForm()}>
                    Edit
                  </ContactListButton>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
        {showEditForm && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInputWrap>
              <FormInput
                {...register('name')}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                autoComplete="off"
              />
              <FormInput
                {...register('number')}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                autoComplete="off"
              />
            </FormInputWrap>
            <FormButton type="submit">Edit</FormButton>
          </Form>
        )}
      </ContactNameItem>
    </>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
