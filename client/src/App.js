import React from "react";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super();
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then((res) => res.text())
            .then((res) => this.setState({ apiResponse: res }));
    }

    componentWillMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className="App">
                <p>{this.state.apiResponse}</p>
            </div>
        );
    }
}

export default App;
