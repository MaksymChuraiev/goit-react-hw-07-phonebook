import { ContactNameList } from './ContactList.styled';
import { ContactListItem } from 'components/ContactListItem/ContactIListItem';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/contactSlice';

export const ContactList = () => {
  const contactItems = useSelector(getContacts);
  const filterItems = useSelector(getFilter);

  const getContactsList = () => {
    const filterValue = filterItems.toLowerCase().trim();

    return contactItems.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );
  };

  return (
    <>
      <ContactNameList>
        {getContactsList().map(({ name, number, id }) => (
          <ContactListItem key={id} id={id} name={name} number={number} />
        ))}
      </ContactNameList>
    </>
  );
};
