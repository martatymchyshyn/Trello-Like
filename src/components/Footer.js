import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import '../stylesCSS/Foot.css'

export default function Footer() {
    return (
        <AppBar align = "center" position="static" className='foo'>
            <Container maxWidth="md">
                <Toolbar>
                    <Typography align = "center"  variant="body1" >
                        © 2021 Trello-Like
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}