import { Component } from 'react';
import { Switch, Route, withRouter } from "react-router";
import './App.css';
import Home from './components/Home';
import CandidateDetails from './components/CandidateDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: []
    }
  }

  componentDidMount() {
    this.fetchCandidates();
  }

  fetchCandidates() {
    fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json')
      .then(res => {
        if (res.ok && res.status === 200) {
          return res.json();
        } else {
          console.log(res);
        }
      })
      .then(candidates => {
        candidates = candidates.map(can => {
          can.status = null;
          return can;
        })
        this.setState({ candidates });
      })
      .catch(console.err);
  }

  setCandidateStatus = (id, status) => {
    let { candidates } = this.state;
    if (Array.isArray(candidates)) {
      let index = candidates.findIndex(can => can.id === id);
      console.log(index);
      let candidate = candidates[index];
      candidate.status = status;
      candidates[index] = candidate;
      this.setState({ candidates }, ()=>{
        this.props.history.push('/');
      });
    } else {
      console.log(candidates);
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={() => (<Home candidates={this.state.candidates} />)} />
        <Route exact path="/shortlisted" component={() => (<Home shortListed candidates={this.state.candidates} />)} />
        <Route exact path="/rejected" component={() => (<Home rejected candidates={this.state.candidates} />)} />
        <Route exact path="/candidate/:id" component={() => (<CandidateDetails candidates={this.state.candidates} setCandidateStatus={this.setCandidateStatus} />)} />
      </Switch>
    );
  }
}

export default withRouter(App);
