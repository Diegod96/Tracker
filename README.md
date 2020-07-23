# A Covid-19 Dashboard for the United States

<img width="949" alt="covid" src="https://user-images.githubusercontent.com/25403763/88329127-7b8c4480-ccf7-11ea-87e1-73058c52dbd2.PNG">


This can be found at https://master.d30wuvfk5j97tx.amplifyapp.com/

To use:
- Clone the repo
- npm install the package.json
- type `npm start` in the console to run locally

## Code & Resources
* **React Version:** 16.13.1
* **Libraries Used:** Axios, Chart-JS, Material-UI, etc.
* **API For Covid Data:** https://covid19.mathdro.id/api

## API
* Index.js handles fetching the data from the API url listed above.
* Data is collected by the country ``${url}/countries/${country}``
* fetchData collects data from the api such as confirmed, deaths, recovered, and when the data was last updated.
```
export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);

        return {confirmed, recovered, deaths, lastUpdate};
    } catch (error) {
        console.log(error)

    }

}
```
* fetchDailyData collects the same data as fetchData, but for the entire globe.
```
export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,


        }));

        return modifiedData;

    } catch (error) {
        console.log(error);
    }
}
```
* fetchCountries get all the countries from the API.

# Components
* This application has three components:
1. Cards
2. Chart
3. Country Picker

## Cards
* Cards component hanbdles the different type of cards that are displayed.
* Imports fetchDailyData from the index.js and grabs the data to be displayed for the card.
* The Cards display the data for the three main statistics:
1. The number of active cases
2. The number of recovered
3. The number of deaths
* Here is a snippet if of the card for deaths:
```
<Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Deaths
                        </Typography>
                        <Typography variant="h5" component="h2">
                            <CountUp start={0} end={deaths.value} duration={2.75} separator=","/>
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Number of deaths caused by COVID-19.
                        </Typography>
                    </CardContent>
                </Grid>
```

## Chart
* Chart component handles the generation of the chart.
* Imports fetchDailyData to get data.
* Both the barchart and linechart are initialized and filled with relevant information.
```
const lineChart = (
        dailyData[0] ? (
            <Line
                data={{
                    labels: dailyData.map(({date}) => date),
                    datasets: [{
                        data: dailyData.map((data) => data.confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map((data) => data.deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
            />
        ) : null
    );
```

## Country Picker
* Handles the country picker bar that allows the user to select a country and view its covid stats.
* Calls fetchCountries from the index.js.
```

    return (
        <FormControl className={styles.FormControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
```

# App.js
* Generates main web page.
* Calls in the componenets to construct the page.
```
render() {
        const {data, country} = this.state;

        return (

            <div className={styles.container}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={styles.title}>
                            Welcome To The Covid-19 Global Dashboard
                        </Typography>
                        <Button color="inherit" href="https://hardcore-ramanujan-a1457f.netlify.app/">Covid-19 US
                            Dashboard</Button>
                        <Button color="inherit" href="https://covid-flask.herokuapp.com/">Covid-19 Probability
                            Detector</Button>
                        <Button color="inherit" href="https://eloquent-jones-2d79ac.netlify.app/">Handwashing
                            Application</Button>
                    </Toolbar>
                </AppBar>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>

        )
    }
```
