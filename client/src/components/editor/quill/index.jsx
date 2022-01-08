import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
//
import EditorToolbar, { formats, redoChange, undoChange } from './QuillEditorToolbar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily
  },
  '& .ql-editor': {
    minHeight: 200,
    maxHeight: '70vh',
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900]
    }
  }
}));

// ----------------------------------------------------------------------

QuillEditor.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  simple: PropTypes.bool,
  sx: PropTypes.object
};

export default function QuillEditor({ id, error, value, onChange, simple = false, sx, ...other }) {
  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: { undo: undoChange, redo: redoChange }
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    },
    syntax: true,
    clipboard: {
      matchVisual: false
    }
  };

  return (
    <RootStyle
      sx={{
        ...(error && {
          border: (theme) => `solid 1px ${theme.palette.error.main}`
        }),
        ...sx
      }}
    >
      <EditorToolbar id={id} isSimple={simple} />
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Nhập nội dung"
        {...other}
      />
    </RootStyle>
  );
}
