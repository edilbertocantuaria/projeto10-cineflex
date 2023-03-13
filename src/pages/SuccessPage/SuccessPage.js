import styled from "styled-components"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";

export default function SuccessPage() {
    const [purshasing, setPurshasing] = useState()

    useEffect(() => {
        const request = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many");
        request.then(response => {
            setPurshasing(response.data);
        })

    }, [])
    console.log(purshasing)

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>


            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>titulo do filme</p>
                <p>03/03/2023 - horario</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                <p>Assento 01</p>
                <p>Assento 02</p>
                <p>Assento 03</p>
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: Letícia Chijo</p>
                <p>CPF: 123.456.789-10</p>
            </TextContainer>

            <Link to={`/`} ><button data-test="book-seat-btn" >Voltar para Home</button></Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
    a {
        text - decoration: none;
        &:link, &:visited {
            color: none;
            text-decoration: none;
            cursor: none;
        }

        &:link:active, &:visited:active {
            color: none;
        }
`