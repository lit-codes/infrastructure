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
import SaveIcon from '@material-ui/icons/Save';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import GraphiQL from 'graphiql';
import echarts from 'echarts';

import API from './API';
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

const api = new API();
function Chart({chartData, changeFullScreen}) {
    const classes = useStyles();
    const chartRef = useRef();
    const [chart, setChart] = useState();
    const [data, setData] = useState();
    const [isEditing, setIsEditing] = useState();
    const [isFullScreen, setIsFullScreen] = useState();

    useEffect(() => {
        chartData.onLoad((data) => {
            setData(data);
        });
    }, []);

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
        if (data) {
            chart.setOption(data);
            chart.hideLoading();
            chart.resize();
        } else {
            chart.showLoading();
        }
        new ResizeObserver(() => chart.resize()).observe(chartRef.current);
        setChart(chart);
    });

    function startEditing(isEditing) {
        setIsEditing(isEditing);
        startFullScreen(isEditing);
        if (!isEditing) {
            chartData.reload();
        }
    }
    function startFullScreen(isFullScreen) {
        setIsFullScreen(isFullScreen);
        changeFullScreen(isFullScreen);
    }
    return (
        <Paper className={classes.box} elevation={3} variant="outlined" square>
            <AppBar position="static" className={classes.header}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {chartData.title}
                    </Typography>
                    <div className={classes.grow} />
                    {
                        isEditing
                            ? <Button color="secondary" onClick={() => startEditing(false)}><SaveIcon display="inline" fontSize="small" /></Button>
                            : <Button color="secondary" onClick={() => startEditing(true)}><EditIcon display="inline" fontSize="small" /></Button>
                    }
                    {
                        isFullScreen
                            ? <Button color="secondary" onClick={() => startFullScreen(false)}><FullscreenExitIcon display="inline" fontSize="small" /></Button>
                            : <Button color="secondary" onClick={() => startFullScreen(true)}><FullscreenIcon display="inline" fontSize="small" /></Button>
                    }
                </Toolbar>
            </AppBar>
            <div ref={chartRef} className={isEditing ? classes.hide : classes.chart}></div>
            {
                isEditing &&
                <div className={classes.chart}> 
                    <GraphiQL
                        onEditQuery={chartData.onQueryChange()}
                        query={chartData.query}
                        fetcher={query => api.query(query)}
                    />
                </div>
            }
        </Paper>
    );
}

export default Chart;
