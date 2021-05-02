import loadingImg from '../../assets/loading_small.svg';

import './style.css';

export default function LoadingBox() {

  return (
    <img
      alt="loading ..."
      className="loading-small"
      src={loadingImg} />
  );
}