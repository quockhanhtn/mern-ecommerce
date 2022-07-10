import PropTypes from 'prop-types';
//
import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import { Box, Container, Accordion, AccordionSummary, Typography, AccordionDetails } from '@material-ui/core';

const LEFT_WIDTH = 200;

function InfoItem({ label, value, valueVariant }) {
  let display = (
    <Typography variant={valueVariant} sx={{ flex: 1, marginLeft: 3 }}>
      {value}
    </Typography>
  );
  if (Array.isArray(value) && value.length > 1) {
    display = (
      <Box sx={{ flex: 1, marginLeft: 3 }}>
        {value.map((item, index) => (
          <Typography key={index} variant={valueVariant}>
            &#x2022;&nbsp;{item}
          </Typography>
        ))}
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems={Array.isArray(value) ? 'start' : 'center'} mb={0.5}>
      <Typography align="right" variant="body2" component="span" sx={{ color: 'text.secondary', width: LEFT_WIDTH }}>
        {label}
      </Typography>
      {display}
    </Box>
  );
}

InfoItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  valueVariant: PropTypes.oneOf([
    'body1',
    'body2',
    'button',
    'caption',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'inherit',
    'overline',
    'subtitle1',
    'subtitle2',
    'string'
  ])
};

function ProductSpecification({ overSpecs, detailSpecs }) {
  return (
    <Container maxWidth="md" sx={{ padding: (theme) => theme.spacing(5) }}>
      {detailSpecs.map((group, index) => (
        <Accordion
          key={`specs-group-${index}`}
          defaultExpanded
          sx={{ border: (theme) => `solid 2px ${theme.palette.divider}` }}
        >
          <AccordionSummary
            sx={{ minHeight: 'unset !important', '.Mui-expanded': { margin: '12px 0 !important' } }}
            expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}
          >
            <Typography variant="subtitle1">{group.groupName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {group.groupItems.map((item, i) => (
              <InfoItem
                key={`specs-group-${index}-item-${i}`}
                label={item.name}
                value={item.values}
                valueVariant="body2"
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}

ProductSpecification.propTypes = {
  overSpecs: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string)
      })
    )
  ),
  detailSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      groupKey: PropTypes.string,
      groupName: PropTypes.string,
      groupItems: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          name: PropTypes.string,
          values: PropTypes.arrayOf(PropTypes.string)
        })
      )
    })
  )
};

export default ProductSpecification;

// {
//   "groupName": "Màn hình",
//   "groupItems": [
//       {
//           "name": "Công nghệ màn hình",
//           "values": [
//               "OLED"
//           ],
//           "key": "cong-nghe-man-hinh"
//       }
//   ],
//   "groupKey": "man-hinh"
// }
