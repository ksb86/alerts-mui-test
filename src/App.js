import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { AlertExample, AlertManager, useAlertReducer } from './components';
import { createContext } from 'react';

export const AlertsContext = createContext();

function App() {
    const [alerts, dispatch] = useAlertReducer();

    return (
        <AlertsContext.Provider value={{ alerts, dispatch }}>
            <CssBaseline />
            <div className="App">
                <AlertsContext.Consumer>
                    {({ alerts, dispatch }) => (
                        <>
                            <AlertManager alerts={alerts} dispatch={dispatch} />
                            <AlertExample alerts={alerts} dispatch={dispatch} />
                        </>
                    )}
                </AlertsContext.Consumer>
            </div>
        </AlertsContext.Provider>
    );
}

export default App;
