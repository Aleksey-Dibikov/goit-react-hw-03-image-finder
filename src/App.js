import { Component } from 'react';
//  import { ToastContainer } from 'react-toastify';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import apiServices from './services/apiServices';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';

class App extends Component {
  state = {
    status: 'idle',
    valueApi: '',
    page: 1,
    query: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.valueApi !== this.state.valueApi) {
      this.setState({ status: 'pending' });

      if (prevState.valueApi !== this.state.valueApi) {
        apiServices(this.state.valueApi, this.state.page)
          .then(query => query.hits)
          .then(query => this.setState({ query: query }));
      }
    }
    if (prevState.query !== this.state.query) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleFormSubmit = value => {
    this.setState({ valueApi: value });
  };

  btnLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={this.state.query} />
        {/* <Modal /> */}
        <Button onClick={this.btnLoadMore} />
        {/* <ToastContainer /> */}
      </div>
    );
  }
}

export default App;
