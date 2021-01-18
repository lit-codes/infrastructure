/* React */
import React, { useState, useRef, useEffect } from 'react';
/* Material UI Components */
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
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
    smallChart: {
        width: '100%',
        height: 'calc(25% - 48px)',
    },
    editor: {
        width: '100%',
        height: '70%',
    },
    chartSelector: {
        width: '100%',
        height: '5%',
    },
    topButton: {
        minWidth: '44px',
    },
}));

const api = new API();
function Chart({chartData, changeFullScreen}) {
    const classes = useStyles();
    const chartRef = useRef();
    const [chart, setChart] = useState();
    const [data, setData] = useState();
    const [config, setConfig] = useState({isEditing: false, isFullScreen: false});

    useEffect(() => {
        chartData.onDataChange((data) => {
            setData(data);
        });
    }, [chartData]);

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
            chart.clear();
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
        const extraArgs = isEditing ? { existingChart: { query: chartData.query, config: chartData.config } } : {};
        setConfig({
            ...config,
            isEditing,
            isFullScreen: isEditing,
            ...extraArgs,
        });
        changeFullScreen(isEditing);
    }
    function cancelEditing() {
        configChart(config.existingChart);
        setConfig({
            ...config,
            isEditing: false,
            isFullScreen: false,
        });
    }
    function setFullScreen(isFullScreen) {
        if (config.isEditing && !isFullScreen) {
            cancelEditing();
        } else {
            setConfig({
                ...config,
                isFullScreen,
            });
        }
        changeFullScreen(isFullScreen);
    }
    function configChart(options) {
        const existingOptions = {
            config: chartData.config,
            query: chartData.query,
        };
        try {
            chartData.update(options);
        } catch(e) {
            console.error('unable to set chart config', e);
            chartData.update(config.existingChart);
        }
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
                        config.isEditing
                            ? <Button className={classes.topButton} color="secondary" onClick={() => startEditing(false)}><SaveIcon display="inline" fontSize="small" /></Button>
                            : <Button className={classes.topButton} color="secondary" onClick={() => startEditing(true)}><EditIcon display="inline" fontSize="small" /></Button>
                    }
                    {
                        config.isFullScreen
                            ? <Button className={classes.topButton} color="secondary" onClick={() => setFullScreen(false)}><FullscreenExitIcon display="inline" fontSize="small" /></Button>
                            : <Button className={classes.topButton} color="secondary" onClick={() => setFullScreen(true)}><FullscreenIcon display="inline" fontSize="small" /></Button>
                    }
                </Toolbar>
            </AppBar>
            {
                config.isEditing &&
                    <Box className={classes.chartSelector} display="flex" justifyContent="start">
                        <ToggleButtonGroup
                            value={chartData.config.type}
                            exclusive
                            onChange={(_, type) => configChart({config: {type}})}
                        >
                            <ToggleButton value="line"> line </ToggleButton>
                            <ToggleButton value="bar"> bar </ToggleButton>
                            <ToggleButton value="scatter"> scatter </ToggleButton>
                            <ToggleButton value="pie"> pie </ToggleButton>
                        </ToggleButtonGroup>
                        {
                        ['line', 'bar', 'scatter'].includes(chartData.config.type) && <ToggleButtonGroup
                            value={[chartData.config.isStacked && 'stacked']}
                            onChange={(_, values) => configChart({config: { isStacked: values.includes('stacked')}})}
                        >
                            <ToggleButton value="stacked"> Stacked? </ToggleButton>
                        </ToggleButtonGroup>
                        }
                    </Box>
            }
            <div ref={chartRef} className={config.isEditing ? classes.smallChart : classes.chart}></div>
            {
                config.isEditing &&
                <div className={classes.editor}> 
                    <GraphiQL
                        onEditQuery={query => chartData.onQueryChange(query)}
                        onEditVariables={variables => chartData.onVariablesChange(variables)}
                        query={chartData.query.trim()}
                        variables={JSON.stringify(chartData.variables)}
                        fetcher={async query => {
                            const data = await api.query(query);
                            try {
                                if (!data.data.__schema) chartData.updateData(data);
                            } catch(e) {
                                console.error('unable to set chart result', e);
                            }
                            return data;
                        }}
                    />
                </div>
            }
        </Paper>
    );
}

export default Chart;
