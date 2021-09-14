// routes
import { PATH_DOCS } from '../../routes/paths';
// components
import Label from '../../components/Label';

// ----------------------------------------------------------------------

const version = 'v2.1.0';

const sidebarConfig = [
  {
    subheader: 'getting started',
    items: [
      { title: 'introduction', path: PATH_DOCS.introduction },
      { title: 'quick start', path: PATH_DOCS.quickstart },
      { title: 'package', path: PATH_DOCS.package }
    ]
  },
  {
    subheader: 'theme UI',
    items: [
      { title: 'color', path: PATH_DOCS.color },
      { title: 'typography', path: PATH_DOCS.typography },
      { title: 'icon', path: PATH_DOCS.icon },
      { title: 'shadows', path: PATH_DOCS.shadows },
      { title: 'components', path: PATH_DOCS.components },
      { title: 'settings', path: PATH_DOCS.settings },
      { title: 'tips', path: PATH_DOCS.tips }
    ]
  },
  {
    subheader: 'development',
    items: [
      { title: 'routing', path: PATH_DOCS.routing },
      { title: 'environment variables', path: PATH_DOCS.environmentVariables },
      { title: 'state management', path: PATH_DOCS.stateManagement },
      { title: 'API calls', path: PATH_DOCS.apiCalls },
      { title: 'analytics', path: PATH_DOCS.analytics },
      { title: 'authentication', path: PATH_DOCS.authentication },
      { title: 'multi language', path: PATH_DOCS.multiLanguage },
      { title: 'lazy load image', path: PATH_DOCS.lazyload }
    ]
  },
  {
    subheader: 'support & changelog',
    items: [
      { title: 'support', path: PATH_DOCS.support },
      {
        title: 'changelog',
        path: PATH_DOCS.changelog,
        info: (
          <Label variant="ghost" color="info" sx={{ textTransform: 'lowercase' }}>
            {version}
          </Label>
        )
      }
    ]
  }
];

export default sidebarConfig;
