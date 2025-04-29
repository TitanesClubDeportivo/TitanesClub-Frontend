import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Register() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const registerNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (user.username === '' || user.email === '' || user.password === '' || user.confirmPassword === '') {
            toast.error('Todos los campos son requeridos')
            setIsLoading(false);
            console.log('Todos los campos son requeridos')
            return;
        }
        if (user.password !== user.confirmPassword) {
            toast.error('Las contraseñas no coinciden')
            setIsLoading(false);
            console.log('Las contraseñas no coinciden')
            return;
        }
        if(user.password.length < 6){
            toast.error('La contraseña debe tener al menos 6 caracteres')
            setIsLoading(false);
            console.log('La contraseña debe tener al menos 6 caracteres')
            return;
        }
        try {
            const user2 = {
                usuario: user.username,
                email: user.email,
                contraseña: user.password,
            }   
            const response = await axios.post('/auth/register', user2)
            setIsLoading(false);
            toast.success(response.data.message)
        } catch (error: any) {
            setIsLoading(false);
            console.log(error)
            if(error.response && error.response.data.message){
                toast.error(error.response.data.message)
            }else{
                toast.error("ha ocurrido un error")
            }
        }
    }
    return (
        <div>
            <h1>Registro</h1>
            <form onSubmit={registerNewUser}>
                <input type="text" placeholder="Nombre de usuario" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value.trim() })} />
                <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value.trim() })} />
                <input type="password" placeholder="Contraseña" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <input type="password" placeholder="Confirmar contraseña" value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
                
                {
                    isLoading ?
                    <button type="submit" disabled>Registrando...</button>
                    :
                    <button type="submit">Registrar</button>
                }
            </form>
        </div>
    )
}
