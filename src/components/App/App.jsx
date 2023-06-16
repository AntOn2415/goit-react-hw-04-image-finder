import { useEffect, useState, useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import SearchbarHeader from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Modal from '../Modal';
import LoaderReact from '../Loader';
import { fetchGallery, perPage } from '../../servise/GalleryApi';
import 'react-toastify/dist/ReactToastify.css';
import { ContainerDiv } from './App.styled';

function App () {
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ showModal, setShowModal ] = useState(false);
  const [ selectedImage, setSelectedImage ] = useState('')
  const [ gallery, setGallery ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ showLoadMoreBtn, setShowLoadMoreBtn ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

  const prevSearchQueryRef = useRef('');

  const scrollToOldGallery = () => {
      scroll.scrollToBottom({
        duration: 500,
        smooth: 'easeInOutQuad',
      });
  };

  async function fetchGalleryData() {
    return await fetchGallery(searchQuery, page, perPage);
  };

  useEffect(() => {
    if(searchQuery === '') {
      return;
    }
    
    const fetchData = async () => {
      
      if (prevSearchQueryRef.current !== searchQuery) {
        clearGallery();
        prevSearchQueryRef.current = searchQuery;
      }
      try {
        setIsLoading(true);
    
        const newGallery = await fetchGalleryData();

        if (newGallery.length === 0) {
          handleNoImages();
        } else if (newGallery.length < perPage && newGallery.length > 0) {
          handleEndOfResults();
        };
          updateGallery(newGallery);
          if (page > 1){
            scrollToOldGallery();
          }
          
        

      } catch (error) {
        handleError();
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);

  function updateGallery(newGallery) {
    setGallery(prevGallery => [...prevGallery, ...newGallery]);
    setIsLoading(false);
    setShowLoadMoreBtn(newGallery.length >= perPage);
  }

  function clearGallery() {
    setShowLoadMoreBtn(false);
    setGallery([]);
  };
  
  function handleNoImages() {
    toast.error('Sorry, there are no images matching your search query. Please try again.');
    setIsLoading(false);
  }
  
  function handleEndOfResults() {
    toast.info("We're sorry, but you've reached the end of search results.");
    setIsLoading(false);
    setShowLoadMoreBtn(false);
  }
  
  function handleError() {
    toast.error('An error occurred while loading images.');
    setIsLoading(false);
  }

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
  };

  const handleImageClick = (imageUrl, tags) => {
    setSelectedImage({url: imageUrl, alt: tags});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage('');
    setShowModal(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

    return (
      <ContainerDiv>
        <SearchbarHeader onSubmit={handleFormSubmit} />

        {gallery.length !== 0 && (
          <ImageGallery
            gallery={gallery}
            handleImageClick={handleImageClick}
          />
        )}

        {isLoading && <LoaderReact />}

        {showModal && (
          <Modal onClose={handleCloseModal}>
            <img src={selectedImage.url} alt={selectedImage.alt} />
          </Modal>
        )}

        <ToastContainer autoClose={2000} />

        {showLoadMoreBtn && !isLoading && (
          <Button onClick={handleLoadMore}>Load more</Button>
        )}
      </ContainerDiv>
    );
  }


export default App;
