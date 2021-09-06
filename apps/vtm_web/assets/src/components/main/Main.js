// @flow

import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MainLayout from './Main.Layout';
import { Copyright } from '@material-ui/icons';

export default function Main(): any {
    const fixedHeightPaper = classes => clsx(classes.paper, classes.fixedHeight);

    return (
        <MainLayout>
            { (classes: any) =>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper(classes)}>
                                <Typography>
                                        Text 1
                                </Typography>
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper(classes)}>
                                <Typography>
                                        Text 2
                                </Typography>
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography>
                                        Text 3
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            }
        </MainLayout>
    );
}
