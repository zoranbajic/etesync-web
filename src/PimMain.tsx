import * as React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

import * as ICAL from 'ical.js';

import AddressBook from './AddressBook';
import Calendar from './Calendar';

import { routeResolver } from './App';

class Pim extends React.Component {
  props: {
    contacts: Array<ICAL.Component>,
    events: Array<ICAL.Component>,
    history?: any,
  };

  constructor(props: any) {
    super(props);
    this.eventClicked = this.eventClicked.bind(this);
    this.contactClicked = this.contactClicked.bind(this);
  }

  eventClicked(contact: any) {
    // FIXME
  }

  contactClicked(contact: ICAL.Component) {
    const uid = contact.getFirstPropertyValue('uid');

    this.props.history.push(
      routeResolver.getRoute('pim.contacts._id', { contactUid: uid }));
  }

  render() {

    return (
      <Tabs>
        <Tab label="Address Book">
          <AddressBook entries={this.props.contacts} onItemClick={this.contactClicked} />
        </Tab>
        <Tab label="Calendar">
          <Calendar entries={this.props.events} onItemClick={this.eventClicked} />
        </Tab>
      </Tabs>
    );
  }
}

export default Pim;
