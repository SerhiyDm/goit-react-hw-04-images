import { useState, useEffect } from 'react';
import { GlobalStyles } from '../Globalstyles';
import { Toaster } from 'react-hot-toast';
import { AppStyled } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { fetchPhotos } from 'services/rest_api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { NotifyError } from 'components/Notify/Notify';
export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('idle');
  const [total, setTotal] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const options = {
      searchQuery: query,
      currentPage: page,
      pageSize: pageSize,
    };
    if (query !== '') {
      fetchByData(options);
    }

    async function fetchByData(options) {
      try {
        const responce = await fetchPhotos(options);
        if (responce.totalHits === 0) {
          NotifyError(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        setPhotos(prevPhotos => [...prevPhotos, ...responce.hits]);
        setStatus('resolved');
        setTotal(responce.totalHits);
      } catch (error) {
        NotifyError(error.message);
        setStatus('idle');
      }
    }
  }, [page, query]);

  const getData = value => {
    const validValue = value.trim().toLowerCase();
    setPage(1);
    setQuery(validValue);
    setPhotos([]);
    setStatus('pending');
    setTotal(0);
  };

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
    setStatus('pending');
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={getData} />
      {status === 'pending' && <Loader />}
      <Toaster />
      {photos.length !== 0 && <ImageGallery data={photos} />}
      {page < Math.ceil(total / pageSize) && (
        <Button text="Load more" onClik={handleClick} />
      )}
      <GlobalStyles />
    </AppStyled>
  );
};
