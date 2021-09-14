import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Link, Card, CardHeader, Stack } from '@material-ui/core';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------

ProfileSocialInfo.propTypes = {
  profile: PropTypes.object
};

export default function ProfileSocialInfo({ profile }) {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;

  const SOCIALS = [
    {
      name: 'Linkedin',
      icon: <IconStyle icon={linkedinFill} color="#006097" />,
      href: linkedinLink
    },
    {
      name: 'Twitter',
      icon: <IconStyle icon={twitterFill} color="#1C9CEA" />,
      href: twitterLink
    },
    {
      name: 'Instagram',
      icon: <IconStyle icon={instagramFilled} color="#D7336D" />,
      href: instagramLink
    },
    {
      name: 'Facebook',
      icon: <IconStyle icon={facebookFill} color="#1877F2" />,
      href: facebookLink
    }
  ];

  return (
    <Card>
      <CardHeader title="Social" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {SOCIALS.map((link) => (
          <Stack key={link.name} direction="row" alignItems="center">
            {link.icon}
            <Link component="span" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
