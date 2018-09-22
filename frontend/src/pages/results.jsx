import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { ExpandMore } from '@material-ui/icons';

// set up styling classes using material-ui "withStyles"
const styles = theme => ({
  card: {
    margin: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});


// SearchResults component
class SearchResults extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: null,
      searchResultsTable: [], // to store the table rows from smart contract
    };
    this.handleFormEvent = this.handleFormEvent.bind(this);
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  async handleFormEvent(event) {
    // stop default behaviour
    event.preventDefault();

    //...

  }

  // gets table data from the blockchain
  // and saves it into the component state: "searchResultsTable"
  getTable() {
    const eos = Eos();
    eos.getTableRows({
      "json": true,
      "code": "notechainacc",   // contract who owns the table
      "scope": "notechainacc",  // scope of the table
      "table": "notestruct",    // name of the table as specified by the contract abi
      "limit": 100,
    }).then(result => this.setState({ searchResultsTable: result.rows }));

    const result = [
      {
        "title": "Google",
        "link": "https://google.com/reiarosa",
        "timestamp": "1537646320",
        "details": "some details and text about this search result"
      },
      {
        "title": "Google",
        "link": "https://google.com/reiarosa",
        "timestamp": "1537646320",
        "details": "some details and text about this search result"
      },
    ];

    result => this.setState({ searchResultsTable: result.rows });

  }

  componentDidMount() {
    this.getTable();
  }

  render() {

    const { searchResultsTable } = this.state;
    const { classes } = this.props;
    const { expanded } = this.state;

    // generate each note as a card
    const generateSearchResultPanel = (key, timestamp, title, link, details) => (

      <ExpansionPanel className={classes.card} key={key} expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography className={classes.heading}>{title}</Typography>
          <Typography className={classes.secondaryHeading}>{link}</Typography>
          <Typography style={{fontSize:12}} color="textSecondary" gutterBottom>
            {new Date(timestamp*1000).toString()}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {details}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    );

    let searchResultsPanels = searchResultsTable.map((row, i) =>
      generateSearchResultPanel(i, row.timestamp, row.title, row.link, row.details));

    return (
        <div>
          {searchResultsPanels}
        </div>
    );
  }

}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchResults);
