import "./Vault.css";

import PasswordGenerator from "../PasswordGenerator/PasswordGenerator";
import PasswordGroup from "../PasswordGroup/PasswordGroup";

function Vault(){
    return (
        <div className="vault-layout">
            <div className="vault-main">
                <PasswordGroup/>
            </div>
            <aside className="vault-side">
                <PasswordGenerator/>
            </aside>
        </div>
    )
}

export default Vault;