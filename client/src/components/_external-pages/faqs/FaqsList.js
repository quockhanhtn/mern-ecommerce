import faker from 'faker';
import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@material-ui/core';
//
import { varFadeIn, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const ACCORDIONS = [...Array(8)].map((_, index) => {
  const setIndex = index + 1;
  return {
    value: `panel${setIndex}`,
    heading: `Questions ${setIndex}`,
    subHeading: faker.lorem.slug(),
    detail: faker.lorem.lines()
  };
});

// ----------------------------------------------------------------------

export default function FaqsList() {
  return (
    <MotionInView variants={varFadeIn}>
      {ACCORDIONS.map((accordion) => (
        <Accordion key={accordion.value}>
          <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </MotionInView>
  );
}
