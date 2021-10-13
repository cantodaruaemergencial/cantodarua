import { ReactElement, ReactNode } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

interface Props {
  title: string;
  open: boolean;
  handleClose: () => void;
  actions?: ReactNode;
  content?: ReactNode;
}

const DialogStyled = styled(Dialog)`
  && {
    padding: 8px 8px 18px 8px;
    borderradius: 6px;
  }
`;

const Title = styled(Typography)`
  && {
    text-align: center;
  }
`;

const Modal = ({
  title = '',
  open,
  handleClose,
  actions,
  content,
}: Props): ReactElement => {
  return (
    <DialogStyled open={open} onClose={handleClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Title variant="h3">{title}</Title>
          </Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      {content && <DialogContent>{content}</DialogContent>}
      {actions && <DialogActions>{actions}</DialogActions>}
    </DialogStyled>
  );
};

export default Modal;
