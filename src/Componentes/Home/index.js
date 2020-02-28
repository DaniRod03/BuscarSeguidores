import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import {Navbar, Input, Button, InputGroup, InputGroupAddon, Container, Col, Form, Row, Spinner} from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
import {MdSearch, MdStar} from 'react-icons/md';

export default class Home extends Component{
    state = {
        carregando: false,
        stars: []
    }
    // state = {
    //     seguidores: []
    // } estado da api de seguidores
    meteoroDaPaixao = async (evento) => {
        evento.preventDefault()
        this.setState({carregando: true})
        const form = evento.target;
        const InputGroup = form.children[0];
        const Input = InputGroup.children[0];

        const stars = await axios (`https://api.nasa.gov/planetary/apod?date=${Input.value.split('/').reverse().join('-')}&api_key=eNs5iJKPA9Y6sQbWlq8zdVCyAr4d2x7ecQNTITd3`)
        this.setState({stars: [stars.data, ...this.state.stars], carregando: false})
        
        
    }
    // consumo de api de seguidores do github
    // stalkear = async (evento) => {
    //     evento.preventDefault()
      
    //     const form = evento.target;
    //     const InputGroup = form.children[0];
    //     const Input = InputGroup.children[0];
        
    //     //Desistruturação const {seguidores: data} = await axios(`https://api.github.com/users/${Input.value}/followers`);
    //     //const seguidores = await axios(`https://api.github.com/users/${Input.value}/followers`);
    //     const seguidores = await axios (`https://api.nasa.gov/planetary/apod?date=${Input.value}&api_key=eNs5iJKPA9Y6sQbWlq8zdVCyAr4d2x7ecQNTITd3`)

    //     //const seguidores = await axios(`https://api.bitbucket.org/2.0/users/${Input.value}`);
    //     //Desistruturação this.setState({seguidores})
    //     this.setState({seguidores: seguidores.data})
        
    //     console.log(seguidores.data);
        
    // }
    render(){
        return (
            <>
                <Navbar color="dark" className="text-light">
                <Container className="d-flex justify-content-center">
                                <img className="rounded-circle border border-white mr-3" width="50px" src="https://www.thispersondoesnotexist.com/image" 
                                alt="this persons does not exist"/>
                                <span className="text-white">
                                    Logado como 
                                    <Link className="text-white font-weight-bold ml-2" to="/">
                                    { this.props.match.params.user }
                                    </Link>
                                </span>
                </Container>
                </Navbar>

                <Navbar color="dark" fixed="bottom">
                    <Container className="d-flex justify-content-center">
                            <Col xs="12" md="6">
                                <Form onSubmit = {this.meteoroDaPaixao}>
                                    <InputGroup>
                                    <Input type="date" />
                                        <InputGroupAddon addonType="append">
                                            <Button color="danger">
                                            {this.state.carregando ? (<Spinner color="success" size="sm" />) : (<MdSearch size="20px" />)}
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Form>
                            </Col>
                    </Container>
                </Navbar>   
            {this.state.carregando ? (
            <Container className="h-100% d-flex flex-column justify-content-center align-items-center">
                <Spinner color="warning" size="lg" />
                <span> Carregando...</span>
            </Container>
            ) : (
                <Container className="mt-3 mb-5">
                <Row>
            {this.state.stars.map((stars) => (
            <Col className="d-flex" xs="12" md="4">
             <Card className="text-white mb-2" color="dark">
                <CardImg top width="100%" height="30%" src={stars.url} alt={stars.title} />
                    <CardBody>
                         <CardTitle className="h4 text-center" >{stars.title}</CardTitle>
                         <CardSubtitle className="text-muted text-center" >{stars.date.split('-').reverse().join('/')}</CardSubtitle>
                         <CardText className="text-justify" >{stars.explanation}</CardText>
                </CardBody>
             </Card>
           </Col>
        ))}
            </Row>
        </Container>
            )}
            {/* {this.state.carregando && (
            <Container className="h-100% d-flex flex-column justify-content-center align-items-center">
                <Spinner color="warning" size="lg" />
                <span> Carregando...</span>
            </Container>
            )} */}
            {this.state.stars.length === 0 && (
            <Container className="h-100% d-flex flex-column justify-content-center align-items-center">
               <MdStar color="purple" size="150"/>
                <h3>Escolha uma data </h3>
            </Container>
            )}
            </>
        )
    }
}    