import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import "./PasswordGroup.css";

type Entry = {
    id: string;
    title: string;
    accountUsername: string;
    url: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
};

const API = "http://localhost:8080/api/password-entry";

function PasswordGroup(){
    const [entries, setEntries] = useState<Entry[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [accountUsername, setAccountUsername] = useState("");
    const [password, setPassword] = useState("");
    const [url, setUrl] = useState("");
    const [notes, setNotes] = useState("");
    const [error, setError] = useState("");

    async function loadEntries(){
        try{
            const res = await fetch(API, { credentials: "include" });
            if(res.ok){
                setEntries(await res.json());
            }
        }
        catch{
            setError("Could not reach the server");
        }
    }

    useEffect(() => {
        loadEntries();
    }, []);

    async function handleSubmit(e: SyntheticEvent<HTMLFormElement>){
        e.preventDefault();
        setError("");
        try{
            const res = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ title, accountUsername, password, url, notes }),
            });
            if(res.ok){
                setTitle("");
                setAccountUsername("");
                setPassword("");
                setUrl("");
                setNotes("");
                setShowForm(false);
                loadEntries();
            }
            else{
                setError("Could not save entry");
            }
        }
        catch{
            setError("Could not reach the server");
        }
    }

    async function handleDelete(){
        if(selectedId === null)
            return;
        try {
            const res = await fetch(`${API}/${selectedId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if(res.ok){
                setSelectedId(null);
                loadEntries();
            }
            else{
                setError("Could not delete entry");
            }
        }
        catch {
            setError("Could not reach server");
        }
    }

    function verifyIfBlank(content: string | null){
        if(content === null || content.trim() === ""){
            return "Empty (Default)";
        }
        return content;
    }

    return (
        <div className="password-container">
            <div className="toolbar">
                <button className="btn small" onClick={() => setShowForm(!showForm)}>+ Add Entry</button>
                <button className="btn small">Update Entry</button>
                <button className="btn small" onClick={handleDelete} disabled={selectedId === null}>- Remove Entry</button>
                
                <button className="btn small">+ Add Group</button>
                <button className="btn small">Update Group</button>
                <button className="btn small">- Remove Group</button>
            </div>

            <aside className="sidebar">
                <p>Root</p>
            </aside>

            <div className="entries">
                {showForm && (
                    <form className="entry-form" onSubmit={handleSubmit}>
                        <input placeholder="Title" required value={title}
                               onChange={(e) => setTitle(e.target.value)} />
                        <input placeholder="Username" required value={accountUsername}
                               onChange={(e) => setAccountUsername(e.target.value)} />
                        <input type="password" autoComplete="new-password" placeholder="Password" required value={password}
                               onChange={(e) => setPassword(e.target.value)} />
                        <input placeholder="URL" value={url}
                               onChange={(e) => setUrl(e.target.value)} />
                        <input placeholder="Notes" value={notes}
                               onChange={(e) => setNotes(e.target.value)} />
                        <button className="btn small filled" type="submit">Save</button>
                        {error && <span className="entry-error">{error}</span>}
                    </form>
                )}

                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>User</th>
                            <th>Password</th>
                            <th>URL</th>
                            <th>Notes</th>
                            <th>Created</th>
                            <th>Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map(entry => (
                            <tr 
                                key={entry.id}
                                className={selectedId === entry.id ? "selected" : ""}
                                onClick={() => setSelectedId(entry.id)}
                            >
                                <td>{entry.title}</td>
                                <td>{entry.accountUsername}</td>
                                <td>••••••••</td>
                                <td>{verifyIfBlank(entry.url)}</td>
                                <td>{verifyIfBlank(entry.notes)}</td>
                                <td>{new Date(entry.createdAt).toLocaleString()}</td>
                                <td>{new Date(entry.updatedAt).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PasswordGroup;