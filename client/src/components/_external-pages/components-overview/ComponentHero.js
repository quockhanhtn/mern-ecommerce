import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import roundArrowRightAlt from '@iconify/icons-ic/round-arrow-right-alt';
// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Link, Container, Typography, Stack } from '@material-ui/core';
// components
import { varFadeInUp, varWrapEnter, varFadeInDown } from '../../animate';
//
import { MHidden } from '../../@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
}));

export default function ComponentHero() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <motion.div initial="initial" animate="animate" variants={varWrapEnter}>
        <Container
          maxWidth="lg"
          sx={{
            display: { md: 'flex' },
            justifyContent: { md: 'space-between' }
          }}
        >
          <div>
            <motion.div variants={varFadeInUp}>
              <Typography variant="h3" component="h1">
                Components
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInUp}>
              <Typography
                sx={{
                  mt: 3,
                  mb: 5,
                  color: isLight ? 'text.secondary' : 'common.white'
                }}
              >
                With huge resource pack making deployment
                <br /> easy and expanding more effectively
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInUp}>
              <Link href="https://www.sketch.com/s/0fa4699d-a3ff-4cd5-a3a7-d851eb7e17f0" target="_blank">
                <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'inline-flex' }}>
                  <Typography variant="button"> Fast preview</Typography>
                  <Icon icon={roundArrowRightAlt} width={20} height={20} />
                </Stack>
              </Link>
            </motion.div>
          </div>

          <MHidden width="mdDown">
            <motion.div variants={varFadeInDown}>
              <Box component="img" src="/static/components/hero.png" sx={{ maxHeight: 320 }} />
            </motion.div>
          </MHidden>
        </Container>
      </motion.div>
    </RootStyle>
  );
}
