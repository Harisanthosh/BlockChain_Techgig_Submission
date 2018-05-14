//New

//Temporarily store data here
const PostsData = [
    {
      "category": "Borrow",
      "title": "Borrow",
      "text": "State the amount needed, and submit a compelling proposal!",
      "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
    },
    {
      "category": "Lend",
      "title": "Lend",
      "text": "Explore the MarketPlace and lend loans to intrested borrowers.",
      "image": "https://source.unsplash.com/user/erondu/600x400"
    }
  ]
  
  
  // Start App
  
  class Main extends React.Component {
    constructor() {
      super();
  
      this.state = {
        posts: {}
      }
    }
    componentWillMount() {
      this.setState({
        posts: PostsData
      });
    }
  
  
    render() {
      return <div>
        <header className="app-header"></header>
        <Title />
        <div className="app-card-list" id="app-card-list">
          {
            Object
              .keys(this.state.posts)
              .map(key => <Card key={key} index={key} details={this.state.posts[key]} />)
          }
        </div>
      </div>
    }
  }
  
  
  class Title extends React.Component {
    render() {
      return <section className="app-title">
        <div className="app-title-content">
          <h1>Latest News</h1>
          <p>Covering March & April 2015</p>
          <a className="designer-link" href="https://dribbble.com/shots/1978243-Latest-News" target="_blank">Design from <i className="fa fa-dribbble"></i></a>
        </div>
      </section>
    }
  }
  
  
  class Button extends React.Component {
    render() {
      return (
        <button className="button button-primary">
          <i className="fa fa-chevron-right"></i> Find out more
        </button>
      )
    }
  }
  
  
  class CardHeader extends React.Component {
    render() {
      const { image, category } = this.props;
      var style = {
        backgroundImage: 'url(' + image + ')',
      };
      return (
        <header style={style} className="card-header">
          <h4 className="card-header--title">{category}</h4>
        </header>
      )
    }
  }
  
  
  class CardBody extends React.Component {
    render() {
      return (
        <div className="card-body">
          <p className="date">March 20 2015</p>
  
          <h2>{this.props.title}</h2>
  
          <p className="body-content">{this.props.text}</p>
  
          <Button />
        </div>
      )
    }
  }
  
  
  class Card extends React.Component {
    render() {
      return (
        <article className="card">
          <CardHeader category={this.props.details.category} image={this.props.details.image} />
          <CardBody title={this.props.details.title} text={this.props.details.text} />
        </article>
      )
    }
  }
  
  
  ReactDOM.render(
    <Main />,
    document.getElementById('app')
  );

  //Web3.js ffor alpha alloy contract
  var amount = 2000;
var alphaalloycoinContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"minter","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"aadharId","type":"uint256"}],"name":"aadharAuthentication","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"aadharNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"send","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"}],"name":"getBalance","outputs":[{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Sent","type":"event"}]);
var alphaalloycoin = alphaalloycoinContract.new(
   amount,
   {
     from: web3.eth.accounts[0], 
     data: '0x608060405234801561001057600080fd5b5060405160208061066d83398101806040528101908080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550506105a6806100c76000396000f300608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063075461721461008857806327e235e3146100df57806340c10f19146101365780637049c3b91461018357806393e6c2b1146101c8578063d0679d34146101f3578063f8b2cb4f14610240575b600080fd5b34801561009457600080fd5b5061009d610297565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100eb57600080fd5b50610120600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506102bc565b6040518082815260200191505060405180910390f35b34801561014257600080fd5b50610181600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506102d4565b005b34801561018f57600080fd5b506101ae60048036038101908080359060200190929190505050610381565b604051808215151515815260200191505060405180910390f35b3480156101d457600080fd5b506101dd6103a1565b6040518082815260200191505060405180910390f35b3480156101ff57600080fd5b5061023e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506103a7565b005b34801561024c57600080fd5b50610281600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610531565b6040518082815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60036020528060005260406000206000915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561032f5761037d565b80600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b5050565b600060015482141515610397576001905061039c565b600090505b919050565b60015481565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156103f35761052d565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555080600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055507f3990db2d31862302a685e8086b5755072a6e2b5b780af1ee81ece35ee3cd3345338383604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a15b5050565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490509190505600a165627a7a7230582023605035300bc63f65ab1106cf7159cd1e9f1d122fe6c799736172e50e59407f0029', 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })