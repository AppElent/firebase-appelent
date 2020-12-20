import React from 'react';
import { Typography } from '@material-ui/core';
import { InferProps } from 'prop-types';

const AppTitle: any = (props: InferProps<typeof AppTitle.propTypes>): JSX.Element => {
    return (
        <Typography variant="h3" style={{ color: 'white' }}>
            {props.title}
        </Typography>
    );
};

export default AppTitle;
