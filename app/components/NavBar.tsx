import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  withTheme,
} from '@material-ui/core';
import AutocompleteInput from '#/components/AutocompleteInput';
import { ExitToAppRounded, PersonRounded } from '@material-ui/icons';
import Link from 'next/link';
import styled from 'styled-components';

import { useAuthMethods } from '#/packages/auth/auth-context';
import { useContext, useEffect } from 'react';
import { InfiniteListFetchRows } from './InfiniteList';
import PeopleService from '#/services/PeopleService';
import { InitiativesContext } from '#/contexts/InitiativesContext';

const Logo = withTheme(styled(Avatar)`
  && {
    width: 3rem;
    height: 3rem;
    margin-right: 2rem;
    cursor: pointer;

    ${({ theme }) => theme.breakpoints.down('sm')} {
      margin-right: 1rem;
    }
  }
`);

const Toolbar = styled(Container)`
  && {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    align-items: center;
    display: flex;
  }

  @media (max-width: 600px) {
    justify-content: flex-start;
  }
`;

const Links = styled(Box)`
  display: flex;
  align-items: center;
`;

const NavButton = withTheme(styled(Button)`
  && {
    margin-right: 1rem;

    ${({ theme }) => theme.breakpoints.down('sm')} {
      display: none;
    }
  }
`);

const NavIconButton = withTheme(styled(IconButton)`
  && {
    ${({ theme }) => theme.breakpoints.up('md')} {
      display: none;
    }
  }
`);

const FloatingBox = styled(Box)`
  display: flex;
  align-items: center;
  position: absolute;
  height: 56px;
  right: 0;
  top: 20px;
`;

const Flag = withTheme(styled.img`
  height: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;
  }
`);

const ButtonAppBar = (): React.ReactElement => {
  const { logout } = useAuthMethods();

  const {
    setChoosenInitiative,
    choosenInitiative,
    allInitiatives,
  } = useContext(InitiativesContext);

  const fetchPeople: InfiniteListFetchRows = (startIndex, limit, filter) =>
    PeopleService.get(startIndex, limit, filter);

  useEffect(() => {
    fetchPeople(0, 7, {
      personName: null,
      initiativeName: allInitiatives[0]?.InitiativeName,
    });
    setChoosenInitiative(allInitiatives[0]?.InitiativeName);
  }, [allInitiatives]);

  const handleChooseInitiative = (event: string | null) => {
    if (event) {
      fetchPeople(0, 7, {
        personName: null,
        initiativeName: event,
      });
      setChoosenInitiative(event);
    } else {
      setChoosenInitiative(undefined);
    }
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Links>
          <Link href="/pessoas">
            <Logo alt="Canto da Rua" src="/images/logo.png" />
          </Link>

          <NavIconButton>
            <Link href="/pessoas">
              <PersonRounded />
            </Link>
          </NavIconButton>
          <NavButton>
            <Link href="/pessoas">Pessoas</Link>
          </NavButton>

          <NavIconButton>
            <Link href="/iniciativas">
              <PersonRounded />
            </Link>
          </NavIconButton>
          <NavButton>
            <Link href="/iniciativas">Iniciativas</Link>
          </NavButton>

<<<<<<< HEAD
=======
          <NavIconButton>
            <Link href="/relatorios">
              <TransferWithinAStationRounded />
            </Link>
          </NavIconButton>
          <NavButton>
            <Link href="/relatorios">Relatórios</Link>
          </NavButton>

          <NavIconButton>
            <Link href="/iniciativas">
              <PersonRounded />
            </Link>
          </NavIconButton>
          <NavButton>
            <Link href="/iniciativas">Iniciativas</Link>
          </NavButton>

>>>>>>> 9f33ac264847961f0d6886fb4f65fe9bee4a2d43
        </Links>
        <AutocompleteInput
          label="Nome iniciativa"
          options={allInitiatives.map((item) => item.InitiativeName)}
          value={choosenInitiative}
          onChange={handleChooseInitiative}
        />
      </Toolbar>
      <FloatingBox>
        <NavIconButton onClick={logout}>
          <ExitToAppRounded />
        </NavIconButton>
        <NavButton onClick={logout}>Sair</NavButton>
        <Flag src="/images/flag.png" />
      </FloatingBox>
    </AppBar>
  );
};

export default ButtonAppBar;
