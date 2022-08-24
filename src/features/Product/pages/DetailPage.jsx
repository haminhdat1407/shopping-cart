import { Box, Container, Grid, LinearProgress, Paper } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { addToCart } from '../../Cart/cartSlice';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

DetailPage.propTypes = {};

function DetailPage() {
  const {
    params: { productId },
    url,
  } = useRouteMatch();

  //custom hooks
  const { product, loading } = useProductDetail(productId);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
        }}
      >
        <LinearProgress></LinearProgress>
      </Box>
    );
  }
  const handleAddToCartSubmit = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    console.log(action);
    dispatch(action);
  };
  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid
              item
              sx={{ width: '300px', marginLeft: '8px', p: 1, borderRight: '1px solid #ccc' }}
            >
              <ProductThumbnail product={product} />
            </Grid>

            <Grid item sx={{ flex: '1 ', p: 1 }}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ mt: 4, pb: 5 }}>
          <ProductMenu />
          <Switch>
            <Route exact path={url}>
              <ProductDescription product={product} />
            </Route>
            <Route path={`${url}/additional`} component={ProductAdditional}></Route>
            <Route path={`${url}/reviews`} component={ProductReviews}></Route>
          </Switch>
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailPage;
