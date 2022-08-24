import React from 'react';

import { Box, Link } from '@mui/material';
import { NavLink, useRouteMatch } from 'react-router-dom';
import './ProductMenu.scss';

function ProductMenu(props) {
  const { url } = useRouteMatch();

  return (
    <Box sx={{ p: 1 }}>
      <Box
        component="ul"
        sx={{
          listStyleType: 'none',
          display: 'flex',
          gap: '180px',
          justifyContent: 'center',
        }}
      >
        <li>
          <Link className="tab__link" exact component={NavLink} to={url}>
            Thông tin chi tiết
          </Link>
        </li>
        <li>
          <Link className="tab__link" component={NavLink} to={`${url}/additional`}>
            Mô tả sản phẩm
          </Link>
        </li>
        <li>
          <Link className="tab__link" component={NavLink} to={`${url}/reviews`}>
            {' '}
            Đánh giá
          </Link>
        </li>
      </Box>
    </Box>
  );
}

export default ProductMenu;
