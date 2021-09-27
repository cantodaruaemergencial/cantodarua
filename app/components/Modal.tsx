import { ReactElement, ReactNode } from 'react';
import {
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
  Box,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
  title: string;
  open: boolean;
  handleClose: () => void;
  actions?: ReactNode;
  content?: ReactNode;
  width?: string;
}

const useStyles = makeStyles((width?: string) =>
  createStyles({
    textTitle: {
      textAlign: 'center',
    },
    modal: {
      width: width || '1000px',
      padding: '8px 8px 18px 8px',
      borderRadius: '6px',
    },
  }),
);

const Modal = ({
  title = '',
  open,
  handleClose,
  actions,
  content,
  width,
}: Props): ReactElement => {
  const styles = useStyles(width);
  return (
    <Dialog open={open} onClose={handleClose} classes={{ paper: styles.modal }}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography component="h2" variant="h3">
              {title}
            </Typography>
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
    </Dialog>
  );
};

export default Modal;
