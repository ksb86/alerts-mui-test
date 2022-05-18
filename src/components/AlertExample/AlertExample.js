import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
} from '@mui/material';
import { useReducer } from 'react';
import { alertTypes } from '../Alert/AlertManager';

const initialFormState = {
    id: {
        error: '',
        value: '',
    },
    alertTitle: {
        error: '',
        value: '',
    },
    text: {
        error: '',
        value: '',
    },
    link: {
        error: '',
        value: '',
    },
    timeLimit: {
        error: '',
        value: '',
    },
    alertType: {
        error: '',
        value: alertTypes[0],
    },
};

function formReducer(state, action) {
    return {
        ...state,
        [action.payload.name]: {
            ...state[action.payload.name],
            error: '',
            [action.type]: action.payload[action.type],
        },
    };
}

export default function AlertExample({ alerts, dispatch }) {
    const [formState, formDispatch] = useReducer(formReducer, initialFormState);

    function handleTextChange({ target: { name, value } }) {
        formDispatch({
            type: 'value',
            payload: {
                name,
                value,
            },
        });
    }

    function handleOptionChange(e, value) {
        formDispatch({
            type: 'value',
            payload: {
                name: 'alertType',
                value,
            },
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (alerts.find((a) => a.id === formState.id.value)) {
            formDispatch({
                type: 'error',
                payload: {
                    name: 'id',
                    error: 'Duplicate ID!',
                },
            });
            return;
        } else if (!formState.text.value) {
            formDispatch({
                type: 'error',
                payload: {
                    name: 'text',
                    error: 'Text is Required!',
                },
            });
            return;
        }
        dispatch({
            type: 'add',
            payload: Object.entries(formState).reduce((acc, [key, value]) => {
                acc[key] = value.value;
                return acc;
            }, {}),
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    padding: 3,
                    background: '#f2f2f2',
                    width: 300,
                    margin: 'auto',
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <FormControl sx={{ marginBottom: 3 }}>
                    <InputLabel htmlFor="id">Alert ID (optional)</InputLabel>
                    <Input
                        autoComplete="off"
                        id="id"
                        name="id"
                        onChange={handleTextChange}
                        value={formState.id.value}
                        error={Boolean(formState.id.error)}
                    />
                    {Boolean(formState.id.error) && (
                        <FormHelperText id="id">
                            {formState.id.error}
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl sx={{ marginBottom: 3 }}>
                    <InputLabel htmlFor="alertTitle">
                        Alert Title (optional)
                    </InputLabel>
                    <Input
                        autoComplete="off"
                        id="alertTitle"
                        name="alertTitle"
                        onChange={handleTextChange}
                        value={formState.alertTitle.value}
                        error={Boolean(formState.alertTitle.error)}
                    />
                </FormControl>
                <FormControl sx={{ marginBottom: 3 }}>
                    <InputLabel htmlFor="text">Alert Text</InputLabel>
                    <Input
                        autoComplete="off"
                        id="text"
                        name="text"
                        onChange={handleTextChange}
                        value={formState.text.value}
                        error={Boolean(formState.text.error)}
                    />
                    {Boolean(formState.text.error) && (
                        <FormHelperText id="text">
                            {formState.text.error}
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl sx={{ marginBottom: 3 }}>
                    <InputLabel htmlFor="link">
                        Alert Link (optional)
                    </InputLabel>
                    <Input
                        autoComplete="off"
                        id="link"
                        name="link"
                        onChange={handleTextChange}
                        value={formState.link.value}
                        error={Boolean(formState.link.error)}
                        startAdornment={
                            <InputAdornment position="start">
                                https://
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl sx={{ marginBottom: 3 }}>
                    <InputLabel htmlFor="timeLimit">
                        Alert Time Limit (optional)
                    </InputLabel>
                    <Input
                        autoComplete="off"
                        placeholder="10000"
                        id="timeLimit"
                        name="timeLimit"
                        onChange={handleTextChange}
                        value={formState.timeLimit.value}
                        error={Boolean(formState.timeLimit.error)}
                    />
                </FormControl>
                <FormControl sx={{ marginBottom: 3 }}>
                    <Autocomplete
                        id="alertType"
                        name="alertType"
                        onChange={handleOptionChange}
                        defaultValue={alertTypes[0]}
                        value={formState.alertType.value || alertTypes[0]}
                        disablePortal
                        options={alertTypes}
                        renderInput={(params) => (
                            <TextField {...params} label="Alert Type" />
                        )}
                    />
                </FormControl>
                <Button sx={{ mb: 2 }} type="submit" variant="contained">
                    dispatch alert
                </Button>
            </Box>
        </form>
    );
}
