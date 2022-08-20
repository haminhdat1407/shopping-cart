import { Box, Checkbox, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';
import React from 'react';

FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterByService({ filters, onChange }) {
  const handleChange = (e) => {
    if (!onChange) return;

    const { name, checked } = e.target;
    onChange({ [name]: checked });
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
        DỊCH VỤ
      </Typography>
      <ul
        style={{
          margin: '0',
          marginTop: '11px',
          listStyle: 'none',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {[
          { value: 'isPromotion', label: 'Có khuyến mãi' },
          { value: 'isFreeShip', label: 'Giao hàng miễn phí' },
        ].map((services) => (
          <li key={services.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[services.value])}
                  onChange={handleChange}
                  name={services.value}
                  color="primary"
                />
              }
              label={services.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
