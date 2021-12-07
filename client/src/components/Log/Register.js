import axios from 'axios';
import React, {useState} from 'react'

export default function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [formSubmit, setFormSubmit] = useState(false);

    const registerHandle = (e) => {
            e.preventDefault();

            const usernameError = document.querySelector('.username.error')
            const emailError = document.querySelector('.email.error');
            const passwordError = document.querySelector('.password.error');
            const passwordConfirmError = document.querySelector('.passwordConfirm.error');

            usernameError.innerHTML = "";
            emailError.innerHTML = ""
            passwordError.innerHTML = ""
            passwordConfirmError.innerHTML = ""

            if (!username || !email || !password || !passwordConfirm){
                if (!username) {
                    usernameError.innerHTML = "Ce champs est vide !";
                }
                if (!email) {
                    emailError.innerHTML = "Ce champs est vide !"  
                }
                if (!password) {
                    passwordError.innerHTML = "Ce champs est vide !"
                } 
                if (!passwordConfirm) {
                    passwordConfirmError.innerHTML = "Ce champs est vide !"  
                }
                return;
            }

            if (password !== passwordConfirm) {
                passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas !";
                return
            }

            axios({
                method:"post",
                url:`${process.env.REACT_APP_API_URL}/api/user/register`,
                data:{
                    username,
                    email,
                    password
                }
            }).then((res) => {
                if(res.data.errors){
                    usernameError.innerHTML = res.data.errors.username
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password
                } else {
                    setFormSubmit(true)
                }
            })
            
    }

    return (
        <>
        {formSubmit && (
            <h4 className="succes">Engistrement terminer, vous pouvez vous connecter !</h4>
        )}

            <div>
                <form action="" method="post" onSubmit={registerHandle}>

                    <div className="field">
                        <label htmlFor="username" className="label">Username</label>
                        <div className="control">
                            <input type="text" name="username" id="username" className="input" autoComplete="off" onChange={(event) => setUsername(event.target.value)} value={username}/>
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="email" className="label">Email</label>
                        <div className="control">
                            <input type="email" name="email" id="email" className="input" autoComplete="off" onChange={(event) => setEmail(event.target.value)} value={email} />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="password" className="label">Mot de passe</label>
                        <div className="control">
                            <input type="password" name="password" id="password" className="input" autoComplete="off" onChange={(event) => setPassword(event.target.value)} value={password} />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="password" className="label">Confirmer Mot de Passe</label>
                        <div className="control">
                            <input type="password" name="password" id="password" className="input" autoComplete="off" onChange={(event) => setPasswordConfirm(event.target.value)} value={passwordConfirm} />
                        </div>
                    </div>

                    <div class="field">
                    <p class="control">
                        <input type="submit" value="S'enregister" className='button is-info' />
                    </p>
                </div>

                </form>
            </div>


        {/* <div className="form-content">
                <form action="" method="post" onSubmit={registerHandle}>
                    
                    <div className="field">
                        <label htmlFor="username">Nom d'utilisateur</label> <br />
                        <input type="text" name="username" id="username" autoComplete="off" onChange={(event) => setUsername(event.target.value)} value={username}/> <br />
                        <p className="username error"></p>
                    </div>
                    <div className="field">
                        <label htmlFor="username">Email</label> <br />
                        <input type="email" name="email" id="email" autoComplete="off" onChange={(event) => setEmail(event.target.value)} value={email}/> <br />
                        <p className="email error"></p>
                    </div>
                    <div className="field">
                        <label htmlFor="password">Mot de Passe</label> <br />
                        <input type="password" name="password" id="password" autoComplete="off" onChange={(event) => setPassword(event.target.value)} value={password}/><br />
                        <p className="password error"></p>
                    </div>
                    <div className="field">
                        <label htmlFor="password">Confirmer Mot de Passe</label> <br />
                        <input type="password" name="password" id="password" autoComplete="off" onChange={(event) => setPasswordConfirm(event.target.value)} value={passwordConfirm}/><br />
                        <p className="passwordConfirm error"></p>
                    </div>
                    <br />
                    <input type="submit" value="S'inscrire" className="button" />
                </form>

        </div> */}

    </>
    )
}
