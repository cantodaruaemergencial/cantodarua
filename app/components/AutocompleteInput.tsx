import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { Initiative } from '#/types/Initiatives';

interface SelectPropsInterface {
  label: string;
  options: Initiative[];
  value?: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AutocompleteComponent = styled(Autocomplete)`
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
      clearOnEscape
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event)}
      noOptionsText="Não encontrado"
      loadingText="Carregando"
      id="combo-box-demo"
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default AutocompleteInput;
