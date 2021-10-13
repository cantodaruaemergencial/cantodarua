import Modal from './Modal';
import { ReactElement, useState } from 'react';
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment from 'moment';
import { BasePerson } from '#/types/People';
import styled from 'styled-components';

interface Props {
  open: boolean;
  person: BasePerson | null;
  handleClose: () => void;
  confirmReception: (
    person: BasePerson,
    selectedDate: moment.Moment,
    description: string,
  ) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    selectDateReception: {
      width: '100%',
    },
    descriptionReception: {
      width: '100%',
    },
  }),
);

const SelectDateReception = styled(KeyboardDatePicker)`
  && {
    width: 100%;
  }
`;

const DescriptionReception = styled(TextField)`
  && {
    width: 100%;
  }
`;

const ReceptionModal = ({
  open,
  handleClose,
  person,
  confirmReception,
}: Props): ReactElement => {
  const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(
    moment(),
  );
  const [dateMax] = useState<MaterialUiPickersDate>(moment());
  const [observation, setObservation] = useState<string>('');
  const styles = useStyles();

  const selectDateNotIsValid = Boolean(
    !selectedDate || !selectedDate.isValid() || selectedDate.isAfter(dateMax),
  );

  const getContent = (): ReactElement => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {person && (
          <Typography>
            {person.CardNumber
              ? `Registro do acolhimento de ${person.Name} (${person.CardNumber})`
              : `Registro do acolhimento de ${person.Name}`}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <SelectDateReception
          autoOk
          variant="inline"
          inputVariant="outlined"
          label="Data acolhimento"
          format="DD/MM/YYYY"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className={styles.selectDateReception}
          maxDate={moment()}
          error={selectDateNotIsValid}
          helperText={selectDateNotIsValid ? 'Data invalida' : null}
        />
      </Grid>
      <Grid item xs={12}>
        <DescriptionReception
          label="Descrição do acolhimento"
          multiline
          rows={4}
          style={{ width: '100%' }}
          value={observation}
          onChange={(e) => setObservation(e.currentTarget.value)}
          className={styles.descriptionReception}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );

  const getActions = (): ReactElement => (
    <Button
      onClick={() => {
        if (person !== null && selectedDate !== null)
          confirmReception(person, selectedDate, observation);
      }}
      variant="outlined"
      disabled={selectDateNotIsValid}
    >
      CONFIRMAR
    </Button>
  );

  return (
    <Modal
      title={'Registrar acolhimento'}
      open={open}
      handleClose={handleClose}
      content={getContent()}
      actions={getActions()}
    />
  );
};

export default ReceptionModal;
