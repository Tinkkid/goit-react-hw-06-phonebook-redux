import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';

import { useLocalStorage } from 'hooks/useLocalStorage';
import defaultValue from '../../data/contacts.json';
import { ContactForm } from 'components/ContactForm /ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { MainSection, ContactsTitle, Title } from './App.styled';

const STORAGE_KEY = 'contacts';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useLocalStorage(STORAGE_KEY, defaultValue);

  const addContacts = (name, number) => {
    const newObj = {
      id: nanoid(),
      name,
      number,
    };

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

    setContacts(prevState => [newObj, ...prevState]);
  };

  const filterContacts = event => {
    setFilter(event.target.value);
  };

  const getVisibleContacts = value => {
    const filterNormalize = value.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalize)
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <MainSection>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContacts} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter value={filter} contacts={contacts} onChange={filterContacts} />
      <ContactList
        filtered={getVisibleContacts(filter)}
        deleteContact={deleteContact}
      />
    </MainSection>
  );
};
