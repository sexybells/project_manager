import React from 'react'
import {Link} from "react-router-dom";
import {taskStatus} from '../../config/taskConfig';
const bgr = {
  1: 'btn btn-success',
  2: 'btn btn-secondary',
  3: 'btn btn-primary',
  4: 'btn btn-dark',
  5: 'btn btn-light',
  6: 'btn btn-danger',
  7: 'btn btn-info'
}
const TaskListItem = (props) => {
  const {list} = props;

  const renderStatus = () => {

  }

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
      {list.map((v, k) => (
        <tr key={k}>
          <td><Link to={`/detail-task/${v.id}`}>{v.name}</Link></td>
          <td>{v.dev.label}</td>
          <td>{v.test.label}</td>
          <td>
            <p className={bgr[v.status]}>{taskStatus[v.status]}</p>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default TaskListItem;
