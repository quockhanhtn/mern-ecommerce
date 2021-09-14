import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Divider, Box } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getMails } from '../../../redux/slices/mail';
//
import Scrollbar from '../../Scrollbar';
import EmptyContent from '../../EmptyContent';
import MailItem from './MailItem';
import MailToolbar from './MailToolbar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column'
});

// ----------------------------------------------------------------------

MailList.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function MailList({ onOpenSidebar }) {
  const params = useParams();
  const dispatch = useDispatch();
  const { mails } = useSelector((state) => state.mail);
  const [selectedMails, setSelectedMails] = useState([]);
  const [dense, setDense] = useState(false);
  const isEmpty = mails.allIds.length < 1;

  useEffect(() => {
    dispatch(getMails(params));
  }, [dispatch, params]);

  const handleSelectAllMails = () => {
    setSelectedMails(mails.allIds.map((mailId) => mailId));
  };

  const handleToggleDense = () => {
    setDense((prev) => !prev);
  };

  const handleDeselectAllMails = () => {
    setSelectedMails([]);
  };

  const handleSelectOneMail = (mailId) => {
    setSelectedMails((prevSelectedMails) => {
      if (!prevSelectedMails.includes(mailId)) {
        return [...prevSelectedMails, mailId];
      }
      return prevSelectedMails;
    });
  };

  const handleDeselectOneMail = (mailId) => {
    setSelectedMails((prevSelectedMails) => prevSelectedMails.filter((id) => id !== mailId));
  };

  return (
    <RootStyle>
      <MailToolbar
        mails={mails.allIds.length}
        selectedMails={selectedMails.length}
        onSelectAll={handleSelectAllMails}
        onOpenSidebar={onOpenSidebar}
        onDeselectAll={handleDeselectAllMails}
        onToggleDense={handleToggleDense}
      />

      <Divider />

      {!isEmpty ? (
        <Scrollbar>
          <Box sx={{ minWidth: { md: 800 } }}>
            {mails.allIds.map((mailId) => (
              <MailItem
                key={mailId}
                isDense={dense}
                mail={mails.byId[mailId]}
                isSelected={selectedMails.includes(mailId)}
                onSelect={() => handleSelectOneMail(mailId)}
                onDeselect={() => handleDeselectOneMail(mailId)}
              />
            ))}
          </Box>
        </Scrollbar>
      ) : (
        <EmptyContent
          title="There is no conversation"
          img="/static/illustrations/illustration_empty_mail.svg"
          sx={{ flexGrow: 1, height: 'auto' }}
        />
      )}
    </RootStyle>
  );
}
