import { useState } from 'react';
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
 useState
  state = {
    searchQuery: '',
    showModal: false,
    selectedImage: '',
    gallery: [],
    page: 1,
    showLoadMoreBtn: false,
    loading: false,
    perPage: perPage,
  };

  async function componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
  
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      if (prevState.searchQuery !== searchQuery) {
        this.clearGallery();
      }
  
      try {
        this.setState({ loading: true });
  
        const newGallery = await this.fetchGalleryData();
  
        if (newGallery.length === 0) {
          handleNoImages();
        } else if (newGallery.length < this.state.perPage && newGallery.length > 0) {
          this.handleEndOfResults();
        } else {
          this.updateGallery(newGallery);
        }
  
        this.scrollToOldGallery();
      } catch (error) {
        this.handleError();
      }
    }
  }

  clearGallery() {
    this.setState({ showLoadMoreBtn: false, gallery: [] });
  }
  
  async fetchGalleryData() {
    const { searchQuery, page, perPage } = this.state;
    return await fetchGallery(searchQuery, page, perPage);
  }
  
  handleNoImages() {
    toast.error('Sorry, there are no images matching your search query. Please try again.');
    this.setState({ loading: false });
  }
  
  handleEndOfResults() {
    toast.info("We're sorry, but you've reached the end of search results.");
    this.setState({ loading: false, showLoadMoreBtn: false });
  }
  
  updateGallery(newGallery) {
    this.setState(prevState => ({
      gallery: [...prevState.gallery, ...newGallery],
      loading: false,
      showLoadMoreBtn: newGallery.length >= this.state.perPage,
    }));
  }
  
  handleError() {
    toast.error('An error occurred while loading images.');
    this.setState({ loading: false });
  }

  scrollToOldGallery = () => {
    if (this.state.showLoadMoreBtn) {
      scroll.scrollToBottom({
        duration: 500,
        smooth: 'easeInOutQuad',
      });
    }
    return;
  };

  handleFormSubmit = searchQuery => {
    const { searchQuery: prevSearchQuery } = this.state;
    if (prevSearchQuery !== searchQuery) {
      this.setState({
        searchQuery,
        page: 1,
      });
    }
  };

  handleImageClick = (imageUrl, tags) => {
    this.setState({
      selectedImage: { url: imageUrl, alt: tags },
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: '', showModal: false });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { gallery, showModal, selectedImage, showLoadMoreBtn, loading } =
      this.state;

    return (
      <ContainerDiv>
        <SearchbarHeader onSubmit={this.handleFormSubmit} />

        {gallery.length > 0 && (
          <ImageGallery
            gallery={gallery}
            handleImageClick={this.handleImageClick}
          />
        )}

        {loading && <LoaderReact />}

        {showModal && (
          <Modal onClose={this.handleCloseModal}>
            <img src={selectedImage.url} alt={selectedImage.alt} />
          </Modal>
        )}

        <ToastContainer autoClose={2000} />

        {showLoadMoreBtn && !loading && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
      </ContainerDiv>
    );
  }
}

export default App;


// import React, { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import { animateScroll as scroll } from 'react-scroll';
// import SearchbarHeader from '../Searchbar';
// import ImageGallery from '../ImageGallery';
// import Button from '../Button';
// import Modal from '../Modal';
// import LoaderReact from '../Loader';
// import { fetchGallery, perPage } from '../../servise/GalleryApi';
// import 'react-toastify/dist/ReactToastify.css';
// import { ContainerDiv } from './App.styled';

// class App extends Component {
//   state = {
//     searchQuery: '',
//     showModal: false,
//     selectedImage: '',
//     gallery: [],
//     page: 1,
//     showLoadMoreBtn: false,
//     loading: false,
//     perPage: perPage,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { searchQuery, page } = this.state;
  
//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       if (prevState.searchQuery !== searchQuery) {
//         this.clearGallery();
//       }
  
//       try {
//         this.setState({ loading: true });
  
//         const newGallery = await this.fetchGalleryData();
  
//         if (newGallery.length === 0) {
//           this.handleNoImages();
//         } else if (newGallery.length < this.state.perPage && newGallery.length > 0) {
//           this.handleEndOfResults();
//         } else {
//           this.updateGallery(newGallery);
//         }
  
//         this.scrollToOldGallery();
//       } catch (error) {
//         this.handleError();
//       }
//     }
//   }

//   clearGallery() {
//     this.setState({ showLoadMoreBtn: false, gallery: [] });
//   }
  
//   async fetchGalleryData() {
//     const { searchQuery, page, perPage } = this.state;
//     return await fetchGallery(searchQuery, page, perPage);
//   }
  
//   handleNoImages() {
//     toast.error('Sorry, there are no images matching your search query. Please try again.');
//     this.setState({ loading: false });
//   }
  
//   handleEndOfResults() {
//     toast.info("We're sorry, but you've reached the end of search results.");
//     this.setState({ loading: false, showLoadMoreBtn: false });
//   }
  
//   updateGallery(newGallery) {
//     this.setState(prevState => ({
//       gallery: [...prevState.gallery, ...newGallery],
//       loading: false,
//       showLoadMoreBtn: newGallery.length >= this.state.perPage,
//     }));
//   }
  
//   handleError() {
//     toast.error('An error occurred while loading images.');
//     this.setState({ loading: false });
//   }

//   scrollToOldGallery = () => {
//     if (this.state.showLoadMoreBtn) {
//       scroll.scrollToBottom({
//         duration: 500,
//         smooth: 'easeInOutQuad',
//       });
//     }
//     return;
//   };

//   handleFormSubmit = searchQuery => {
//     const { searchQuery: prevSearchQuery } = this.state;
//     if (prevSearchQuery !== searchQuery) {
//       this.setState({
//         searchQuery,
//         page: 1,
//       });
//     }
//   };

//   handleImageClick = (imageUrl, tags) => {
//     this.setState({
//       selectedImage: { url: imageUrl, alt: tags },
//       showModal: true,
//     });
//   };

//   handleCloseModal = () => {
//     this.setState({ selectedImage: '', showModal: false });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { gallery, showModal, selectedImage, showLoadMoreBtn, loading } =
//       this.state;

//     return (
//       <ContainerDiv>
//         <SearchbarHeader onSubmit={this.handleFormSubmit} />

//         {gallery.length > 0 && (
//           <ImageGallery
//             gallery={gallery}
//             handleImageClick={this.handleImageClick}
//           />
//         )}

//         {loading && <LoaderReact />}

//         {showModal && (
//           <Modal onClose={this.handleCloseModal}>
//             <img src={selectedImage.url} alt={selectedImage.alt} />
//           </Modal>
//         )}

//         <ToastContainer autoClose={2000} />

//         {showLoadMoreBtn && !loading && (
//           <Button onClick={this.handleLoadMore}>Load more</Button>
//         )}
//       </ContainerDiv>
//     );
//   }
// }

// export default App;
