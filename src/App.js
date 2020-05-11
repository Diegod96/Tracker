import React from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from './images/image.png';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';





class App extends React.Component {
    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const data = await fetchData();

        this.setState({ data });
    }

    handleCountryChange = async (country) => {
        const data = await fetchData(country);

        this.setState({ data, country: country });
    }



    render() {
        const { data, country } = this.state;

        return (

            <div className={styles.container}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={styles.title}>
                            Welcome To The Covid-19 Global Dashboard
                        </Typography>
                        <Button color="inherit" href="https://hardcore-ramanujan-a1457f.netlify.app/">Covid-19 US Dashboard</Button>
                        <Button color="inherit" href="https://covid-flask.herokuapp.com/">Covid-19 Probability Detector</Button>
                        <Button color="inherit" href="https://eloquent-jones-2d79ac.netlify.app/">Handwashing Application</Button>
                    </Toolbar>
                </AppBar>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>

        )
    }
}

export default App;
