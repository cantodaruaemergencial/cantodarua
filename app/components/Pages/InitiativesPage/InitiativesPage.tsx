import { withTheme } from '@material-ui/core/styles';
import { Box, Button, Container as MuiContainer } from '@material-ui/core';
import { AddCircleRounded } from '@material-ui/icons';
import { ReactElement, useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Card from '#/components/Card';
import PageHeader from '../../PageHeader';
import InfiniteList, {
  InfiniteListFetchRows,
  InfiniteListRowRenderer,
} from '../../InfiniteList';
import { Shadows } from '#/utils/theme';
import SearchField from '#/components/SearchField';
import InitiativesService from '#/services/InitiativesService';
import { useRouter } from 'next/router';
import { InitiativesContext } from '#/contexts/InitiativesContext';
import InitiativeCard from './InitiativeCard';
const Container = styled(MuiContainer)`
  && {
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
    height: 100%;
    flex: 1;
  }
`;
const AddNew = styled(Button)`
  grid-area: add-new;
  height: 42px;
`;

const Header = withTheme(styled(PageHeader)``);

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




const InitiativesPage = (): ReactElement => {


  const route = useRouter();

  const { choosenInitiative } = useContext(InitiativesContext);

  const fetchInitiatives:  InfiniteListFetchRows = (startIndex, limit, filter) =>
    InitiativesService.getInitiatives(startIndex, limit, filter);

  const [selectedFilter, setSelectedFilter] = useState<{
    nameOrCardNumber?: string | null;
    initiativeName?: string | null;
  }>({});

  useEffect(
    () =>
      setSelectedFilter({
        nameOrCardNumber: route.query.q as string,
        initiativeName: choosenInitiative,
      }),
    [],
  );

  const onChangeFilter = (value?: string) =>
  setSelectedFilter({
    nameOrCardNumber: value,
    initiativeName: choosenInitiative,
  });

  const renderControls = () => (
    <Link href="/iniciativas/cadastro">
      <AddNew variant="contained" startIcon={<AddCircleRounded />}>
        Nova iniciativa
      </AddNew>
    </Link>
  );

  const rowRenderer: InfiniteListRowRenderer = (item, isRowLoaded, props) => (
    <InitiativeCard
      item={item}
      isRowLoaded={isRowLoaded}
      props={props}
    />
  );

  return (
    <Container>
      <Header title="Iniciativas" sideComponent={renderControls()} />
      <ListContainer>
        <SearchBar>
          <Search placeholder="Nome ou Endereço da Iniciativa" onFilter={onChangeFilter} />
        </SearchBar>
        <ListWrapper>
          <List
            fetchRows={fetchInitiatives}
            rowRenderer={rowRenderer}
            filter={selectedFilter}
          />
        </ListWrapper>
      </ListContainer>
    </Container>
  );
};

export default InitiativesPage;
