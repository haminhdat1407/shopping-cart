import { Box, Button, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

FilterByPrices.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrices({ onChange }) {
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (onChange) onChange(values);
    setValues({ salePrice_gte: 0, salePrice_lte: 0 });
  };

  return (
    <Box sx={{ borderTop: '1px solid Silver', paddingBottom: '12px' }}>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          pt: 2,
        }}
      >
        CHỌN KHOẢNG GIÁ
      </Typography>

      <Box sx={{ display: 'flex', p: 2, gap: '5px', alignItems: 'center' }}>
        <TextField
          size="small"
          name="salePrice_gte"
          type="number"
          value={values.salePrice_gte}
          onChange={handleChange}
        />
        <span>-</span>
        <TextField
          size="small"
          name="salePrice_lte"
          type="number"
          value={values.salePrice_lte}
          onChange={handleChange}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>
          Áp dụng
        </Button>
      </Box>
    </Box>
  );
}

export default FilterByPrices;
