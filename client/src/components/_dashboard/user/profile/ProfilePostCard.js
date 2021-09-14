import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import roundSend from '@iconify/icons-ic/round-send';
import heartFill from '@iconify/icons-eva/heart-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import messageSquareFill from '@iconify/icons-eva/message-square-fill';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  AvatarGroup,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
// hooks
import useAuth from '../../../../hooks/useAuth';
//
import MyAvatar from '../../../MyAvatar';
import EmojiPicker from '../../../EmojiPicker';
import { MCheckbox } from '../../../@material-extend';

// ----------------------------------------------------------------------

ProfilePostCard.propTypes = {
  post: PropTypes.object
};

export default function ProfilePostCard({ post }) {
  const { user } = useAuth();
  const commentInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isLiked, setLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.personLikes.length);
  const [message, setMessage] = useState('');
  const hasComments = post.comments.length > 0;

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleClickAttach = () => {
    fileInputRef.current.click();
  };

  const handleClickComment = () => {
    commentInputRef.current.focus();
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
            {user.displayName}
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <Icon icon={moreVerticalFill} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography variant="body1">{post.message}</Typography>
        <Box sx={{ position: 'relative', pt: 'calc(100% / 16 * 9)' }}>
          <Box
            component="img"
            alt="post media"
            src={post.media}
            sx={{
              top: 0,
              width: 1,
              height: 1,
              borderRadius: 1,
              objectFit: 'cover',
              position: 'absolute'
            }}
          />
        </Box>

        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <MCheckbox
                size="small"
                color="error"
                checked={isLiked}
                icon={<Icon icon={heartFill} width={20} height={20} />}
                checkedIcon={<Icon icon={heartFill} width={20} height={20} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(likes)}
            sx={{ minWidth: 72, mr: 0 }}
          />
          <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
            {post.personLikes.map((person) => (
              <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
            ))}
          </AvatarGroup>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClickComment}>
            <Icon icon={messageSquareFill} width={20} height={20} />
          </IconButton>
          <IconButton>
            <Icon icon={shareFill} width={20} height={20} />
          </IconButton>
        </Stack>

        {hasComments && (
          <Stack spacing={1.5}>
            {post.comments.map((comment) => (
              <Stack key={comment.id} direction="row" spacing={2}>
                <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />
                <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ sm: 'center' }}
                    justifyContent="space-between"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography variant="subtitle2">{comment.author.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {fDate(comment.createdAt)}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {comment.message}
                  </Typography>
                </Paper>
              </Stack>
            ))}
          </Stack>
        )}

        <Stack direction="row" alignItems="center">
          <MyAvatar />
          <TextField
            fullWidth
            size="small"
            value={message}
            inputRef={commentInputRef}
            placeholder="Write a comment…"
            onChange={handleChangeMessage}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClickAttach}>
                    <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
                  </IconButton>
                  <EmojiPicker alignRight value={message} setValue={setMessage} />
                </InputAdornment>
              )
            }}
            sx={{
              ml: 2,
              mr: 1,
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
              }
            }}
          />
          <IconButton>
            <Icon icon={roundSend} width={24} height={24} />
          </IconButton>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
        </Stack>
      </Stack>
    </Card>
  );
}
