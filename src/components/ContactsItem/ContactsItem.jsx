import { useDispatch } from 'react-redux';
import { deleteContacts } from 'redux/contactsSlice';
import { Name, Number, BtnDelete } from './ContactsItem.styled';

export const ContactsItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Name>{name}:</Name> <Number>{number}</Number>
      <BtnDelete
        id={id}
        type="button"
        onClick={() => dispatch(deleteContacts(id))}
      >
        Delete
      </BtnDelete>
    </>
  );
};
