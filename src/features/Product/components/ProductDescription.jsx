import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper } from '@mui/material';
import DOMPurify from 'dompurify';

ProductDescription.propTypes = {
  product: PropTypes.object,
};

function ProductDescription({ product = {} }) {
  //dùng DOMPurify để trách rò rỉ dữ liệu
  const safeDescription = DOMPurify.sanitize(product.description);
  return <Box sx={{ pl: 2, pr: 2 }} dangerouslySetInnerHTML={{ __html: safeDescription }}></Box>;
}

export default ProductDescription;
