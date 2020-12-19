/* React */
import React, { useState, useRef, useEffect } from 'react';
/* Material UI Components */
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import GraphiQL from 'graphiql';
import echarts from 'echarts';

import { API_URL } from './API';

const useStyles = makeStyles(theme => ({
    box: {
        width: '100%',
        height: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    header: {
        '& div': {
            minHeight: 48,
        },
    },
    chart: {
        width: '100%',
        height: 'calc(100% - 48px)',
    },
    hide: {
        display: 'none',
    },
}));
function Chart({chartData}) {
    const classes = useStyles();
    const chartRef = useRef();
    const [chart, setChart] = useState();
    const [editing, setEditing] = useState();

    useEffect(() => {
        if (editing) return;
        const chart = echarts.init(chartRef.current, 'dark', { height: 'auto', width: 'auto',});
        chart.setOption({
            textStyle: {
                color: 'rgba(255, 255, 255, 1.0)'
            },
            tooltip: {
                show: true,
                trigger: 'axis',
            },
        });
        chart.showLoading();
        chartData.load().then((data) => {
            chart.setOption(data);
            chart.hideLoading();
            chart.resize();
        }).catch(console.error);
        new ResizeObserver(() => chart.resize()).observe(chartRef.current);
        setChart(chart);
    });
    return (
        <Paper className={classes.box} elevation={3} variant="outlined" square>
            <AppBar position="static" className={classes.header}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {chartData.title}
                    </Typography>
                    <div className={classes.grow} />
                    {
                        editing
                            ? <Button color="secondary" onClick={() => setEditing(false)}><FullscreenExitIcon display="inline" fontSize="small" /></Button>
                            : <Button color="secondary" onClick={() => setEditing(true)}><EditIcon display="inline" fontSize="small" /></Button>
                    }
                </Toolbar>
            </AppBar>
            <div ref={chartRef} className={editing ? classes.hide : classes.chart}></div>
            <div className={!editing ? classes.hide : classes.chart}> 
                <GraphiQL
                    onEditQuery={chartData.onQueryChange()}
                    query={chartData.query}
                    fetcher={async graphQLParams => {
                        const data = await fetch(
                            `${API_URL}/v1/graphql`,
                            {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(graphQLParams),
                                credentials: 'same-origin',
                            },
                        );
                        return data.json().catch(() => data.text());
                    }}
                />
            </div>
        </Paper>
    );
}

export default Chart;
