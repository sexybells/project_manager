import React from 'react'
import {Link} from "react-router-dom";

const TaskListItem = (props) => {
  const {list} = props;
  return (
    <table className="table">
      <thead className="thead-light">
      <tr>
        <th>Tiêu đề</th>
        <th>Người phụ trách</th>
      </tr>
      </thead>
      <tbody>
      {list.map((v) => (
        <tr>
          <td><Link to={`/detail-task/${v.id}`}>{v.name}</Link></td>
          <td>{v.dev.label}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default TaskListItem;
