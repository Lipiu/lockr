import { useState } from "react";

const SETS = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    digits: "0123456789",
    symbols: "!@#$%^&*-_=+?",
} as const;

type SetName = keyof typeof SETS;
const NAMES = Object.keys(SETS) as SetName[];

function randomInt(max: number): number {
    const limit = Math.floor(0x100000000 / max) * max;
    const buf = new Uint32Array(1);
    do crypto.getRandomValues(buf);
    while (buf[0] >= limit);
    return buf[0] % max;
}

function generate(length: number, pools: string[]): string {
    const all = pools.join("");
    const chars = pools.map(p => p[randomInt(p.length)]);
    while (chars.length < length) chars.push(all[randomInt(all.length)]);
    for (let i = chars.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join("");
}

function strengthOfPassword(pw: string) {
    let pool = 0;
    if (/[a-z]/.test(pw)) pool += 26;
    if (/[A-Z]/.test(pw)) pool += 26;
    if (/[0-9]/.test(pw)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pw)) pool += SETS.symbols.length;
    const bits = pw.length * Math.log2(pool);
    if (bits < 40) return { label: "Weak", level: "weak", percent: 25 };
    if (bits < 60) return { label: "Fair", level: "fair", percent: 50 };
    if (bits < 80) return { label: "Good", level: "good", percent: 75 };
    return { label: "Strong", level: "strong", percent: 100 };
}

function PasswordGenerator(){
    const [length, setLength] = useState(20);
    const [enabled, setEnabled] = useState<Record<SetName, boolean>>({
        lowercase: true, uppercase: true, digits: true, symbols: true,
    });
    const [result, setResult] = useState("");
    const [recent, setRecent] = useState<string[]>([]);

    const active = NAMES.filter(n => enabled[n]);
    const strength = result && strengthOfPassword(result);

    function handleGenerate() {
        const size = Math.min(Math.max(length || 8, 8), 64);
        const pw = generate(size, active.map(n => SETS[n]));
        setResult(pw);
        setRecent([pw, ...recent].slice(0, 5));
    }

    return (
        <div className="generator">
            <h3>Password Generator</h3>
            <input className="generator-output" readOnly value={result} placeholder="Click Generate"/>

            {strength && (
                <div className="strength">
                    <div className="strength-track">
                        <div className={`strength-bar ${strength.level}`} style={{width: `${strength.percent}%`}}/>
                    </div>
                    <span className="strength-label">
                        {strength.label}
                    </span>
                </div>
            )}

            <div className="generator-actions">
                <button
                    className="btn small filled"
                    onClick={handleGenerate}
                >
                    Generate
                </button>
            </div>

            <div className="generator-length">
                <label>Length</label>
                <input
                    className="length-bar"
                    type="range" 
                    min={8} 
                    max={64} 
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}/>
                <span>{length}</span>
            </div>

            <div className="generator-options">
                {NAMES.map(name => (
                    <label key={name}>
                        <input
                            type="checkbox"
                            checked={enabled[name]}
                            disabled={enabled[name] && active.length === 1}
                            onChange={() => setEnabled({ ...enabled, [name]: !enabled[name] })}
                        />
                        {name}
                    </label>
                ))}
            </div>

            <div className="generator-recent">
                <h4>Recent</h4>
                {recent.length === 0 && 
                    <p className="generator-empty">
                        Nothing generated yet
                    </p>
                }
                <ul>
                    {recent.map((password, i) => (
                        <li key={i}>
                            <code>{password}</code>
                            <button className="btn small" onClick={() => navigator.clipboard.writeText(password)}
                            >
                                Copy
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        )
}

export default PasswordGenerator;