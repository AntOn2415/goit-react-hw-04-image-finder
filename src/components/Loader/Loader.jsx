import { Oval } from 'react-loader-spinner';
import { LoaderReact } from './Loader.styled';

const Loader = () => {
    return (
      <LoaderReact>
        <Oval
          height={40}
          width={40}
          color="#3f51b5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#303f9f"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
        <p>loading...</p>
      </LoaderReact>
    );
  }

export default Loader;
