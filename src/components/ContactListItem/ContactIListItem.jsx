import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  ContactNameItem,
  ContactTextWrap,
  ContactNameText,
  ContactNumberText,
  ContactListButton,
  Form,
  FormInputWrap,
  FormInputName,
  FormInputNumber,
  FormButton,
} from './ContactListItem.styled';
import PropTypes from 'prop-types';
import {
  useDeleteContactMutation,
  useUpdateContactMutation,
  useFetchContactsQuery,
} from 'redux/contactSlice';

export const ContactListItem = ({ id, name, number }) => {
  const [showButton, setShowButton] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [updateContact] = useUpdateContactMutation();
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const { data: contacts } = useFetchContactsQuery();

  const { register, handleSubmit, resetField } = useForm({
    defaultValues: {
      name,
      phone: number,
    },
  });

  const onShowButton = () => {
    setShowButton(!showButton);
  };

  const onShowEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const onDeleteContact = id => {
    deleteContact(id);
    toast.success(`${name}has been deleted!`);
  };

  const onSubmit = async contact => {
    if (
      contacts.some(el => el.name.toLowerCase() === contact.name.toLowerCase())
    ) {
      return toast.error(`${contact.name} is already in contacts.`);
    }

    try {
      await updateContact({ id, ...contact });
      console.log(contact);

      toast.success(`${contact.name} has been changed!`);

      onShowButton();
      onShowEditForm();
      resetField('name');
      resetField('phone');
    } catch (error) {
      console.log(error);
    }
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
                    onClick={() => onDeleteContact(id)}
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
              <FormInputName
                {...register('name')}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                autoComplete="off"
              />
              <FormInputNumber
                {...register('phone')}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                autoComplete="off"
              />
            </FormInputWrap>
            <FormButton
              onClick={() => {
                onShowButton();
                onShowEditForm();
              }}
            >
              Back
            </FormButton>
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
