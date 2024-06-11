import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import { Typography, Container, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../img/logo5.png';
import Select from '../Components/Select';
import Input from '../Components/input';
import Btn from '../Components/Btn';

const Edt_turma = () => {
    const [itens, setItens] = useState([]);

    const { id } = useParams();
    console.log('ID' + id)

    const navigate = useNavigate();

    const [sala, setSala] = useState({ });

    useEffect(() => {
        fetch(
            'http://localhost:5000/Siglas',
            {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
            setItens(data);
            console.log(data);
        }
        ).catch((error) => {
            console.log(`Não foi possível fazer o fetch do conteúdo: ${error}`);
        });
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:5000/Turmas/${id}`, {
            method: 'GET',
                headers: {
                'Content-Type' : 'application.json'
                },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setSala(data);
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    function handleItens(event) {
        // event.preventDefault();
        setSala({ ...sala, category: { id: event.target.name, category: event.target.options[event.target.selectedIndex].text } });
        
    }

    function handleClassroom(event) {
        setSala({ ...sala, [event.target.id]: event.target.value });
        console.log(sala)
    }

    function editSala(turma) {
        fetch(`http://localhost:5000/Turmas/${turma.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(turma)
        })
        .then((resp) => resp.json())
        .then(() => {
            navigate('/Lista', { state: 'Turma alterada com sucesso!' });
        })
        .catch((err) => console.log(err));
    }

    function submit(event) {
        event.preventDefault();
        editSala(sala);
    }

    return (
        <div style={{ backgroundColor: '#333', color: 'white', minHeight: '100vh' }}>
            <Menu />
            <Container sx={{ paddingTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <Grid container spacing={4} alignItems="center">

                    <Grid item xs={12} md={6}>
                        <img src={logo} alt="Descrição da imagem" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <form onSubmit={submit}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px', mb: 5 }}>Editar Turma</Typography>
                            <Typography>Digite um nome para a turma :</Typography>
                            <Input
                                type='text'
                                id="NomeTurma"
                                placeholder='Digite o nome da turma'
                                value={sala.NomeTurma}
                                onChange={handleClassroom}
                            />

                            <Typography sx={{ mt: 3 }}>Selecione a sigla da turma :</Typography>

                            <Select
                                id="turmas"
                                options={itens}
                                label="Siglas das turmas"
                                // value={sala.category.id}
                                onChange={handleItens}
                            />

                            <div style={{ textAlign: 'center' }}>
                                <Btn type="submit" >Editar Turma</Btn>
                            </div>

                                    
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Edt_turma;
