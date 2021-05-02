import loadingImg from '../../assets/loading_small.svg';

import './style.css';

export default function LoadingPage() {

  return (
    <div className='load__content'>
      <img
        alt="loading ..."
        className="load__img"
        src={loadingImg} />
    </div>
  );
}