import PropTypes from 'prop-types';
import { useState } from 'react';
// material
import { Divider, Collapse } from '@material-ui/core';
//
import ProductDetailsReviewForm from './ProductDetailsReviewForm';
import ProductDetailsReviewList from './ProductDetailsReviewList';
import ProductDetailsReviewOverview from './ProductDetailsReviewOverview';

// ----------------------------------------------------------------------

ProductDetailsReview.propTypes = {
  product: PropTypes.object
};

export default function ProductDetailsReview({ product }) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      <ProductDetailsReviewOverview product={product} onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <ProductDetailsReviewForm onClose={handleCloseReviewBox} product={product} id="move_add_review" />
        <Divider />
      </Collapse>

      <ProductDetailsReviewList product={product} />
    </>
  );
}
