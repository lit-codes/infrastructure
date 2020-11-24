/* React */
import React, { useState, useRef, useEffect } from 'react';
/* Material UI Components */
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import echarts from 'echarts';

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
}));
function Chart({loadPromise, title}) {
    const classes = useStyles();
    const chartRef = useRef();
    const [chart, setChart] = useState();

    useEffect(() => {
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
        loadPromise.then((config) => {
            chart.setOption(config);
            chart.hideLoading();
            chart.resize();
        }).catch(console.error);
        new ResizeObserver(() => chart.resize()).observe(chartRef.current);
        setChart(chart);
    }, []);
    return (
        <Paper className={classes.box} elevation={3} variant="outlined" square>
            <AppBar position="static" className={classes.header}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {title}
                    </Typography>
                    <div className={classes.grow} />
                </Toolbar>
            </AppBar>
            <div className={classes.chart} ref={chartRef}></div>
        </Paper>
    );
}

export default Chart;
