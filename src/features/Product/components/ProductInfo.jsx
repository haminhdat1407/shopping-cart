import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice, formatPromotionPercent } from '../utils';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

function ProductInfo({ product = {} }) {
  return (
    <Box sx={{ pb: 1, borderBottom: '1px solid #ccc' }}>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Typography>{`Mặt hàng:`}</Typography>
        <Typography sx={{ color: '#008080', textDecoration: 'underline' }}>
          {product.category?.name}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: '20px', mt: '10px' }}>{product.shortDescription}</Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          minHeight: '80px',
          backgroundImage: 'linear-gradient(to right, #0066CC , #fff)',
          margin: '20px auto',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography sx={{ fontSize: '30px', ml: 2, fontWeight: 'bold', color: '#fff' }}>
          {formatPrice(product.salePrice)}
        </Typography>

        <Box sx={{ ml: 2, display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Typography
            sx={{
              fontSize: '20px',
              color: '#fff',
              textDecoration: 'line-through',
              opacity: '0.7',
            }}
          >
            {formatPrice(product.originalPrice)}
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#fff' }}>
            {formatPromotionPercent(product.promotionPercent)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductInfo;
