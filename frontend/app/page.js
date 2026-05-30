'use client';
import { useState, useEffect, useRef } from 'react';

export default function Dashboard() {
    const [description, setDescription] = useState('');
    const [epicData, setEpicData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [wsMessages, setWsMessages] = useState([]);
    const ws = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        ws.current = new WebSocket('ws://localhost:8000/ws');
        
        ws.current.onmessage = (event) => {
            setWsMessages(prev => [...prev, event.data]);
        };
        
        return () => {
            if (ws.current) ws.current.close();
        };
    }, []);

    const generateEpic = async () => {
        if (!description.trim()) return;
        
        setIsLoading(true);
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(`Started epic generation process...`);
        }

        try {
            const res = await fetch('http://localhost:8000/api/generate-epic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project_description: description })
            });
            const data = await res.json();
            setEpicData(data);
            
            if (ws.current?.readyState === WebSocket.OPEN) {
                ws.current.send(`Successfully generated AI tasks for project context`);
            }
        } catch (err) {
            console.error("API Error: ", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '3rem', fontFamily: 'system-ui, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ color: '#111827' }}>DevSprint AI Dashboard ⚡</h1>
            <p style={{ color: '#4B5563', marginBottom: '2rem' }}>Enter a project description to generate epics and sprint tasks.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. A fintech payment dashboard with user roles and stripe integration..."
                    style={{ width: '100%', height: '120px', padding: '1rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
                <button 
                    onClick={generateEpic} 
                    disabled={isLoading}
                    style={{ 
                        padding: '0.75rem 1.5rem', 
                        backgroundColor: isLoading ? '#9CA3AF' : '#2563EB', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        alignSelf: 'flex-start'
                    }}>
                    {isLoading ? 'Generating via LLM...' : 'Generate AI Epics'}
                </button>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ flex: 2 }}>
                    {epicData && (
                        <div style={{ backgroundColor: 'white', border: '1px solid #E5E7EB', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            <h2 style={{ marginTop: 0, color: '#1F2937' }}>{epicData.epic}</h2>
                            
                            <h3 style={{ color: '#374151' }}>User Stories</h3>
                            <ul style={{ paddingLeft: '1.5rem', color: '#4B5563' }}>
                                {epicData.user_stories.map((story, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{story}</li>)}
                            </ul>
                            
                            <h3 style={{ color: '#374151', marginTop: '1.5rem' }}>Sprint Tasks</h3>
                            <ul style={{ paddingLeft: '1.5rem', color: '#4B5563' }}>
                                {epicData.sprint_tasks.map((task, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{task}</li>)}
                            </ul>
                        </div>
                    )}
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ backgroundColor: '#1F2937', color: '#F3F4F6', padding: '1.5rem', borderRadius: '8px', height: '100%' }}>
                        <h3 style={{ marginTop: 0, borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>Real-time Logs (WebSocket)</h3>
                        <ul style={{ listStyleType: 'none', padding: 0, fontSize: '0.875rem' }}>
                            {wsMessages.length === 0 && <li style={{ color: '#9CA3AF' }}>Awaiting events...</li>}
                            {wsMessages.map((msg, i) => (
                                <li key={i} style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                    <span>🟢</span> <span>{msg}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
