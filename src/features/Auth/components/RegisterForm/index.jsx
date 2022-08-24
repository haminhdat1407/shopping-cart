import { yupResolver } from '@hookform/resolvers/yup';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/FormControl/InputField/InputFiled';
import PasswordField from '../../../../components/FormControl/PasswordField';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

// validation with YUP
function RegisterForm(props) {
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name.')
      .test('should has at least two words.', 'Please enter at least two word.', (value) => {
        return value.split(' ').length >= 2;
      }),

    email: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter a valid email format.'),

    password: yup
      .string()
      .required('Please enter your password.')
      .min(6, 'Password must at lease 6 characters.')
      .test(
        'should uppercase for first character',
        'Password must start with a uppercase character.',
        (value) => {
          if (value) return value.split('')[0].includes(value.split('')[0].toUpperCase());
        }
      )
      .test(' should ignore space', 'Passwords can not contain spaces. ', (value) => {
        if (value) return !value.includes(' ');
      }),

    retypePassword: yup
      .string()
      .required('Please retype your password.')
      .oneOf([yup.ref('password')], 'Password does not match.Please try again.'),
  });

  //  using useForm hook
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
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
      <Avatar sx={{ display: 'flex', margin: '0px auto', color: '#000' }}>
        <AccountCircleTwoToneIcon />
      </Avatar>
      <Typography
        sx={{ textAlign: 'center', letterSpacing: '1px', fontWeight: 'bold' }}
        component="h3"
        variant="h6"
      >
        SIGN UP
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          id="outlined-basic"
          name="fullName"
          label="Full Name*"
          variant="outlined"
          form={form}
        />
        <InputField
          id="outlined-basic"
          name="email"
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
        <PasswordField
          id="outlined-basic"
          name="retypePassword"
          label="Confirm Password*"
          variant="outlined"
          form={form}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          sx={{ mt: 1, mb: 1 }}
          variant="contained"
          fullWidth
        >
          SIGN UP
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
