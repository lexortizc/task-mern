import React from 'React';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const HOME = __dirname;

class App extends React.Component {

    // Definiendo el constructor del Componente
    constructor() {
        // Heredando los atributos por defectos de JS
        super();
        // Definiendo el State
        this.state = {
            id: '',
            title: '',
            description: '',
            tasks: []
        };
        // Seteando los métodos de la clase
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Método que realizará el POST en la API
    addTask(evt) {
        // Previniento que se actualice la página
        evt.preventDefault();
        // Comprobando si es un Insert o un Update
        if(this.state.id){
            console.log('entré')
            // Construyendo y enviando la petición al API
            fetch(`/api/tasks/${this.state.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json()) // Convirtiendo la respuesta del servidor a formato JSON
            .then(data => {
                M.toast({ html: data.status }); // Usando el método Toast() de Materialize
                this.setState( {id: '', title: '', description: ''} ); // Limpiando el State
                this.fetchTasks(); // Actualizando la Task List
            })
        } else {
            // Construyendo y enviando la petición al API
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            // .then(res => console.log(res)) // Mostrando respuesta del servidor
            .then(res => res.json()) // Convirtiendo la respuesta del servidor a formato JSON
            .then(data => {
                M.toast({ html: data.status }); // Usando el método Toast() de Materialize
                this.setState( {title: '', description : ''} ); // Limpiando el State
                this.fetchTasks(); // Actualizando la Task List
            }) // Mostrando el msj personalizado de la API
            .catch(e => console.error(e)) // Mostrando el error
        }
    }

    componentDidMount(){
        this.fetchTasks();
    }
    
    fetchTasks(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            this.setState({ tasks: data });
            console.log(this.state.tasks);
        })   
    }

    deleteTask(id) {
        // Creando msj de confirmación antes de eliminar
        if(confirm('Are you sure you want to delete it?')){
            // Construyendo y enviando la petición al API
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json()) // Convirtiendo la respuesta del servidor a formato JSON
            .then(data => {
                M.toast({ html: data.status }); // Usando el método Toast() de Materialize
                this.fetchTasks(); // Actualizando la Task List
            })
            .catch(e => console.error(e)); // Mostrando el error
        }
    }

    updateTask(id) {
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                id: data.task._id,
                title: data.task.title,
                description: data.task.description
            })
    })
        .catch(e => console.error(e))
    }

    // Método que setea lo valores del State
    handleChange(evt) {
        // Obteniendo los datos del Form
        const { name, value } = evt.target;
        console.log(`${name}, ${value}`);

        // Actualizando el State
        this.setState({ [name]: value });
        //console.log(this.state)
    }

    render() {
        return (
            <React.Fragment>
                {/* > Navegación */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a href={HOME} className="brand-logo">MERN STACK</a>
                        {/* <Link to={`HOME`} className="brand-logo">MERN STACK</Link> */}
                    </div>
                </nav>
                
                {/* > Contenido del Principal (formulario) */}
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                        <div className="input-field col s12">
                                            <input name="title" onChange={this.handleChange} type="text" 
                                            placeholder="Task Title" value={this.state.title} autoFocus/>
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="input-field col s12">
                                            <textarea name="description" onChange={this.handleChange} cols="30" rows="10" 
                                            placeholder="Task Description" className="materialize-textarea" value={this.state.description}></textarea>
                                        </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" 
                                                        onClick={ () => this.updateTask(task._id) }>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" 
                                                        onClick={ () => this.deleteTask(task._id) } style={ {margin: '4px'} }>
                                                        <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="container">It is {new Date().toLocaleTimeString()}</div>
            </React.Fragment>
        );
    }
}

setInterval( () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
} , 1000);

// ReactDOM.render(<App/>, document.getElementById('app'));