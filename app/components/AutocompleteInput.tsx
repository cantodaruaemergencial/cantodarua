import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

interface SelectPropsInterface {
  label: string;
  options: string[];
  value?: string | undefined;
  onChange: (value: string | null) => void;
}

const AutocompleteComponent: typeof Autocomplete = styled(Autocomplete)`
  flex: 1;
  max-width: 250px;
  min-width: 200px;
  position: absolute;
  top: 20px;
  right: 320px;

  @media (max-width: 955px) {
    right: 80px;
    min-width: 200px;
  }
  @media (max-width: 600px) {
    right: 60px;
  }
`;

const AutocompleteInput = ({
  label,
  options,
  onChange,
  value,
}: SelectPropsInterface) => {
  const defaultProps = {
    options: options,
    getOptionLabel: (option: string) => option,
  };

  return (
    <AutocompleteComponent
      {...defaultProps}
      autoHighlight
      disableClearable
      onChange={(_event: any, value: string | null) => onChange(value)}
      value={value}
      noOptionsText="Não encontrado"
      loadingText="Carregando"
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default AutocompleteInput;
