import Card from '#/components/Card';
import SearchField from '#/components/SearchField';
import DashboardService from '#/services/DashboardService';
import PeopleService from '#/services/PeopleService';
import { BasePerson } from '#/types/People';
import { Shadows } from '#/utils/theme';
import { Box, Button, Container as MuiContainer } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import { AddCircleRounded } from '@material-ui/icons';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import InfiniteList, {
  InfiniteListFetchRows,
  InfiniteListRowRenderer,
} from '../../InfiniteList';
import PageHeader from '../../PageHeader';
import Value from './../../Value';
import PersonCard from './PersonCard';
import { useRouter } from 'next/router';
import ReceptionModal from '#/components/ReceptionModal';
import ReceptionService from '#/services/ReceptionService';

const Container = styled(MuiContainer)`
  && {
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
    height: 100%;
    flex: 1;
  }
`;

const Header = withTheme(styled(PageHeader)``);

const AddNew = styled(Button)`
  grid-area: add-new;
  height: 42px;
`;

const ListContainer = styled(Card)`
  && {
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
    flex-shrink: 0;
    padding: 0;
  }
`;

const ListWrapper = styled(Box)`
  height: 70vh;
`;

const List = styled(InfiniteList)`
  flex: 1;
`;

const DashboardToday = styled(Value)`
  margin-left: 1rem;
`;

const SearchBar = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: ${Shadows.bottom};
`;

const Search = styled(SearchField)`
  flex: 1;
  max-width: 400px;
`;

const PeoplePage = (): ReactElement => {
  const { enqueueSnackbar } = useSnackbar();

  const route = useRouter();

  const [selectedFilter, setSelectedFilter] = useState<{
    nameOrCardNumber?: string | null;
  }>({});

  useEffect(
    () =>
      setSelectedFilter({
        nameOrCardNumber: route.query.q as string,
      }),
    [],
  );

  const [todayEntrances, setTodayEntrances] = useState<number | null>();
  const [todayRegisters, setTodayRegisters] = useState<number | null>();
  const [openReceptionModal, setOpenReceptionModal] = useState<boolean>(false);
  const [
    personReceptionModal,
    setPersonReceptionModal,
  ] = useState<BasePerson | null>(null);

  const fetchPeople: InfiniteListFetchRows = (startIndex, limit, filter) =>
    PeopleService.get(startIndex, limit, filter);

  const fetchDashboardToday = () =>
    DashboardService.getToday().then(({ entrances, registers }) => {
      setTodayEntrances(entrances);
      setTodayRegisters(registers);
    });

  const onChangeFilter = (value?: string) =>
    setSelectedFilter({ nameOrCardNumber: value });

  const addNewEntrance = (person: BasePerson) => {
    setPersonReceptionModal(person);
    setOpenReceptionModal(true);
  };

  /*
  const handleCloseConfirmationModal = () => {
    setConfirmationModal({ ...confirmationModal, open: false });
    document.getElementById('search-field')?.focus();
  };*/

  const handleCloseReceptionModal = () => {
    setPersonReceptionModal(null);
    setOpenReceptionModal(false);
    document.getElementById('search-field')?.focus();
  };

  const confirmReception = (
    person: BasePerson,
    date: moment.Moment,
    observation: string,
  ) => {
    ReceptionService.post(person, date, observation).then(({ status }) => {
      if (status === 200) {
        fetchDashboardToday();
        handleCloseReceptionModal();
      } else {
        enqueueSnackbar('Ocorreu um erro ao confirmar uma recepção', {
          variant: 'error',
        });
      }
    });
  };

  const renderControls = () => (
    <Link href="/pessoas/cadastro">
      <AddNew variant="contained" startIcon={<AddCircleRounded />}>
        Nova Pessoa
      </AddNew>
    </Link>
  );

  useEffect(() => {
    fetchDashboardToday();
  }, []);

  const rowRenderer: InfiniteListRowRenderer = (item, isRowLoaded, props) => (
    <PersonCard
      item={item}
      isRowLoaded={isRowLoaded}
      props={props}
      addNewEntrance={addNewEntrance}
    />
  );

  return (
    <Container>
      <Header title="Pessoas" sideComponent={renderControls()} />
      <ListContainer>
        <SearchBar>
          <Search placeholder="Nome ou cartão" onFilter={onChangeFilter} />
          <DashboardToday
            value={todayEntrances != null ? todayEntrances : '-'}
            label="entradas hoje"
            medium
            alignRight
          />
          <DashboardToday
            value={todayRegisters != null ? todayRegisters : '-'}
            label="cadastros hoje"
            medium
            alignRight
          />
        </SearchBar>
        <ListWrapper>
          <List
            fetchRows={fetchPeople}
            rowRenderer={rowRenderer}
            filter={selectedFilter}
          />
        </ListWrapper>
      </ListContainer>

      {openReceptionModal && (
        <ReceptionModal
          open={openReceptionModal}
          handleClose={handleCloseReceptionModal}
          person={personReceptionModal}
          confirmReception={confirmReception}
        />
      )}
    </Container>
  );
};

export default PeoplePage;
