import React, {Component} from 'react';

class App extends Component{
    constructor(){
        super();
        this.state = {
            nombre: '',
            edad: '',
            telefono: '',
            empresa: '',
            mensaje: false,
            textoMsg: '',
            clientes: [],
            _id: '',
        }
        this.enviarCliente = this.enviarCliente.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.tiempoMensaje = null;
        this.cerrarMensaje = this.cerrarMensaje.bind(this);
    }

    componentDidMount(){
        this.obtenerClientes();
    }

    enviarCliente(e){
        e.preventDefault();
        if(this.state._id){
            fetch('/api/' + this.state._id,{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state)
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    mensaje: true, 
                    textoMsg: 'Cliente actualizado',
                    nombre:'', edad:'', 
                    telefono:'', 
                    empresa:'',
                    _id: '',
                });
                this.tiempoMensaje = setInterval(this.cerrarMensaje, 2000);
                console.log(data);
                this.obtenerClientes();
            })
        }else{
            fetch('/api',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state)
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    mensaje: true, 
                    textoMsg: 'Cliente Guardado',
                    nombre:'', edad:'', 
                    telefono:'', 
                    empresa:'',
                });
                this.tiempoMensaje = setInterval(this.cerrarMensaje, 2000);
                console.log(data);
                this.obtenerClientes();
            })
            .catch(err => console.log(err));
        }
    }
    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
    }
    cerrarMensaje(){
        clearInterval(this.tiempoMensaje);
        this.setState({mensaje:false, textoMsg: ''});
    }
    obtenerClientes(){
        fetch('/api')
        .then(res => res.json())
        .then(data => {
            this.setState({clientes:data.clientes});
        })
        .catch(err => console.log(err));
    }
    editarCliente(id){
        fetch('/api/' + id)
        .then(res => res.json())
        .then(data =>{
            this.setState({
                nombre: data.cliente.nombre,
                edad: data.cliente.edad,
                telefono: data.cliente.telefono,
                empresa: data.cliente.empresa,
                _id: data.cliente._id,
            });
        })
    }
    eliminarCliente(id){
        fetch('/api/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.obtenerClientes();
        })
    }
    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container">
                        <a href="/" className="navbar-brand">Proyecto Clientes</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-5">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Cliente</h5>
                                    <form onSubmit={this.enviarCliente}>
                                        <div className="row">
                                            <div className="form-group col-12">
                                                <input type="text" name="nombre" className="form-control" placeholder="Nombre" value={this.state.nombre} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-3">
                                                <input type="text" name="edad" className="form-control" placeholder="Edad" value={this.state.edad} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-12">
                                                <input type="text" name="telefono" className="form-control" placeholder="Teléfono" value={this.state.telefono} onChange={this.handleChange}  />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-12">
                                                <input type="text" name="empresa" className="form-control" placeholder="Empresa" value={this.state.empresa} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-6">
                                                <button type="submit" className="btn btn-primary">Enviar</button>
                                            </div>
                                            { this.state.mensaje? (
                                                <div className="col-6">
                                                    <div className="alert alert-danger" role="alert">
                                                        {this.state.textoMsg}
                                                    </div>
                                                </div>
                                            ):''
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-7">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Edad</th>
                                        <th>Teléfono</th>
                                        <th>Empresa</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.clientes.map(cliente => {
                                            return (
                                                <tr key={cliente._id}>
                                                    <td>{cliente.nombre}</td>
                                                    <td>{cliente.edad}</td>
                                                    <td>{cliente.telefono}</td>
                                                    <td>{cliente.empresa}</td>
                                                    <td className="row">
                                                        <button className="btn btn-primary" onClick={() => this.editarCliente(cliente._id)}>
                                                            <i className="small material-icons">edit</i>
                                                        </button>
                                                        <button className="btn btn-primary ml-3" onClick={() => this.eliminarCliente(cliente._id)}>
                                                        <i className="small material-icons">delete</i>
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
            </div>
        );
    }
}
export default App;