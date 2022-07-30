import { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import apiServices from './services/apiServices';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Spinner from './components/Loader/Loader';

//  import { ToastContainer } from 'react-toastify';

import './App.css';

class App extends Component {
  state = {
    status: 'init',
    valueApi: '',
    page: 1,
    query: [],
    showModal: false,
    modalImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { valueApi, page, query } = this.state;

    if (prevState.valueApi !== valueApi) {
      this.setState({ status: 'pending' });

      apiServices(valueApi, page)
        .then(query => query.hits)
        .then(query => this.setState({ query: query, status: 'resolved' }));
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ status: 'pending' });

      apiServices(valueApi, page)
        .then(query => query.hits)
        .then(query =>
          this.setState(prevState => ({
            query: [...prevState.query, ...query],
            status: 'resolved',
          })),
        );
    }

    if (prevState.query !== query) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleFormSubmit = value => {
    this.setState({
      valueApi: value,
      page: 1,
    });
  };

  btnLoadMore = () => {
    const { page } = this.state;
    this.setState({
      page: page + 1,
      status: 'pending',
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  FindModalImg = (id, img, tags) => {
    this.setState({ modalImg: { id: id, img: img, tags: tags } });
  };

  render() {
    const { handleFormSubmit, toggleModal, FindModalImg, btnLoadMore } = this;
    const { query, status, showModal, modalImg } = this.state;

    var chatbox = document.getElementById('fb-customer-chat');
    chatbox?.setAttribute('page_id', '104227589054932');
    chatbox?.setAttribute('attribution', 'biz_inbox');

    injectFbSdkAsync(document, 'script', 'facebook-jssdk');
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: 'v14.0',
      });
    };

    function injectFbSdkAsync(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/ru_RU/sdk/xfbml.customerchat.js';
      fjs.parentNode?.insertBefore(js, fjs);
    }

    return (
      <>
        <div className="App">
          <Searchbar onSubmit={handleFormSubmit} />
          <ImageGallery
            query={query}
            toggleModal={toggleModal}
            bigImg={FindModalImg}
          />
          {status === 'pending' && <Spinner />}
          {query.length > 0 && <Button onClick={btnLoadMore} />}
          {showModal && <Modal closeModal={toggleModal} modalImg={modalImg} />}
          {/* <ToastContainer/> */}
        </div>
        <div>
          <div id="fb-root"></div>

          <div id="fb-customer-chat" class="fb-customerchat"></div>
        </div>
      </>
    );
  }
}

export default App;
