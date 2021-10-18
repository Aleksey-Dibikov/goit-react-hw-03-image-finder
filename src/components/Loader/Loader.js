import Loader from 'react-loader-spinner';
import React, { Component } from 'react';
import s from './Spinner.module.css';
class Spinner extends Component {
  render() {
    return (
      // <div className={s.ldsEllipsis}>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      // </div>
      <div className={s.spinnerWrapper}>
        <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }
}
export default Spinner;
