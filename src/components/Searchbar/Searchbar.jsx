import { useState } from 'react';
import { toast } from 'react-toastify';
import { IconContext } from 'react-icons';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchQuery, setLastSearchQuery] = useState('');

  const handleSearchQueryChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.info('Please enter a search query');
      return;
    }

    if (searchQuery === lastSearchQuery) {
      toast.info(
        'Sorry, the result of this request is already in front of you, try another way'
      );
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
    setLastSearchQuery(searchQuery);
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
        <IconContext.Provider value={{ color: 'blue', size: 25 }}>
              <FaSearch />
            </IconContext.Provider>
          <ButtonLabel>
            Search
          </ButtonLabel>
        </SearchFormButton>

        <Input
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
