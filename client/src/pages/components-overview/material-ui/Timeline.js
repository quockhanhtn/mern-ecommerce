import { last, slice } from 'lodash';
// material
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Paper, Container, Typography } from '@material-ui/core';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent
} from '@material-ui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { MTimelineDot } from '../../../components/@material-extend';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    key: 1,
    title: 'Default',
    des: 'Morbi mattis ullamcorper',
    time: '09:30 am',
    icon: <FastfoodIcon />
  },
  {
    key: 2,
    title: 'Primary',
    des: 'Morbi mattis ullamcorper',
    time: '10:00 am',
    color: 'primary',
    icon: <LaptopMacIcon />
  },
  {
    key: 3,
    title: 'Secondary',
    des: 'Morbi mattis ullamcorper',
    time: '10:00 am',
    color: 'secondary',
    icon: <LaptopMacIcon />
  },
  {
    key: 4,
    title: 'Info',
    des: 'Morbi mattis ullamcorper',
    time: '10:30 am',
    color: 'info',
    icon: <HotelIcon />
  },
  {
    key: 5,
    title: 'Success',
    des: 'Morbi mattis ullamcorper',
    time: '11:00 am',
    color: 'success',
    icon: <RepeatIcon />
  },
  {
    key: 6,
    title: 'Warning',
    des: 'Morbi mattis ullamcorper',
    time: '11:30 am',
    color: 'warning',
    icon: <FastfoodIcon />
  },
  {
    key: 7,
    title: 'Error',
    des: 'Morbi mattis ullamcorper',
    time: '12:00 am',
    color: 'error',
    icon: <FastfoodIcon />
  }
];

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function TimelineComponent() {
  const lastItem = last(TIMELINES).key;
  const reduceTimeLine = slice(TIMELINES, TIMELINES.length - 3);

  return (
    <RootStyle title="Components: Timeline | Minimal-UI">
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
            heading="Timeline"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Timeline' }]}
            moreLink="https://next.material-ui.com/components/timeline"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Block title="Default">
              <Timeline>
                {reduceTimeLine.map((item) => (
                  <TimelineItem key={item.key}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {lastItem === item.key ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{item.title}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block title="Right">
              <Timeline position="right">
                {reduceTimeLine.map((item) => (
                  <TimelineItem key={item.key}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {lastItem === item.key ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{item.title}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block title="Alternating">
              <Timeline position="alternate">
                {reduceTimeLine.map((item) => (
                  <TimelineItem key={item.key}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {lastItem === item.key ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{item.title}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block title="Filled">
              <Timeline position="alternate">
                {TIMELINES.map((item) => (
                  <TimelineItem key={item.key}>
                    <TimelineSeparator>
                      <MTimelineDot color={item.color} />
                      {lastItem === item.key ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{item.title}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block title="Outlined">
              <Timeline position="alternate">
                {TIMELINES.map((item) => (
                  <TimelineItem key={item.key}>
                    <TimelineSeparator>
                      <MTimelineDot variant="outlined" color={item.color} />
                      {lastItem === item.key ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{item.title}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block title="Opposite content">
              <Timeline position="alternate">
                {TIMELINES.map((item) => (
                  <TimelineItem key={item.key}>
                    <TimelineOppositeContent>
                      <Typography sx={{ color: 'text.secondary' }}>{item.time}</Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <MTimelineDot color={item.color} />
                      {lastItem === item.key ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography> {item.title}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Block>
          </Grid>

          <Grid item xs={12}>
            <Block title="Customized">
              <Timeline position="alternate">
                {TIMELINES.map((item) => (
                  <TimelineItem key={item.key}>
                    <TimelineOppositeContent>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {item.time}
                      </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <MTimelineDot color={item.color}>{item.icon}</MTimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Paper
                        sx={{
                          p: 3,
                          bgcolor: 'grey.50012'
                        }}
                      >
                        <Typography variant="subtitle2">{item.title}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {item.des}
                        </Typography>
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Block>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
