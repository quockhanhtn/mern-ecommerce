import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22
};

const menuConfig = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    image:
      'https://download.services.iconscout.com/download?name=category&download=1&url=https%3A%2F%2Fd1b1fjiwh8olf2.cloudfront.net%2Ficon%2Ffree%2Fpng-512%2F2036097.png%3Ftoken%3DeyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkMWIxZmppd2g4b2xmMi5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTYzNzc5ODQwMCwicSI6bnVsbCwiaWF0IjoxNjM3NTcwNzIxfQ__.59fdf37c8f35d473adfed62575285e0ab88350964e25ed1bca56b0985a68376e&width=512&height=512'
  },
  { title: 'Dashboard', path: PATH_DASHBOARD.root, icon: <Icon icon={fileFill} {...ICON_SIZE} /> },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'About us', path: PATH_DASHBOARD.root },
          { title: 'Contact us', path: PATH_DASHBOARD.root },
          { title: 'FAQs', path: PATH_DASHBOARD.root },
          { title: 'Pricing', path: PATH_DASHBOARD.root },
          { title: 'Payment', path: PATH_DASHBOARD.root },
          { title: 'Maintenance', path: PATH_DASHBOARD.root },
          { title: 'Coming Soon', path: PATH_DASHBOARD.root }
        ]
      },
      {
        subheader: 'Authentication',
        items: [
          { title: 'Login', path: PATH_DASHBOARD.root },
          { title: 'Register', path: PATH_DASHBOARD.root },
          { title: 'Reset password', path: PATH_DASHBOARD.root },
          { title: 'Verify code', path: PATH_DASHBOARD.root }
        ]
      },
      {
        subheader: 'Error',
        items: [
          { title: 'Page 404', path: PATH_DASHBOARD.root },
          { title: 'Page 500', path: PATH_DASHBOARD.root }
        ]
      },
      {
        subheader: 'Dashboard',
        items: [{ title: 'Dashboard', path: PATH_DASHBOARD.root }]
      }
    ]
  }
];

export default menuConfig;
