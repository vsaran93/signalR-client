import React from "react";
import Header from "../header";
import Container from '@mui/material/Container';

const MainLayout = (props) => {
    return (
        <>
            <Header />
            <div>
                <Container>
                    {props.children}
                </Container>
            </div>
        </>
    )
}

export default MainLayout;