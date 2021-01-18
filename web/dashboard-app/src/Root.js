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
import TeacherSelector from './TeacherSelector';
import API from './API';

const ResponsiveGridLayout = WidthProvider(Responsive);

const useStyles = makeStyles(theme => ({
    chartContainer: {
    },
}));
function Root() {
    const classes = useStyles();
    const [ charts, setCharts ] = useState([]);
    const [ layouts, setLayouts ] = useState({"lg":[{"w":2,"h":1,"x":0,"y":0,"i":"0","moved":false,"static":false},{"w":2,"h":1,"x":1,"y":0,"i":"1","moved":false,"static":false}]});
    const [ fullScreenLayouts, setFullScreenLayouts ] = useState(undefined);
    const [ question, setQuestion ] = useState();
    const [ teacher, setTeacher ] = useState();
    const [ api, setAPI ] = useState();

    useEffect(() => {
        setAPI(new API());
    }, []);

    const hash = document.location.hash.split('#')[1];

    const questionId = question ? question.id : hash.split('/')[0];
    const teacherId = teacher ? teacher.id : hash.split('/')[1];

    useEffect(() => {
        if (!(questionId && teacher)) return;
        (async () => {
            try {
                setCharts(await loadCharts(api, questionId, teacher));
            } catch(e) {
                console.error('Something went wrong when trying to fetch the question, %s', e);
            }
        })();
    }, [questionId, teacher]);

    function onQuestionChange(element, question) {
        document.location.hash = `${questionId}/${teacherId}`;
        setQuestion(question);
    }

    function onTeacherChange(_, teacher) {
        document.location.hash = `${questionId}/${teacherId}`;
        if (teacher) {
            setTeacher(teacher);
        }
    }

    function changeFullScreen(isFullScreen, key) {
        const layout = layouts.lg;
        if (isFullScreen) {
            setFullScreenLayouts({
                lg: [
                    ...layout.map((config, i) => {
                        if (key === i) return {
                            ...config,
                            x: 0,
                            y: 0,
                            w: 3,
                            h: 2,
                        };
                        if (config.y === 0) return {
                            ...config,
                            y: 1,
                        };
                        return config;
                    })
                ]
            });
        } else {
            setFullScreenLayouts(undefined);
        }
    }

    function onLayoutChange(_, layouts) {
        if (!fullScreenLayouts) setLayouts(layouts);
    }

    return (
        <React.Fragment>
            <Header>
                <TeacherSelector api={api} onChange={onTeacherChange} teacherId={teacherId} />
                <Questions onQuestionChange={onQuestionChange} questionId={questionId}/>
            </Header>
            <Container maxWidth={false}>
                <ResponsiveGridLayout
                    breakpoints={{lg: 1080, md: 768, sm: 600, xs: 400, xxs: 0}}
                    cols={{lg: 3, md: 3, sm: 2, xs: 1, xxs: 1}}
                    rowHeight={400}
                    layouts={fullScreenLayouts || layouts}
                    onLayoutChange={onLayoutChange}
                    isDraggable={!fullScreenLayouts}
                >
                    {
                        charts.map((chart, id) => <div className={classes.chartContainer} key={id}><Chart chartData={chart} changeFullScreen={(isFullScreen) => changeFullScreen(isFullScreen, id)} /></div>)
                    }
                </ResponsiveGridLayout>
            </Container>
        </React.Fragment>
    );
}

export default Root;
