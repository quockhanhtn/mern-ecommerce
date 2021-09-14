import faker from 'faker';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Container, Accordion, AccordionSummary, Typography, AccordionDetails } from '@material-ui/core';
// components
import Page from '../../../components/Page';
import { PATH_PAGE } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const ACCORDIONS = [...Array(4)].map((_, index) => {
  const setIndex = index + 1;
  return {
    value: `panel${setIndex}`,
    heading: `Accordion ${setIndex}`,
    subHeading: faker.lorem.slug(),
    detail: faker.lorem.lines()
  };
});

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function AccordionComponent() {
  const [controlled, setControlled] = useState(false);

  const handleChangeControlled = (panel) => (event, isExpanded) => {
    setControlled(isExpanded ? panel : false);
  };

  return (
    <RootStyle title="Components: Accordion | Minimal-UI">
      <Box
        sx={{
          pt: 6,
          pb: 1,
          mb: 10,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800')
        }}
      >
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Accordion"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Accordion' }]}
            moreLink="https://next.material-ui.com/components/accordion"
          />
        </Container>
      </Box>

      <Container>
        <Block title="Simple" sx={{ mb: 5 }}>
          {ACCORDIONS.map((accordion, index) => (
            <Accordion key={accordion.value} disabled={index === 3}>
              <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
                <Typography variant="subtitle1">{accordion.heading}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{accordion.detail}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Block>

        <Block title="Controlled">
          {ACCORDIONS.map((item, index) => (
            <Accordion
              key={item.value}
              disabled={index === 3}
              expanded={controlled === item.value}
              onChange={handleChangeControlled(item.value)}
            >
              <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
                <Typography variant="subtitle1" sx={{ width: '33%', flexShrink: 0 }}>
                  {item.heading}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{item.subHeading}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.detail}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Block>
      </Container>
    </RootStyle>
  );
}
