import InitiativeService from '#/services/InitiativesService';
import { Form as FormType } from '#/types/Forms';
import { Initiative } from '#/types/Initiatives';
import { Container as MuiContainer } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import Form from '../Form/Form';
import PageHeader from '../PageHeader';
import InitiativeCardModal from '../InitiativeCardModal';

const Container = styled(MuiContainer)`
  && {
    max-width: 600px;
  }
`;

interface Props {
  initiativeId?: number | null;
  form?: FormType | null;
}

export interface IResult {
  type: string;
  message: string;
}

const InitiativePage = ({ initiativeId, form }: Props): ReactElement => {
  const router = useRouter();

  const [initiativeModal, setInitiativeModal] = useState<{
    initiative: Initiative | null;
    open: boolean;
  }>({ open: false, initiative: null });

  const onSubmit = async (data: { [key: string]: unknown }) => {
    return new Promise<string | null>((resolve, reject) => {
      InitiativeService.saveInitiative(data, initiativeId)
        .then((initiative) => {
          if (initiativeId !== null) {
            router.replace('/iniciativas');
            resolve('Cadastro atualizado com sucesso!');
          } else {
            showInitiativeCardModal(initiative);
            resolve(null);
          }
        })
        .catch(() => {
          reject('Ocorreu um erro. Tente novamente.');
        });
    });
  };

  const showInitiativeCardModal = (initiative: Initiative) =>
    setInitiativeModal({ open: true, initiative });

  const handleCloseInitiativeCardModal = () => {
    setInitiativeModal({ ...initiativeModal, open: false });
  };

  return (
    <Container>
      <PageHeader title={'Cadastro'} />
      {form && <Form form={form} onSubmit={onSubmit} />}
      <InitiativeCardModal
        {...initiativeModal}
        handleClose={handleCloseInitiativeCardModal}
        newInitiative
      />
    </Container>
  );
};

export default InitiativePage;
