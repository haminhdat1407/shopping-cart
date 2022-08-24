import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      //atuo set username=email
      values.username = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      //Close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      //do something here on register succressfully
      enqueueSnackbar('Register successfully !!!', { variant: 'success' });
    } catch (error) {
      console.log('Failt to register', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit}></RegisterForm>
    </div>
  );
}

export default Register;
