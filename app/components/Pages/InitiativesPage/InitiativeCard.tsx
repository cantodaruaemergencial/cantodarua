import Chip from '#/components/Chip';
import { Initiative } from '#/types/Initiatives';
import {
  Box,
  Typography,
  withTheme,
  Tooltip
} from '@material-ui/core';
import { PanToolRounded } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import Link from 'next/link';
import { ReactElement } from 'react';
import { ListRowProps } from 'react-virtualized';
import styled from 'styled-components';

const PersonWrapper = styled(Box)`
  flex: 0 0 auto;
  height: 100%;
`;

const PersonBox = withTheme(styled(Box)`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1.5rem 2rem;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    flex-direction: column;
    align-items: stretch;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`);

const Info = withTheme(styled(Box)`
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    margin-bottom: 0.75rem;
  }
`);

const Title = withTheme(styled(Typography)`
  && {
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    ${({ theme }) => theme.breakpoints.down('xs')} {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`);

const InitiativeInfo = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0 0.75rem;
  flex: 1;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    width: 90%;
  }
`);

const Options = styled(Box)`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  item: Initiative;
  isRowLoaded: boolean;
  props: ListRowProps;
}

const InitiativeCard = ({
  item,
  isRowLoaded,
  props: { key, index },
}: Props): ReactElement => {
  const renderSkeleton = () => (
    <PersonWrapper key={`${key}-${index}-skeleton`}>
      <PersonBox condensed>
        <Info>
          <Skeleton variant="rect" width={64} height={24} />
          <InitiativeInfo>
            <Title variant="body2">
              <Skeleton variant="text" width={160} />
            </Title>
          </InitiativeInfo>
        </Info>
        <Options>
          <Chip loading />
          <Skeleton variant="rect" width={95} height={27} />
        </Options>
      </PersonBox>
    </PersonWrapper>
  );

  if (!isRowLoaded) return renderSkeleton();

  const { id, InitiativeName, Address } = item;

  return (
    <PersonWrapper key={id}>
      <PersonBox condensed>
        <Info>
          <InitiativeInfo>
            <Link href={`/iniciativas${id}`}>
              <Title variant="body2">
                {InitiativeName &&
                  <Tooltip title='Preferencial'>
                    <PanToolRounded style={{ fill: 'rgb(76, 175, 80)' }} />
                  </Tooltip>}
                {Address}
              </Title>
            </Link>
            {InitiativeName && (
              <Typography variant="caption">{InitiativeName}</Typography>
            )}
          </InitiativeInfo>
        </Info>
      </PersonBox>
    </PersonWrapper >
  );
};

export default InitiativeCard;
