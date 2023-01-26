import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <Spinner style={{margin: 'auto'}} animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loader;