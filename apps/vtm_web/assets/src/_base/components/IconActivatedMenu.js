// @flow

import React from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';

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
