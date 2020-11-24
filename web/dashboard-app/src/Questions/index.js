import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
/* Local imports */

export const questionsList = [
    {
        title: 'What does the overall ratings of a teacher look like?',
        id: 'OverallRatings',
    },
    {
        title: 'Who are the most helpful teachers?',
        id: 'MostHelpfulTeachers',
    },
    {
        title: 'How the teacher ratings have changed over time?',
        id: 'RatingsOverTime',
    },
];

const questionToModule = {
    OverallRatings: import('./OverallRatings'),
    MostHelpfulTeachers: import('./MostHelpfulTeacher'),
    RatingsOverTime: import('./RatingsOverTime'),
};

const useStyles = makeStyles((theme) => ({
}));

export default function Questions({ onQuestionChange }) {
    const classes = useStyles();

    return (
        <Autocomplete
            id="combo-box-demo"
            options={questionsList}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            onChange={onQuestionChange}
            renderInput={(params) => <TextField {...params} label="Questions" variant="outlined" />}
        />
    );
}

export async function loadCharts(api, question) {
    return questionToModule[question].then(question => (new question.default(api)).charts);
}
