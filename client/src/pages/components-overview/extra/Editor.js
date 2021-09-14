import { useState } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Container, CardHeader, CardContent, Stack } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { QuillEditor, DraftEditor } from '../../../components/editor';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function Editor() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  return (
    <RootStyle title="Components: Editor | Minimal-UI">
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
            heading="Editor"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Editor' }]}
            moreLink={['https://github.com/zenoamaro/react-quill', 'https://jpuri.github.io/react-draft-wysiwyg']}
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Card>
            <CardHeader title="Quill Simple Editor" />
            <CardContent>
              <QuillEditor simple id="simple-editor" value={text1} onChange={(value) => setText1(value)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Quill Full Editor" />
            <CardContent>
              <QuillEditor id="full-editor" value={text2} onChange={(value) => setText2(value)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Draft Editor" />
            <CardContent>
              <DraftEditor editorState={text3} onEditorStateChange={(value) => setText3(value)} />
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </RootStyle>
  );
}
