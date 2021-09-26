import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { Initiative } from '#/types/Initiatives';

interface SelectPropsInterface {
  label: string;
  options: Initiative[];
  value?: string | undefined;
  onChange: (value: Initiative | null) => void;
}

const AutocompleteComponent: typeof Autocomplete = styled(Autocomplete)`
  flex: 1;
  max-width: 250px;
`;

const AutocompleteInput = ({
  label,
  options,
  onChange,
}: SelectPropsInterface) => {
  const defaultProps = {
    options: options,
    getOptionLabel: (option: Initiative) => option.InitiativeName,
  };

  return (
    <AutocompleteComponent
      {...defaultProps}
      autoHighlight
      onChange={(_event: any, value: Initiative | null) => onChange(value)}
      noOptionsText="Não encontrado"
      loadingText="Carregando"
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default AutocompleteInput;
