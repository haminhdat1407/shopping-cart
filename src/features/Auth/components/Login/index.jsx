import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { login, register } from '../../userSlice';
import LoginForm from '../LoginForm';

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      //Close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      console.log('Failt to login', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit}></LoginForm>
    </div>
  );
}

export default Login;
