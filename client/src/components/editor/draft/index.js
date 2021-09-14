import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
//
import { editorToolbar } from './DraftEditorToolbar';
import DraftEditorStyle from './DraftEditorStyle';

// ----------------------------------------------------------------------

DraftEditor.propTypes = {
  sx: PropTypes.object
};

export default function DraftEditor({ sx, ...other }) {
  return (
    <DraftEditorStyle sx={sx}>
      <Editor toolbar={editorToolbar} placeholder="Write something awesome..." {...other} />
    </DraftEditorStyle>
  );
}
