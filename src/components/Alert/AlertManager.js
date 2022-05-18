import { Box } from '@mui/material';
import { nanoid } from 'nanoid';
import { useReducer } from 'react';
import { AlertComponent } from '../';

export const alertTypes = ['success', 'info', 'warning', 'error'];
const initialState = [];

function alertReducer(state, action) {
    switch (action.type) {
        case 'add':
            const {
                id = '',
                timeLimit = 10000,
                text = '',
                link = '',
                alertType,
                alertTitle = '',
            } = action.payload;

            const newState = [
                {
                    id,
                    timeLimit,
                    text,
                    link,
                    alertType: alertType || alertTypes[0],
                    alertTitle,
                },
                ...state,
            ];

            return newState;
        case 'remove':
            return state.filter(a => a.id !== action.payload.id);

        default:
            return state;
    }
}

export function useAlertReducer() {
    const [state, dispatch] = useReducer(alertReducer, initialState);
    function update(action) {
        if (action.type === 'add') {
            action.payload = {
                ...action.payload,
                id: action.payload.id || nanoid(),
                timeLimit: action.payload.timeLimit || 10000,
                link: action.payload.link ? `https://${action.payload.link}` : undefined,
            }

            setTimeout(() => {
                dispatch({
                    type: 'remove',
                    payload: {
                        id: action.payload.id
                    }
                });
            }, action.payload.timeLimit);
        }
        dispatch(action);
    }

    return [state, update];
}

export default function AlertManager({alerts, dispatch}) {
    return (
        <Box sx={{position: 'absolute', top: 20, right: 20 }}>
            {alerts.map((a) => <AlertComponent key={a.id} dispatch={dispatch} {...a} />)}
        </Box>
    );
}
