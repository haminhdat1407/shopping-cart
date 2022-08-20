import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import categoryApi from '../../../../api/categoryApi';

FilterByCatagory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCatagory({ onChange }) {
  const [categoryList, setCategory] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategory(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch category list', error);
      }
    })();
  }, []);

  const handleCategoryOnClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };
  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          pt: 2,
        }}
      >
        DANH MỤC SẢN PHẨM
      </Typography>
      <ul
        style={{
          transition: 'all .25s',
          listStyle: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          minHeight: '180px',
          alignItems: 'baseline',
        }}
      >
        {categoryList.map((category) => (
          <li key={category.id} onClick={() => handleCategoryOnClick(category)}>
            {category.name}
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCatagory;
