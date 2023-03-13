import styled from "styled-components"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";

export default function SeatsPage() {
    const { idSessao } = useParams()
    const [seatsSession, setSeatsSession] = useState([]);
    // const [backgroundColor, setBackgroundColor] = useState("");
    // const [borderColor, setBorderColor] = useState("");

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);
        request.then(response => {
            console.log(response.data);
            setSeatsSession(response.data);

        })

    }, [])
    console.log(seatsSession);
    // console.log(seatsSession.seats);

    function selectedSeat(i){
        console.log(`Deu certo! Estou selecionando a poltrona ${i+1}`)
        console.log(seatsSession.seats[i])
        
        // const backgroundColor="#1AAE9E";
        // const borderColor="#0E7D71";

        // const selectedSeatColorFill="#1AAE9E";
        // setBackgroundColor(selectedSeatColorFill);
        // const selectedSeatColorStroke="#0E7D71";
        // setBorderColor(selectedSeatColorStroke);
    }


    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>

                {seatsSession && seatsSession.seats && seatsSession.seats.map((seat ,i)=> (
                    <SeatItem key={seat.id} data-test="seat" 
                    backgroundColor={seat.isAvailable? "#C3CFD9" : "#FBE192"}
                    borderColor={seat.isAvailable? "#808F9D":"#F7C52B"}
                    >
                        <div onClick={() => selectedSeat(i)}>{seat.name} </div>
                    </SeatItem>

                )
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircleSelected />
                    Selecionado
                </CaptionItem>

                <CaptionItem>
                    <CaptionCircleAvailable />
                    Disponível
                </CaptionItem>

                <CaptionItem>
                    <CaptionCircleUnavailable />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." data-test="client-name" />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." data-test="client-cpf" />

                <Link to={`/sucesso`} ><button data-test="book-seat-btn">Reservar Assento(s)</button></Link>
            </FormContainer>


            {seatsSession && seatsSession.movie && (
                <FooterContainer data-test="footer">

                    <div>
                        <img src={seatsSession.movie.posterURL} alt={seatsSession.movie.title} />
                    </div>
                    <div>
                        <p>{seatsSession.movie.title}</p>
                        <p>{seatsSession.day.weekday} - {seatsSession.name}</p>
                    </div>
                </FooterContainer>
            )
            }


        </PageContainer>
    )
}

const PageContainer = styled.div`
                display: flex;
                flex-direction: column;
                align-items: center;
                font-family: 'Roboto';
                font-size: 24px;
                text-align: center;
                color: #293845;
                margin-top: 30px;
                padding-bottom: 120px;
                padding-top: 70px;
                `
const SeatsContainer = styled.div`

                // width: 330px;
                width: 32vw;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                margin-top: 20px;
            a {
                color: #000000;
                text - decoration: none;
                &:link, &:visited {
                    color: none;
                    text-decoration: none;
                    cursor: none;
                }
    
                &:link:active, &:visited:active {
                    color: none;
                }
    }
                `
const FormContainer = styled.div`
                width: calc(100vw - 40px);
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin: 20px 0;
                font-size: 18px;
                button {
                    align - self: center;
    }
                input {
                    width: calc(100vw - 60px);
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

const CaptionContainer = styled.div`
                display: flex;
                flex-direction: row;
                width: 300px;
                justify-content: space-between;
                margin: 20px;
                `
const CaptionCircleSelected = styled.div`
//Bolinha das legendas
                border: 1px solid #0E7D71;         // Essa cor deve mudar
                background-color: #1AAE9E;    // Essa cor deve mudar
                height: 25px;
                width: 25px;
                border-radius: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 5px 3px;
                `
const CaptionCircleAvailable = styled.div`
//Bolinha das legendas
                border: 1px solid #7B8B99;         // Essa cor deve mudar
                background-color: #C3CFD9;    // Essa cor deve mudar
                height: 25px;
                width: 25px;
                border-radius: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 5px 3px;
                `

const CaptionCircleUnavailable = styled.div`
//Bolinha das legendas
                border: 1px solid #F7C52B;         // Essa cor deve mudar
                background-color: #FBE192;    // Essa cor deve mudar
                height: 25px;
                width: 25px;
                border-radius: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 5px 3px;
                `
const CaptionItem = styled.div`
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 12px;
                `
const SeatItem = styled.div`
//bolinha dos assentos
                border: 1px solid; 
                border-color: ${props => props.borderColor};         // Essa cor deve mudar
                background-color: ${props => props.backgroundColor};    // Essa cor deve mudar
                height: 35px;
                width: 35px;
                border-radius: 25px;
                
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                color: #000000;
                font-size: 11px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 5px 3px;
                `
const FooterContainer = styled.div`
                width: 100%;
                height: 120px;
                background-color: #C3CFD9;
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 20px;
                position: fixed;
                bottom: 0;

                div:nth-child(1) {
                    box - shadow: 0px 2px 4px 2px #0000001A;
                border-radius: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: white;
                margin: 12px;
                img {
                    width: 50px;
                height: 70px;
                padding: 8px;
        }
    }

                div:nth-child(2) {
                    display: flex;
                flex-direction: column;
                align-items: flex-start;
                p {
                    text - align: left;
                &:nth-child(2) {
                    margin - top: 10px;
            }
        }
    }
                `