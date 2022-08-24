import { yupResolver } from '@hookform/resolvers/yup';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/FormControl/InputField/InputFiled';
import PasswordField from '../../../../components/FormControl/PasswordField';

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

// validation with YUP
function LoginForm(props) {
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter a valid email format.'),
    password: yup.string().required('Please enter your password.'),
  });

  //  using useForm hook
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  // received props onSubmit from Register.
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  //  check is submitting
  // console.log(form.formState);
  const { isSubmitting } = form.formState;

  return (
    <div>
      {isSubmitting && <LinearProgress sx={{ mt: '-15px' }} />}
      <Avatar sx={{ display: 'flex', margin: '10px auto', color: '#000' }}>
        <AccountCircleTwoToneIcon />
      </Avatar>
      <Typography
        sx={{ mt: 1, textAlign: 'center', letterSpacing: '1px', fontWeight: 'bold' }}
        component="h3"
        variant="h5"
      >
        SIGN IN
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          id="outlined-basic"
          name="identifier"
          label="Email*"
          variant="outlined"
          form={form}
        />
        <PasswordField
          id="outlined-basic"
          name="password"
          label="Password*"
          variant="outlined"
          form={form}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          sx={{ mt: 2, mb: 2 }}
          variant="contained"
          fullWidth
          size="large"
        >
          SIGN IN
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
