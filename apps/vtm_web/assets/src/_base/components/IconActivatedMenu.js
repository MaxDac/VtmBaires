// @flow

import React from 'react';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//     },
//     paper: {
//       marginRight: theme.spacing(2),
//     },
//   }));

export type IconActivatedMenuProps = {
    badgeContent: any;
    icon: () => any;
    handleToggle: (bool, (bool => bool) => void) => Event => void;
    title?: ?string;
    children: (Event => void) => any;
}

export default function IconActivatedMenu(props: IconActivatedMenuProps): any {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    
    const handleClose = (event: Event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
  
        setOpen(false);
    };

    return (
        <>
            <IconButton color="inherit" onClick={props.handleToggle(open, setOpen)} ref={anchorRef} title={props.title}>
                <Badge badgeContent={props.badgeContent} color="secondary">
                    {props.icon()}
                </Badge>
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow">
                        {props.children(handleClose)}
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </>
    );
}
