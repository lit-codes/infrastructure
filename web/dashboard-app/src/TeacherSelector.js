    import React from 'react';
    import TextField from '@material-ui/core/TextField';
    import Autocomplete from '@material-ui/lab/Autocomplete';
    import CircularProgress from '@material-ui/core/CircularProgress';
    import API from './API';
    
    function sleep(delay = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }
    
    export default function TeacherSelector({api, onChange, teacherId}) {
        const [open, setOpen] = React.useState(false);
        const [options, setOptions] = React.useState([{name: 'Penny Avery', id: 407}]);
        const [ value, setValue ] = React.useState({name: 'Penny Avery', id: 407});
        const [inputValue, setInputValue] = React.useState('');
        const loading = open && options.length === 0;
        
        React.useEffect(() => {
            if (teacherId && api) {
                api.query({query: `
                {
                    teacher(
                        where: {id: {_eq: ${teacherId}}}
                        ) {
                            id
                            first_name
                            last_name
                        }
                    }
                    `}).then(response => {
                        if (response.data) {
                            const options = response.data.teacher.map((t) => ({name: `${t.first_name} ${t.last_name}`, id: t.id}));
                            setOptions(options);
                            setValue(options[0]);
                            onValueChange(undefined, options[0]);    
                        }
                    });
            }
        }, [teacherId, api])

        function onValueChange(_, value) {
            setValue(value);
            onChange(_, value);
        }

        React.useEffect(() => {
            if (inputValue.length % 3) return;
            let [first_name, last_name] = inputValue.split(' ');
            if (!last_name) last_name = '';
            if (!first_name.length) return;
            api.query({query: `
            {
                teacher(
                    where: {_or: [{first_name: {_ilike: "${first_name}%"}}${
                        last_name ? `, {last_name: {_ilike: "${last_name}%"}}` : ''
                    }]},
                    limit: 10
                    ) {
                        id
                        first_name
                        last_name
                    }
                }
                `}).then(response => {
                    if (response.data) {
                        setOptions(response.data.teacher.map((t) => ({name: `${t.first_name} ${t.last_name}`, id: t.id})));    
                    }
                });
                
            }, [inputValue]);
            
            return (
                <Autocomplete
                id="teacher-selector"
                style={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                options={options}
                value={value}
                loading={loading}
                onChange={onValueChange}
                onInputChange={(_, val) => setInputValue(val)}
                renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Teacher"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                        />
                        );
                    }
                    