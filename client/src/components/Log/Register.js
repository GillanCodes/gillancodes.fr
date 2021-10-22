import React from 'react'

export default function Register() {
    return (
        <div className="form-content">

                <form action="" method="post">
                    <div className="field">
                        <label htmlFor="username">Nom d'utilisateur</label> <br />
                        <input type="text" name="username" id="username" autoComplete="off" /> <br />
                    </div>
                    <div className="field">
                        <label htmlFor="username">Email</label> <br />
                        <input type="email" name="email" id="email" autoComplete="off" /> <br />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Mot de Passe</label> <br />
                        <input type="password" name="password" id="password" autoComplete="off" /><br />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Confirmer Mot de Passe</label> <br />
                        <input type="password" name="password" id="password" autoComplete="off" /><br />
                    </div>
                    <br />
                    <input type="submit" value="S'inscrire" className="button" />
                </form>

        </div>
    )
}
