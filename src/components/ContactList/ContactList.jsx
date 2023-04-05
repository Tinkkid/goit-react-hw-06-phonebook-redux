import PropTypes from 'prop-types';
import {
  List,
  Item,
  Name,
  Number,
  BtnDelete,
} from '../ContactList/ContactList.styled';

export const ContactList = ({ filtered, deleteContact }) => {
  return (
    <List>
      {filtered.map(({ name, number, id }) => {
        return (
          <Item key={id}>
            <Name>{name}:</Name> <Number>{number}</Number>
            <BtnDelete id={id} type="button" onClick={() => deleteContact(id)}>
              Delete
            </BtnDelete>
          </Item>
        );
      })}
    </List>
  );
};

ContactList.propTypes = {
  filtered: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
