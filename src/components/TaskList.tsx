import * as React from 'react';

import { pure } from 'recompose';
import { createSelector } from 'reselect';

import { List, ListItem } from '../widgets/List';

import { TaskType } from '../pim-types';

const TaskListItem = pure((_props: any) => {
  const {
    entry,
    onClick,
  } = _props;
  const title = entry.title;

  return (
    <ListItem
      primaryText={title}
      onClick={() => onClick(entry)}
    />
  );
});

const sortSelector = createSelector(
  (entries: Array<TaskType>) => entries,
  (entries) => {
    return entries.sort((_a, _b) => {
      const a = _a.title;
      const b = _b.title;

      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
  },
);

class TaskList extends React.PureComponent {
  props: {
    entries: Array<TaskType>,
    onItemClick: (contact: TaskType) => void,
  };

  render() {
    const entries = this.props.entries.filter((x) => !x.finished);
    const sortedEntries = sortSelector(entries);

    let itemList = sortedEntries.map((entry, idx, array) => {
      const uid = entry.uid;

      return (
        <TaskListItem
          key={uid}
          entry={entry}
          onClick={this.props.onItemClick}
        />
      );
    });

    return (
      <List>
        {itemList}
      </List>
    );
  }
}

export default TaskList;
