import styled from "styled-components"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function SuccessPage() {
    const location = useLocation();
    const bookingSession = location.state;
    console.log(bookingSession);

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            {bookingSession && (
                <TextContainer data-test="movie-info">
                    <strong><p>Filme e sessão</p></strong>
                    <p>{bookingSession.movie}</p>
                    <p>{bookingSession.date} - {bookingSession.time}</p>
                </TextContainer>
            )}

                <TextContainer data-test="seats-info">
                    <strong><p>Ingressos</p></strong>
                    {bookingSession && bookingSession.seats && bookingSession.seats.map((seat,i) => (
                        <p>Assento {bookingSession.seats[i].name}</p>

                    ))}
                </TextContainer>

            {bookingSession && (
                <TextContainer data-test="client-info">
                    <strong><p>Comprador</p></strong>
                    <p>Nome: {bookingSession.name}</p>
                    <p>CPF: {bookingSession.cpf}</p>
                </TextContainer>

            )}


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