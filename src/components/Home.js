import React, { Fragment, Component } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            candidates: []
        }
    }

    filterCandidates = (e) => {
        let search_str = this.state.search.toLowerCase();
        let { candidates } = this.props;
        let filtered_candidates = candidates.filter(can => (can.name.toLowerCase().includes(search_str)));
        this.setState({ candidates: filtered_candidates });
    }

    handleSearchInput = e => {
        let search = e.target.value;
        this.setState({ search }, this.filterCandidates);
    }

    showMessage = _ => {
        if (this.props.shortListed || this.props.rejected) {
            return (<Container>
                <h1>No candidates found.</h1>
            </Container>)
        } else if(this.state.search.length){
            return (<Container>
                <h1>Loading...</h1>
            </Container>)
        }

    }

    getCandidates = _ => {
        let { candidates } = this.state.search !== "" ? this.state : this.props;
        if (this.props.shortListed) {
            candidates = candidates.filter(can => can.status === "shortlisted");
        } else if (this.props.rejected) {
            candidates = candidates.filter(can => can.status === "rejected");
        }
        return candidates;
    }

    render() {
        let candidates = this.getCandidates();
        return (
            <Fragment>
                <Container>
                    <Row className="mt-3">
                        <Col lg={2} md={2} sm={2}>
                            <Button variant="secondary" onClick={this.props.history.goBack}>Back</Button>
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <Form>
                                <Form.Group controlId="search">
                                    <Form.Control type="text" placeholder="Search" onChange={this.handleSearchInput} />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col lg={2} md={2} sm={2}>
                            <Link to="/shortlisted">
                                <Button variant="success">Shortlisted</Button>
                            </Link>
                        </Col>
                        <Col lg={2} md={2} sm={2}>
                            <Link to="/rejected">
                                <Button variant="danger">Rejected</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        {Array.isArray(candidates) && candidates.length
                            ? candidates.map(candidate => (
                                <Col key={candidate.id} className="mb-3" lg={3} md={4} sm={6}>
                                    <Link to={`/candidate/${candidate.id}`}>
                                    <Card style={{ width: '100%' }}>
                                        <Card.Img variant="top" src={candidate.Image} />
                                        <Card.Body>
                                            <Card.Title>{candidate.name}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                    </Link>
                                </Col>
                            ))
                            : this.showMessage()
                        }
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default withRouter(Home)
