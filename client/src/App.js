import react from 'react';
import { Container, Button } from '@material-ui/core';
import axios from 'axios';

const handleLogin = (e) => {
    e.preventDefault();
    console.log("Clicked!");
}

const App = () => {
    return (
            <div style={{"width": "100%", "height": "100%"}}>
            <Container>
            <Button variant="contained" color="primary" size="large" onClick={handleLogin}>
            Login
        </Button>
            </Container>
            </div>
    );
}

export default App;
