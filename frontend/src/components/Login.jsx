import React, { useState } from 'react';
import funcionariosData from '../mock/funcionarios.json';
import '../styles/login.css';

function Login({ onLogin }) {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const user = funcionariosData.find(
            (u) => u.usuario === usuario && u.senha === senha
        );

        if (user) {
            setError('');
            onLogin(user);
        } else {
            setError('Usuário ou senha inválidos');
        }
    };

    return (
        <div className="login-container">
            <div className="logo">
                AERO<span>CODE</span>
            </div>
            <div className="form-wrapper">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="usuario">Usuário</label>
                    <input
                        id="usuario"
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />

                    <label htmlFor="senha">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />

                    {error && <div className="error">{error}</div>}

                    <button type="submit">ENTRAR</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
