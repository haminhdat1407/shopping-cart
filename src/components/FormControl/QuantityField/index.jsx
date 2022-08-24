import { FormHelperText, IconButton, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { Box } from '@mui/system';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function QuantityField(props) {
  const { form, name, label, disable } = props;
  // const { errors } = form;
  // const hasError = !!errors[name];
  const { control, setValue } = form;
  // return (
  //   <FormControl error={hasError} fullWidth margin="normal" variant="outlined">
  //     <InputLabel htmlFor={name}>{label}</InputLabel>

  //     <Controller
  //       name={name}
  //       control={form.control}
  //       render={({ onChange, onBlur, value, name }) => (
  //         <OutlinedInput
  //           id={name}
  //           type="number"
  //           label={label}
  //           disabled={value}
  //           onChange={onChange}
  //           onBlur={onBlur}
  //         />
  //       )}
  //     />
  //     <FormHelperText>{errors[name]?.message}</FormHelperText>
  //   </FormControl>
  // );

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, error },
        }) => (
          <>
            <FormControl
              error={isTouched && invalid}
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
            >
              <Typography>{label}</Typography>
              <Box>
                <IconButton
                  onClick={() =>
                    setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)
                  }
                >
                  <RemoveCircleOutlineOutlinedIcon />
                </IconButton>
                <OutlinedInput
                  sx={{ width: '160px', height: '40px' }}
                  error={invalid}
                  type="number"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
                <IconButton
                  onClick={() =>
                    setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)
                  }
                >
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
              </Box>
            </FormControl>
            <FormHelperText error={invalid}>{error?.message}</FormHelperText>
          </>
        )}
      />
    </div>
  );
}

export default QuantityField;
