import { Icon } from '@iconify/react';
import fileFill from '@iconify/icons-eva/file-fill';
import fileTypePdf from '@iconify/icons-vscode-icons/file-type-pdf';
import fileTypeAi2 from '@iconify/icons-vscode-icons/file-type-ai2';
import fileTypeWord from '@iconify/icons-vscode-icons/file-type-word';
import fileTypeExcel from '@iconify/icons-vscode-icons/file-type-excel';
import fileTypeVideo from '@iconify/icons-vscode-icons/file-type-video';
import fileTypePowerpoint from '@iconify/icons-vscode-icons/file-type-powerpoint';
import fileTypePhotoshop2 from '@iconify/icons-vscode-icons/file-type-photoshop2';

// ----------------------------------------------------------------------

const ICON_SIZE = { width: 28, height: 28 };

const FORMAT_IMG = ['jpg', 'jpeg', 'gif', 'bmp', 'png'];
const FORMAT_VIDEO = ['m4v', 'avi', 'mpg', 'mp4', 'webm'];
const FORMAT_WORD = ['doc', 'docx'];
const FORMAT_EXCEL = ['xls', 'xlsx'];
const FORMAT_POWERPOINT = ['ppt', 'pptx'];
const FORMAT_PDF = ['pdf'];
const FORMAT_PHOTOSHOP = ['psd'];
const FORMAT_ILLUSTRATOR = ['ai', 'esp'];

export function getFileType(fileUrl) {
  return fileUrl.split('.').pop();
}

export function getFileName(fileUrl) {
  return fileUrl.substring(fileUrl.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, '');
}

export function getFileFullName(fileUrl) {
  return fileUrl.split('/').pop();
}

export function getFileFormat(fileUrl) {
  let format;

  switch (fileUrl.includes(getFileType(fileUrl))) {
    case FORMAT_IMG.includes(getFileType(fileUrl)):
      format = 'image';
      break;
    case FORMAT_VIDEO.includes(getFileType(fileUrl)):
      format = 'video';
      break;
    case FORMAT_WORD.includes(getFileType(fileUrl)):
      format = 'word';
      break;
    case FORMAT_EXCEL.includes(getFileType(fileUrl)):
      format = 'excel';
      break;
    case FORMAT_POWERPOINT.includes(getFileType(fileUrl)):
      format = 'powerpoint';
      break;
    case FORMAT_PDF.includes(getFileType(fileUrl)):
      format = 'pdf';
      break;
    case FORMAT_PHOTOSHOP.includes(getFileType(fileUrl)):
      format = 'photoshop';
      break;
    case FORMAT_ILLUSTRATOR.includes(getFileType(fileUrl)):
      format = 'illustrator';
      break;
    default:
      format = getFileType(fileUrl);
  }

  return format;
}

export function getFileThumb(fileUrl) {
  let thumb;
  switch (getFileFormat(fileUrl)) {
    case 'image':
      thumb = <img src={fileUrl} alt={fileUrl} />;
      break;
    case 'video':
      thumb = <Icon icon={fileTypeVideo} {...ICON_SIZE} />;
      break;
    case 'word':
      thumb = <Icon icon={fileTypeWord} {...ICON_SIZE} />;
      break;
    case 'excel':
      thumb = <Icon icon={fileTypeExcel} {...ICON_SIZE} />;
      break;
    case 'powerpoint':
      thumb = <Icon icon={fileTypePowerpoint} {...ICON_SIZE} />;
      break;
    case 'pdf':
      thumb = <Icon icon={fileTypePdf} {...ICON_SIZE} />;
      break;
    case 'photoshop':
      thumb = <Icon icon={fileTypePhotoshop2} {...ICON_SIZE} />;
      break;
    case 'illustrator':
      thumb = <Icon icon={fileTypeAi2} {...ICON_SIZE} />;
      break;
    default:
      thumb = <Icon icon={fileFill} {...ICON_SIZE} />;
  }
  return thumb;
}
