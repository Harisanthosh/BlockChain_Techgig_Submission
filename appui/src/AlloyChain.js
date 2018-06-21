import React, { Component } from 'react';
//import logo from './logo.svg';
import logo from './alphaalloy.jpg';
import adminlogo from './adminlogo.png';
import './App.css';
import { alphacontract } from "./Setup";
import { ShowMovies } from "./ShowMovies";
import { Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import Lender from './Lender'
import Borrower from './Borrower'
import Admin from './Admin'
import DryRun from './DryRun'

const PostsData = [
    {
        "category": "Borrow",
        "pathRoute": "/borrower",
        "title": "Borrow",
        "text": "State the amount needed, and submit a compelling proposal!",
        "image": "https://d1wt4re7u6-flywheel.netdna-ssl.com/wp-content/uploads/2015/06/money-lending-feature.jpg"
    },
    {
        "category": "Lend",
        "pathRoute": "/lender",
        "title": "Lend",
        "text": "Explore the MarketPlace and lend loans to intrested borrowers.",
        "image": "https://cdn-images-1.medium.com/max/1200/1*32w_PAiZXUs0pBFnfeH9iA.jpeg"
        // "image": "http://thewealthguy.com.au/wp-content/uploads/2016/02/Peer-to-Peer-Lending-1-649x649.png"
    }
]
export default class AlloyChain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [{ name: 'Star Wars', rating: 0 }, { name: 'Avatar', rating: 0 }, { name: 'Inception', rating: 0 }],
            posts: {}
        }
        this.handleVoting = this.handleVoting.bind(this)
    }
    componentWillMount() {
        this.setState({
            posts: PostsData
        });
    }

    handleVoting(movie) {
        alphacontract.voteForMovie(movie)
        let votes = alphacontract.totalVotesFor(movie).toNumber()
        this.setState({
            movies: this.state.movies.map(
                (el) => el.name === movie ? Object.assign({}, el, { rating: votes }) : el

            )
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo-static" alt="logo" />
                    <img src={adminlogo} className="Admin-static" alt="adminlogo" />
                    <h1 className="App-title">Welcome to AlloyChain</h1>
                </header>
                <p className="styleFont">
                    A peer-to-peer Micro lending platform !
        </p>
                <div className="backGround">
                    <div className="app-card-list" id="app-card-list">
                        {
                            Object
                                .keys(this.state.posts)
                                .map(key => <Card key={key} index={key} details={this.state.posts[key]} />)
                        }
                        {
                            (window.location.href.split("chain/")[1] === "0x53f48d576d500000ec367a5dfa9b34e9c51cbb5c")
                                ? <Button style={{ float: 'right' }}>
                                    <Link to="/admin">Admin Panel</Link>
                                </Button>
                                : null
                        }
                        {/* <Button style={{ float: 'right' }}>
                            <Link to="/admin">Admin Panel</Link>
                        </Button> */}
                    </div>
                </div>
                <Button style={{
                    color: "purple",
                    margin: "20px",
                    fontSize: "20px",
                    //backgroundColor: 'purple'      
                }}>
                    <Link to="/dryrun">Load Run</Link>
                </Button>

                {/* <div className="movie-table">
            <ShowMovies movies={this.state.movies} vote={this.handleVoting}/>
        </div> */}
            </div>
        );
    }
};

class ButtonCard extends React.Component {
    render() {
        var style = {
            color: "purple",
            margin: "20px",
            fontSize: "20px",
            //backgroundColor: 'purple'      
        };
        var pathVal = this.props.path;
        console.log(pathVal);
        const buttonDisp = pathVal === "/lender" ? (<Button style={style}>
            <Link to="/lender">Find out more</Link>
        </Button>) : (<Button style={style}>
            <Link to="/borrower">Find out more</Link>
        </Button>);
        return (
            <div>
                {/* <Button style={style}>
                <Link to="/lender">Find out more</Link>
            </Button> */}
                {buttonDisp}
                {/* <Route path={"lender"} component={Lender} /> */}
            </div>
        )
    }
}


class CardHeader extends React.Component {
    render() {
        const { image, category } = this.props;
        var style = {
            color: "#BA274A",
            backgroundImage: 'url(' + image + ')',
            padding: '250px 0',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
        };
        return (
            <header style={style}>
                {/* <h4 >{category}</h4> */}
                <div>
                    {/* <p>Powered by Smart Contracts</p> */}

                    <h2 >{this.props.title}</h2>


                </div>
            </header>
        )
    }
}


class CardBody extends React.Component {
    render() {
        return (
            <div>
                <p >{this.props.text}</p>
                <ButtonCard path={this.props.pathRoute} />
            </div>

        )
    }
}


class Card extends React.Component {
    render() {
        return (
            <article className="card">
                <CardHeader category={this.props.details.category} image={this.props.details.image} title={this.props.details.title} />
                <CardBody text={this.props.details.text} pathRoute={this.props.details.pathRoute} />
            </article>
        )
    }
}




