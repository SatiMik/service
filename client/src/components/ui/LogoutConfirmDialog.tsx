import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { logoutUserThunk } from '../../redux/thunks/UserThunks';
import { useAppDispatch } from '../../redux/hooks';

type LogoutConfirmDialogPropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function LogoutConfirmDialog({ open, setOpen }: LogoutConfirmDialogPropsType): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title-logout"
    >
      <DialogTitle id="alert-dialog-title-logout">Вы уверены, что хотите выйти?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
         Нет
        </Button>
        <Button onClick={() => {dispatch(logoutUserThunk()); handleClose()}}>Выйти</Button>
    </DialogActions>
    </Dialog >
  );
}
