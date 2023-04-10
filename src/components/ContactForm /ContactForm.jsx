import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/contactsSlice';
import { selectContacts } from 'redux/selectors';
import Swal from 'sweetalert2';
import {
  InputForm,
  InputForContact,
  LabelInputContact,
  BtnSubmit,
} from './ContactForm.styled';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const dublicateOfName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    const dublicateOfNumber = contacts.some(
      contact =>
        contact.number.replace(/-/g, '').replace(/ /g, '') ===
        number.replace(/ /g, '').replace(/-/g, '')
    );

    if (dublicateOfName) {
      Swal.fire(`${name} is alredy in contacts`);
      return false;
    }

    if (dublicateOfNumber) {
      Swal.fire(`${number} is alredy in contacts`);
      return false;
    }
    dispatch(addContacts(name, number));
    setName('');
    setNumber('');
  };

  return (
    <InputForm onSubmit={handleSubmit}>
      <LabelInputContact>
        Name
        <InputForContact
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          placeholder="Jack Daniels"
        />
      </LabelInputContact>
      <LabelInputContact>
        Number
        <InputForContact
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          placeholder="777 77 77"
        />
      </LabelInputContact>
      <BtnSubmit type="submit">Add contact</BtnSubmit>
    </InputForm>
  );
};
