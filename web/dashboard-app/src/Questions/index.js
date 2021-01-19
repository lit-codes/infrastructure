import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
/* Local imports */

export const questionsList = [
    {
        title: 'How the teacher ratings have changed over time?',
        id: 'ratings-over-time',
    },
    {
        title: 'How the difficulty of the ratings correlate with the clarity?',
        id: 'difficulty-vs-clarity',
    },
];

const questionToModule = {
    'ratings-over-time': import('./RatingsOverTime'),
    'difficulty-vs-clarity': import('./DifficultyVsClarity'),
};

const useStyles = makeStyles((theme) => ({
}));

export default function Questions({ onQuestionChange, questionId }) {
    const [question, setQuestion] = useState(questionsList[0]);
    const classes = useStyles();

    function onChange(_, question) {
        setQuestion(question);
        onQuestionChange(_, question);
    }
    return (
        <Autocomplete
            id="questions-selector"
            options={questionsList}
            value={question}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} label="Questions" variant="outlined" />}
        />
    );
}

export async function loadCharts(api, question, teacher) {
    return questionToModule[question].then(question => (new question.default(api, teacher)).charts);
}
