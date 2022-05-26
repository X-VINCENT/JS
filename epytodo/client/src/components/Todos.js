import React from "react";
import useFetch from '../utils/useFetch';
import './Todos.css';

function Todos() {
    const options = {
        headers: {'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`}
    }
    const { todos = [], error, isLoading } =
      useFetch('/todos', options)

    if (isLoading) return "Loading...";
    if (error) return "Error!";

    return(
        <section>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-12 col-xl-12">

                        <div className="screen">
                            <div className="screen__content">
                                <div className="card-body p-4 text-white">

                                    <div className="text-center pt-3 pb-2">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                                            alt="Check" width="60">
                                        </img>
                                        <h2 className="my-4">Task List</h2>
                                    </div>

                                    <table className="table text-white mb-0">
                                        <thead>
                                        <tr>
                                            <th scope="col">Task</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Due Time</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            todos.map(todo => (
                                                <tr className="align-left">
                                                    <th>
                                                        <span>
                                                            <p>{ todo.title }</p>
                                                        </span>
                                                    </th>
                                                    <td className="align-middle">
                                                        <span>
                                                            <p>{ todo.description }</p>
                                                        </span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <span>
                                                            <p>{ todo.status }</p>
                                                        </span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <span>
                                                            <p>{ todo.due_time }</p>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Todos;