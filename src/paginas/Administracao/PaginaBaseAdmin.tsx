import { AppBar, Box, Button, Container, Link, Paper, Toolbar, Typography } from "@mui/material"
import { Outlet, Link as RouterLink } from "react-router-dom"

const PaginaBaseAdmin = () => {
    return (
        <>

            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6" sx={{ marginRight:2, color: 'yellow'}}>
                            Administração
                        </Typography>
                        <Box>
                            <Link component={RouterLink} to={"/admin/restaurantes"}>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Restaurante
                                </Button>
                            </Link>
                            <Link component={RouterLink} to={"/admin/restaurantes/novo"}>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Pratos
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Prato
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="http://localhost:3000/">
                                <Button sx={{ marginLeft: 60, my: 2,  color: 'white' }}>
                                    voltar para Home
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth='lg' sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                       <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default PaginaBaseAdmin