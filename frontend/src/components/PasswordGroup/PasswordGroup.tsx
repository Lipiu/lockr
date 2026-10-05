import "./PasswordGroup.css";

function PasswordGroup(){
    return (
        <div className="password-container">
            <div className="toolbar">
                <button className="btn small">+ Add Entry</button>
                <button className="btn small">+ Add Group</button>
                <button className="btn small">- Remove Entry</button>
                <button className="btn small">- Remove Group</button>
            </div>

            <aside className="sidebar">
                <p>Root</p>
            </aside>
            
            <div className="entries">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>User</th>
                            <th>Password</th>
                            <th>URL</th>
                            <th>Notes</th>
                            <th>Modified</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default PasswordGroup;