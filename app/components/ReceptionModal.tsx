import Modal from './Modal';
import { ReactElement, useState } from 'react';
import { Grid } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment from 'moment';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const ReceptionModal = ({ open, handleClose }: Props): ReactElement => {
  const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(
    moment(),
  );
  console.log(selectedDate);
  const getContent = (): ReactElement => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="Data acolhimento"
            format="DD/MM/YYYY"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </Grid>
      </Grid>
    );
  };
  return (
    <Modal
      title={'Informações acolhimento'}
      open={open}
      handleClose={handleClose}
      content={getContent()}
    />
  );
};

export default ReceptionModal;
