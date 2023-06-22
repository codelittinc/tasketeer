import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import styles from './PermissionInput.module.css';
import COLORS from '../../../../utils/colors';
import EmailIcon from '../../../../../../assets/icons/email.svg';

const PermissionInput = ({ onSave, roles }) => {
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    const validateForm = () => {
      if (!email || !role) {
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        return false;
      }
      return true;
    };

    setIsFormValid(validateForm());
  }, [email, role]);

  return (
    <>
      <Paper
        component="form"
        variant="outlined"
        sx={{
          width: '100%',
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          border: `2px solid ${COLORS.neutral100}`,
          borderRadius: '12px',
          height: '56px',
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <img src={EmailIcon} />
        </IconButton>
        <InputBase
          type="email"
          autoComplete="on"
          sx={{ ml: 1, flex: 1.5, fontWeight: '600' }}
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <FormControl variant="standard" size="small" sx={{ m: 1, flex: 1 }}>
          <Select
            className={styles.rolesSelect}
            displayEmpty
            onChange={(event) => setRole(event.target.value)}
            renderValue={(selected) => {
              console.log(selected);
              if (!selected) {
                return <em className={styles.rolesSelectLabel}>Select Permission</em>;
              }
              return selected;
            }}
          >
            {roles?.map((role) => (
              <MenuItem
                key={role.id}
                value={role.name}
                sx={{
                  fontWeight: '600',
                  borderRadius: '8px',
                  margin: '4px',
                  '&:hover': {
                    backgroundColor: COLORS.primary200,
                  },
                  '&.Mui-selected': {
                    backgroundColor: COLORS.primary200,
                  },
                }}
              >
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
      <Button
        variant="contained"
        disabled={!isFormValid}
        onClick={() => onSave({
          email,
          role: roles.find((r) => r.name === role)?.id,
        })}
        sx={{
          marginLeft: '16px',
          fontWeight: 600,
          fontSize: '16px',
          fontFamily: 'Montserrat',
          fontStyle: 'normal',
          color: 'var(--neutral400)',
          backgroundColor: 'var(--neutral600)',
          height: '56px',
          width: '106px',
          textTransform: 'none',
          borderRadius: '12px',
          '&:hover': {
            backgroundColor: COLORS.primary200,
          },
        }}
      >
        Send
      </Button>
    </>
  );
};

PermissionInput.defaultProps = {
  onSave: () => {},
  roles: [],
};

PermissionInput.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  onSave: PropTypes.func,
};

export default PermissionInput;
