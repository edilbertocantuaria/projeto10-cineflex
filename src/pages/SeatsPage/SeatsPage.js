import styled from "styled-components"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import leftArrow from "../../assets/leftArrow.png"
import InputMask from "react-input-mask";

export default function SeatsPage() {
    const { idSessao } = useParams()
    const { idFilme } = useParams()

    const [seatsSession, setSeatsSession] = useState([]);
    const [selectedSeatIndex, setSelectedSeatIndex] = useState([])
    const [idSelectedSeats, setIdSelectedSeats] = useState([]);

    const [name, setName] = useState("");
    const [CPF, setCPF] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);
        request.then(response => {
            setSeatsSession(response.data);
        })

    }, [])
    // console.log(seatsSession);
    // console.log(seatsSession.seats);

    function selectedSeat(i) {
        if (!seatsSession.seats[i].isAvailable) {

            alert("Esse assento não está disponível");
        } else {
            if (selectedSeatIndex.includes(i)) {

                setIdSelectedSeats(
                    idSelectedSeats.filter(index => index !== i)
                );
                setSelectedSeatIndex(
                    selectedSeatIndex.filter(index => index !== i)
                );

            } else {
                setIdSelectedSeats([...idSelectedSeats, seatsSession.seats[i].id]);
                setSelectedSeatIndex([...selectedSeatIndex, i]);
            }

        }
    }

    function sendRequest(event) {
        event.preventDefault(); // impede o redirecionamento

        // console.log({
        //     ids: idSelectedSeats,
        //     name: name,
        //     cpf: CPF
        // })
        const request = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",
            {
                ids: idSelectedSeats,
                name: name,
                cpf: CPF
            })

        request.then(response => {
            console.log(response.data);
        })

        request.then(() => navigate("/sucesso", {
            state: {
                movie: seatsSession.movie.title,
                date: seatsSession.day.date,
                time: seatsSession.name,
                seats: idSelectedSeats.map(id => seatsSession.seats.find(seat => seat.id === id)),
                name: name,
                cpf: CPF
            }
        })

        )


        request.catch(error => {
            console.log(error);
        });
    }

    return (
        <PageContainer>
            <BackArrow data-test="go-home-header-btn">
                
                    <img
                        src={leftArrow}
                        alt="backHome" 
                        onClick={()=>navigate(-1)}
                        />

            </BackArrow>

            Selecione o(s) assento(s)

            <SeatsContainer>

                {seatsSession && seatsSession.seats && seatsSession.seats.map((seat, i) => {
                    const backgroundColor = selectedSeatIndex.includes(i) ? "#1AAE9E" : seat.isAvailable ? "#C3CFD9" : "#FBE192";
                    const borderColor = selectedSeatIndex.includes(i) ? "#0E7D71" : seat.isAvailable ? "#808F9D" : "#F7C52B";
                    return (
                        <SeatItem key={seat.id} data-test="seat"
                            backgroundColor={backgroundColor}
                            borderColor={borderColor}
                        >
                            <div onClick={() => selectedSeat(i)}>{seat.name} </div>
                        </SeatItem>
                    )
                })}

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
                <form onSubmit={sendRequest}>
                    Nome do Comprador:
                    <input type="text" value={name} required placeholder="Digite seu nome..." data-test="client-name" onChange={e => setName(e.target.value)} />

                    CPF do Comprador:
                    <StyledInputMode
                        type="text"
                        value={CPF}
                        required
                        placeholder="Digite seu CPF..."
                        mask="999.999.999-99"
                        data-test="client-cpf" onChange={e => setCPF(e.target.value)}
                    />


                    <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
                </form>
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
const StyledInputMode = styled(InputMask)``

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
const BackArrow = styled.div`
img{
    width: 30px;
    heigth: 30px;

    position: absolute;
    top: 20px;
    left: 10px;
}

`