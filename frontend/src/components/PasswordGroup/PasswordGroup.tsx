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

type Group = {
    id: string;
    name: string;
    parentId: string | null;
};

const API = "http://localhost:8080/api/password-entry";
const GROUPS_API = "http://localhost:8080/api/groups";

function PasswordGroup(){
    const [entries, setEntries] = useState<Entry[]>([]);
    const [groups, setGroups] = useState<Group[]>([])
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [accountUsername, setAccountUsername] = useState("");
    const [password, setPassword] = useState("");
    const [url, setUrl] = useState("");
    const [notes, setNotes] = useState("");
    const [error, setError] = useState("");


    //groups
    async function loadGroups(){
        try {
            const res = await fetch(GROUPS_API, { credentials: "include" });
            if(res.ok)
                setGroups(await res.json());
        }
        catch {
            setError("Could not reach the server");
        }
    }

    async function handleAddGroup(){
        const name = window.prompt("Group name");
        if(name === null || name.trim() === ""){
            return;
        }
        try{
            const res = await fetch(GROUPS_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    name, parentId: selectedGroupId
                }),
            });
            if(res.ok){
                loadGroups();
            }
            else{
                setError("Could not create group");
            }
        }
        catch{
            setError("Could not reach the server");
        }
    }

    async function handleDeleteGroup(){
        if(selectedGroupId === null){
            return;
        }
        try {
            const res = await fetch(`${GROUPS_API}/${selectedGroupId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if(res.ok){
                setSelectedGroupId(null);
                loadGroups();
            }
            else if(res.status === 409){
                setError("Group is not empty");
            }
            else {
                setError("Could not delete group");
            }
        }
        catch {
            setError("Could not reach the server");
        }
    }

    //entries
    async function loadEntries(){
        try{
            const url = selectedGroupId === null ? API : `${API}?groupId=${selectedGroupId}`;
            const res = await fetch(url, { credentials: "include" });
            if(res.ok){
                setEntries(await res.json());
            }
        }
        catch{
            setError("Could not reach the server");
        }
    }

    async function handleEntryDelete(){
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

    async function handleSubmit(e: SyntheticEvent<HTMLFormElement>){
        e.preventDefault();
        setError("");
        try{
            const res = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ title, accountUsername, password, url, notes, groupId: selectedGroupId }),
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

    useEffect(() => {
        loadGroups();
    }, []);

    useEffect(() => {
        loadEntries();
    }, [selectedGroupId]);

    function verifyIfBlank(content: string | null){
        if(content === null || content.trim() === ""){
            return "Empty (Default)";
        }
        return content;
    }

    function renderGroups(parentId: string | null, depth: number){
        return groups
            .filter(g => g.parentId === parentId)
            .map(g => (
                <div key={g.id}>
                    <button
                        className={"group-item" + (selectedGroupId === g.id ? " active" : "")}
                        style={{paddingLeft: 12 + depth * 16}}
                        onClick={() => setSelectedGroupId(g.id)}
                    >
                        {g.name}
                    </button>
                    {renderGroups(g.id, depth + 1)}
                </div>
            ));
    }

    return (
        <div className="password-container">
            <div className="toolbar">
                <button className="btn small" onClick={() => setShowForm(!showForm)}>+ Add Entry</button>
                <button className="btn small">Update Entry</button>
                <button className="btn small" onClick={handleEntryDelete} disabled={selectedId === null}>- Remove Entry</button>
                
                <button className="btn small" onClick={handleAddGroup}>+ Add Group</button>
                <button className="btn small">Update Group</button>
                <button className="btn small" onClick={handleDeleteGroup} disabled={selectedGroupId === null}>- Remove Group</button>

                {error && <span className="entry-error">{error}</span>}
            </div>

            <aside className="sidebar">
                <button
                    className={"group-item" + (selectedGroupId === null ? " active" : "")}
                    onClick={() => setSelectedGroupId(null)}
                >
                    All entries
                </button>
                {renderGroups(null, 0)}
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