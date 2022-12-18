import PropTypes from 'prop-types';
import { useState } from 'react';
import { SearchFormStyled, SearchFormInputStyled } from './SearchForm.styled';
import { SearchFormButton } from './SearchFormButton/SearchFormButton';

export const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const clearField = () => {
    setQuery('');
    setIsDisabled(true);
  };
  const handleChange = e => {
    const { value } = e.currentTarget;
    setQuery(value);
    setIsDisabled(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setIsDisabled(true);
  };

  return (
    <SearchFormStyled onSubmit={handleSubmit}>
      <SearchFormButton isDisabled={isDisabled} />
      <SearchFormInputStyled
        onChange={handleChange}
        onFocus={clearField}
        name="query"
        type="text"
        placeholder="Search images and photos"
        autoComplete="off"
        autoFocus={true}
        value={query}
        required
      />
    </SearchFormStyled>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
