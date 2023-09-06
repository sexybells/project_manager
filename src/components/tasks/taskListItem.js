import React from 'react'
import {Link} from "react-router-dom";
import {taskStatus} from '../../config/taskConfig'
const TaskListItem = (props) => {
  const {list} = props;
  return (
    <table className="table">
      <thead className="thead-light">
      <tr>
        <th>Tiêu đề</th>
        <th>Người phụ trách</th>
        <th>Người test</th>
        <th>Trạng thái</th>
      </tr>
      </thead>
      <tbody>
      {list.map((v) => (
        <tr>
          <td><Link to={`/detail-task/${v.id}`}>{v.name}</Link></td>
          <td>{v.dev.label}</td>
          <td>{v.test.label}</td>
          <td>
              {taskStatus[v.status]}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default TaskListItem;
