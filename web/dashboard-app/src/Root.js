/* React */
import React, { useState, useEffect } from 'react';
/* Material UI Components */
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Responsive, WidthProvider } from 'react-grid-layout';
/* Local modules */
import Chart from './Chart';
import Header from './Header';
import { loadCharts } from './Questions';
import Questions from './Questions';
import API from './API';

const ResponsiveGridLayout = WidthProvider(Responsive);

const useStyles = makeStyles(theme => ({
    chartContainer: {
        width: 400,
        height: 400,
    },
}));
function Root() {
    const classes = useStyles();
    const [ charts, setCharts ] = useState([]);
    const [ api, setAPI ] = useState({});

    useEffect(() => {
        setAPI(new API());
    }, []);

    async function onQuestionChange(element, question) {
        try {
            setCharts(await loadCharts(api, question.id));
        } catch(e) {
            console.error('Something went wrong when trying to fetch the question, %s', e);
        }
    }
    function onLayoutChange(layout) {
        // Save the layout somewhere for the session 
    }
    return (
        <React.Fragment>
            <Header>
                <Questions onQuestionChange={onQuestionChange} />
            </Header>
            <Container maxWidth={false}>
                <ResponsiveGridLayout
                    breakpoints={{lg: 1200, md: 800, sm: 600, xs: 400, xxs: 0}}
                    cols={{lg: 4, md: 3, sm: 2, xs: 1, xxs: 1}}
                    compactType="vertical"
                    className="layout"
                    onLayoutChange={onLayoutChange}
                >
                    {charts.map((chart, id) => <div className={classes.chartContainer} key={id}><Chart {...chart} /></div>)}
                </ResponsiveGridLayout>
            </Container>
        </React.Fragment>
    );
}

export default Root;
