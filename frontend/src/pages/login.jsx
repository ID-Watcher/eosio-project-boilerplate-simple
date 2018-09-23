import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// set up styling classes using material-ui "withStyles"
const styles = theme => ({
  card: {
    margin: 20,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  formButton: {
    marginTop: theme.spacing.unit,
    // width: "100%",
  },
  pre: {
    background: "#ccc",
    padding: 10,
    marginBottom: 0.
  },
});

// Login component
class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      actoinTable: [] // to store the table rows from smart contract
    };
    this.handleFormEvent = this.handleFormEvent.bind(this);
  }

  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  async handleFormEvent(event) {
    // stop default behaviour
    event.preventDefault();

    // collect form data
    let email = event.target.email.value;
    let password = event.target.password.value;
    let privateKey = "";

    // prepare variables for the switch below to send transactions
    let actionName = "";
    let actionData = {};

    // define actionName and action according to event type
    switch (event.type) {
      case "submit":
        actionName = "login";
        actionData = {
          _email: encrypt(email),
          _address: encrypt(address),
        };
        // hash(email + password)
        let privateKey = "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5"
        this.setState({ privateKey: privateKey });
        this.setState({ showLogin: false });
        break;

      default:
        return;
    }

    // eosjs function call: connect to the blockchain
    const eos = Eos({keyProvider: privateKey});
    const result = await eos.transaction({
      actions: [{
        account: "blockaid",
        name: uploadinfo,
        authorization: [{
          actor: user,
          permission: 'active',
        }],
        data: JSON.stringify(actionData),
      }],
    });

    console.log(result);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.handleFormEvent}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            autoComplete="current-email"
            margin="normal"
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.formButton}
            type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }

}

export default withStyles(styles)(Login);
