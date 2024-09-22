import { Box, Button, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useParams} from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"
import http from "../../../http"

const FormularioRestaurante = () => {

    const paramentros = useParams()

    useEffect(() => {
        if (paramentros.id) {
            http.get<IRestaurante>(`restaurantes/${paramentros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [paramentros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if (paramentros.id) {
            http.put(`restaurantes/${paramentros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso!")
                })
        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso!")
                })
        }

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                <TextField
                    value={nomeRestaurante}
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                    label="Nome do Restaurante"
                    variant="standard"
                    fullWidth
                    required />
                <Button
                    sx={{ marginTop: 1 }}
                    type="submit"
                    variant="outlined"
                    fullWidth>Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioRestaurante