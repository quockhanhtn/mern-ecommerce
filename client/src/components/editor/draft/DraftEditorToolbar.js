// ----------------------------------------------------------------------

const ICONS = {
  inline_bold: '/static/icons/editor/inline_bold.svg',
  inline_italic: '/static/icons/editor/inline_italic.svg',
  inline_underline: '/static/icons/editor/inline_underline.svg',
  inline_strikethrough: '/static/icons/editor/inline_strikethrough.svg',
  list_unordered: '/static/icons/editor/list_unordered.svg',
  list_ordered: '/static/icons/editor/list_ordered.svg',
  list_indent: '/static/icons/editor/list_indent.svg',
  list_outdent: '/static/icons/editor/list_outdent.svg',
  align_left: '/static/icons/editor/align_left.svg',
  align_center: '/static/icons/editor/align_center.svg',
  align_right: '/static/icons/editor/align_right.svg',
  align_justify: '/static/icons/editor/align_justify.svg',
  link: '/static/icons/editor/link.svg',
  unlink: '/static/icons/editor/unlink.svg',
  monospace: '/static/icons/editor/monospace.svg',
  superscript: '/static/icons/editor/superscript.svg',
  subscript: '/static/icons/editor/subscript.svg',
  embedded: '/static/icons/editor/embedded.svg',
  colorpicker: '/static/icons/editor/colorpicker.svg',
  emoji: '/static/icons/editor/emoji.svg',
  image: '/static/icons/editor/image.svg',
  remove: '/static/icons/editor/remove.svg',
  history_undo: '/static/icons/editor/history_undo.svg',
  history_redo: '/static/icons/editor/history_redo.svg'
};

export const editorToolbar = {
  inline: {
    bold: { icon: ICONS.inline_bold, className: 'toggle' },
    italic: { icon: ICONS.inline_italic, className: 'toggle' },
    underline: { icon: ICONS.inline_underline, className: 'toggle' },
    strikethrough: { icon: ICONS.inline_strikethrough, className: 'toggle' },
    monospace: { icon: ICONS.monospace, className: 'toggle' },
    superscript: { icon: ICONS.superscript, className: 'toggle' },
    subscript: { icon: ICONS.subscript, className: 'toggle' }
  },
  blockType: {
    className: 'dropdown',
    dropdownClassName: 'dropdown__option'
  },
  fontSize: {
    className: 'dropdown',
    dropdownClassName: 'dropdown__option'
  },
  list: {
    unordered: { icon: ICONS.list_unordered, className: 'toggle' },
    ordered: { icon: ICONS.list_ordered, className: 'toggle' },
    indent: { icon: ICONS.list_indent, className: 'toggle' },
    outdent: { icon: ICONS.list_outdent, className: 'toggle' }
  },
  textAlign: {
    left: { icon: ICONS.align_left, className: 'toggle' },
    center: { icon: ICONS.align_center, className: 'toggle' },
    right: { icon: ICONS.align_right, className: 'toggle' },
    justify: { icon: ICONS.align_justify, className: 'toggle' }
  },
  fontFamily: {
    className: 'dropdown',
    dropdownClassName: 'dropdown__option'
  },
  colorPicker: {
    icon: ICONS.colorpicker,
    className: 'toggle',
    popupClassName: 'popup popup__colorpicker'
  },
  link: {
    popupClassName: 'popup popup__link',
    link: { icon: ICONS.link, className: 'toggle' },
    unlink: { icon: ICONS.unlink, className: 'toggle' }
  },
  emoji: {
    icon: ICONS.emoji,
    className: 'toggle',
    popupClassName: 'popup popup__emoji'
  },
  embedded: {
    icon: ICONS.embedded,
    className: 'toggle',
    popupClassName: 'popup popup__embedded'
  },
  image: {
    icon: ICONS.image,
    className: 'toggle',
    popupClassName: 'popup popup__image',
    uploadCallback: uploadImageCallBack,
    alt: { present: true, mandatory: true }
  },
  remove: { icon: ICONS.remove, className: 'toggle' },
  history: {
    undo: { icon: ICONS.history_undo, className: 'toggle' },
    redo: { icon: ICONS.history_redo, className: 'toggle' }
  }
};

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/3/image');
    xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
    const data = new FormData();
    data.append('image', file);
    xhr.send(data);
    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener('error', () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}
