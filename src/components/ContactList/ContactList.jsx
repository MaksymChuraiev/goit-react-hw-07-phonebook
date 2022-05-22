import { ContactNameList } from './ContactList.styled';
import { ContactListItem } from 'components/ContactListItem/ContactIListItem';
import { useFetchContactsQuery } from 'redux/contactSlice';
import { Loader } from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/contactSlice';

export const ContactList = () => {
  const { data = [], isFetching } = useFetchContactsQuery();
  const filterItems = useSelector(getFilter);

  const getContactsList = () => {
    const filterValue = filterItems.toLowerCase().trim();
    const sortData = [...data].sort((firstEl, secondEl) =>
      firstEl.name.localeCompare(secondEl.name)
    );

    return sortData.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );
  };

  return (
    <>
      <ContactNameList>
        {isFetching && <Loader />}
        {getContactsList().map(({ name, phone, id }) => (
          <ContactListItem key={id} id={id} name={name} number={phone} />
        ))}
      </ContactNameList>
    </>
  );
};
