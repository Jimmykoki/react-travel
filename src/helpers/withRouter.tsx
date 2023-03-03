import { useNavigate, NavigateFunction } from 'react-router-dom';

export interface RouteComponentProps {
  navigate: NavigateFunction;
}

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
  return Wrapper;
};
