import { useDispatch, useSelector } from 'react-redux';
import { filterContacts } from 'redux/filterSlice';
import { selectContacts, selectFilter } from 'redux/selectors';
import { FilterInput, FilterLabel } from './Filter.styled';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const getFilteredContacts = event => {
    dispatch(filterContacts(event.target.value));
  };

  return (
    contacts.length > 0 && (
      <FilterLabel>
        Find contacts by name
        <FilterInput
          type="text"
          value={filter}
          onChange={getFilteredContacts}
        />
      </FilterLabel>
    )
  );
};
