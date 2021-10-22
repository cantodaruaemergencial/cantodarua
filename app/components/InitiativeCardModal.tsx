import { Initiative } from '#/types/Initiatives';
import {
  Avatar,
  Box,
  Grow,
  Modal as TheModal,
  Typography,
  withTheme,
} from '@material-ui/core';
import { CheckCircleRounded } from '@material-ui/icons';
import styled from 'styled-components';
import TheCard from './Card';

const Modal = styled(TheModal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = withTheme(styled(Box)`
  background-color: ${({ theme }) => theme.palette.success.main};
  position: relative;
  border-radius: 16px;
`);

const Card = styled(TheCard)`
  && {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    width: 480px;
    max-width: 90vw;
    position: relative;
    padding: 1.5rem;
  }
`;

const Logo = withTheme(styled(Avatar)`
  && {
    width: 4rem;
    height: 4rem;
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
  }
`);

const Field = withTheme(styled(Box)`
  grid-column: 1 / 3;
  position: relative;
  border-radius: 4px;
`);


const Label = styled(Typography)`
  && {
    font-size: 0.7em;
    font-weight: bold;
  }
`;

const Value = styled(Typography)`
  && {
    font-size: 1em;

    &.bigger {
      font-weight: bold;
      font-size: 2.5em;
    }
  }
`;

const Banner = withTheme(styled(Box)`
  background-color: ${({ theme }) => theme.palette.success.main};
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  justify-content: start;
  grid-gap: .5rem;
  color: #fff;
  font-weight: bold;
  border-radius: 16px 16px 0 0;
  padding: 1.25rem 1.5rem;
  width: 100%;
`);

interface Props {
  open: boolean;
  newInitiative: boolean;
  initiative?: Initiative | null;
  className?: string;
  handleClose: () => void;
}

const InitiativeCardModal = ({
  initiative,
  open,
  newInitiative,
  handleClose,
  className,
}: Props) => {
  if (!initiative) return null;

  const {
    InitiativeName,
    Address,
  } = initiative;

  return (
    <Modal className={className} onClose={handleClose} open={open}>
      <Grow
        in={open}
        {...(open ? { timeout: 500 } : {})}
      >
        <ModalWrapper>
          {newInitiative && (
            <Banner>
              <CheckCircleRounded />
              Cadastro concluído com sucesso!
            </Banner>
          )}
          <Card>
            <Logo alt="Canto da Rua" src="/images/logo.png" />

            <Field>
              <Label>Nome da Iniciativa</Label>
              <Value className="bigger">{InitiativeName}</Value>
            </Field>

            <Field>
              <Label>Endereço da Iniciativa</Label>
              <Value>{Address}</Value>
            </Field>

          </Card>
        </ModalWrapper>
      </Grow>
    </Modal>
  );
};

export default InitiativeCardModal;
