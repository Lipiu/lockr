import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import hidePasswords from "../../assets/hidePasswords.png";
import showPasswords from "../../assets/showPasswords.png";
import "./PasswordGroup.css";

type Entry = {
    id: string;
    title: string;
    accountUsername: string;
    url: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    groupId: string | null;
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
    const [revealed, setRevealed] = useState<Record<string, string>>({});
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editGroupId, setEditGroupId] = useState<string | null>(null);
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
                setError("Could not delete group (probably not empty)");
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

    function resetForm(){
        setTitle("");
        setAccountUsername("");
        setPassword("");
        setUrl("");
        setNotes("");
        setEditingId(null);
        setEditGroupId(null);
        setShowForm(false);
    }

    function handleStartEdit(){
        const entry = entries.find(e => e.id === selectedId);
        if(!entry)
            return;
        setTitle(entry.title);
        setAccountUsername(entry.accountUsername);
        setPassword("");
        setUrl(entry.url ?? "");
        setNotes(entry.notes ?? "");
        setEditingId(entry.id);
        setEditGroupId(entry.groupId);
        setShowForm(true);
    }

    async function handleSubmit(e: SyntheticEvent<HTMLFormElement>){
        e.preventDefault();
        setError("");
        const isEdit = editingId !== null;
        try{
            const res = await fetch(isEdit ? `${API}/${editingId}` : API, {
                method: isEdit ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ 
                    title, 
                    accountUsername, 
                    password, 
                    url, 
                    notes, 
                    groupId: isEdit ? editGroupId : selectedGroupId,
                }),
            });
            if(res.ok){
                resetForm();
                setRevealed({});
                loadEntries();
            }
            else{
                if(isEdit){
                    setError("Could not update entry");
                }
                else {
                    setError("Could not save entry");
                }
            }
        }
        catch{
            setError("Could not reach the server");
        }
    }

    const isRevealed = selectedId !== null && revealed[selectedId] !== undefined;
    async function togglePasswordVisibility(id: string){
        if(revealed[id] !== undefined){
            setRevealed(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
            return;
        }
        try{
            const res = await fetch(`${API}/${id}/password`, {
                credentials: "include"
            });
            if(res.ok){
                const data = await res.json();
                setRevealed(prev => ({ ...prev, [id]: data.password }));
            }
            else{
                setError("Could not load password");
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
        setRevealed({});
    }, [selectedId]);

    useEffect(() => {
        loadEntries();
    }, [selectedGroupId]);

    function verifyIfBlank(content: string | null){
        if(content === null || content.trim() === ""){
            return "Empty (Default)";
        }
        return content;
    }

    function normalizeUrl(content: string): string {
        const trimmed = content.trim();
        return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
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
                        {depth > 0 && "● "}
                        {g.name}
                    </button>
                    {renderGroups(g.id, depth + 1)}
                </div>
            ));
    }

    return (
        <div className="password-container">
            <div className="toolbar">
                <button className="btn small" onClick={() => {
                    if(showForm)
                        resetForm;
                    else
                        setShowForm(true);
                }}>
                    Add Entry
                </button>
                <button className="btn small" onClick={handleStartEdit} disabled={selectedId === null}>Update Entry</button>
                <button className="btn small" onClick={handleEntryDelete} disabled={selectedId === null}>- Remove Entry</button>
                
                <button className="btn small" onClick={handleAddGroup}>+ Add Group</button>
                <button className="btn small">Update Group</button>
                <button className="btn small" onClick={handleDeleteGroup} disabled={selectedGroupId === null}>- Remove Group</button>
                <button
                    className="btn small icon-btn"
                    onClick={() => selectedId && togglePasswordVisibility(selectedId)}
                    disabled={selectedId === null}
                    title={isRevealed ? "Hide password" : "Show password"}    
                >
                    <img
                        className="eye-icon"
                        src={isRevealed ? hidePasswords : showPasswords}
                        alt={isRevealed ? "Hide password" : "Show password"}
                    />
                </button>
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
                        <input 
                            placeholder="Title" 
                            required value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                        <input 
                            placeholder="Username" required value={accountUsername}
                            onChange={(e) => setAccountUsername(e.target.value)} 
                        />
                        
                        <input 
                            type="password" 
                            autoComplete="new-password" 
                            placeholder={editingId ? "New password" : "Password"}
                            required={editingId === null}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        
                        <input 
                            placeholder="URL" value={url}
                            onChange={(e) => setUrl(e.target.value)} 
                        />
                        
                        <input 
                            placeholder="Notes" value={notes}
                            onChange={(e) => setNotes(e.target.value)} 
                        />
                        
                        <button 
                            className="btn small filled" 
                            type="submit">
                                {editingId ? "Update" : "Save"}
                            </button>
                        <button 
                            className="btn small filled" 
                            type="button" 
                            onClick={resetForm}>
                                Cancel
                        </button>
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
                                <td>{revealed[entry.id] ?? "••••••••"}</td>
                                <td className="td-url">
                                    {entry.url && entry.url.trim() !== "" ? (
                                        <a
                                            className="a-url"
                                            href={normalizeUrl(entry.url)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {entry.url}
                                        </a>
                                    ) : (
                                        "Empty (Default)"
                                    )}
                                </td>
                                <td>{
                                    verifyIfBlank(entry.notes)
                                }</td>
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