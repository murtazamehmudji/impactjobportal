import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

class CandidateDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candidate: false
        };
    }

    componentDidMount(){
        this.getCandidateDetails();
    }
    
    getCandidateDetails = _=>{
        let { id } = this.props.match.params;
        console.log('id', id);
        let candidate = this.props.candidates.find(can => can.id === id);
        if (candidate) {
            this.setState({ candidate });
        }
    }

    render() {
        console.log('rendering CandidateDetails')
        return (
            <Container>
                {this.state.candidate
                    ?
                    <Row>
                        <Col className="my-2" lg={12} md={12}>
                            <Button variant="secondary" onClick={this.props.history.goBack}>Back</Button>
                        </Col>
                        <Col lg={12} md={12}>
                            <Image src={this.state.candidate.Image} fluid />
                        </Col>
                        <Col lg={12} md={12}>
                            <h1>{this.state.candidate.name} - {this.state.candidate.id}</h1>
                        </Col>
                        <Col lg={2} md={2}>
                            <Button variant="success" onClick={()=>this.props.setCandidateStatus(this.state.candidate.id, "shortlisted")}>Shortlist</Button>
                        </Col>
                        <Col lg={2} md={2}>
                            <Button variant="danger" onClick={()=>this.props.setCandidateStatus(this.state.candidate.id, "rejected")}>Reject</Button>
                        </Col>
                </Row>
            :<h1>Loading....</h1>
            }
            </Container>
        );
    }
}

CandidateDetails.propTypes = {
    candidates: PropTypes.array.isRequired,
    setCandidateStatus: PropTypes.func.isRequired
};

export default withRouter(CandidateDetails);
