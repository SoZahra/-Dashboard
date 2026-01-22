import { useState, useEffect } from 'react';
import { createDocument } from './services/api.tsx';
import type { Document, DocumentStats, DocumentStatusType } from './types.ts';
import { API_URL } from './services/api.tsx';
// import reactLogo from './assets/react.svg'

import './App.css'

function App() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [fileName, setFileName] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [stats, setStats] = useState<DocumentStats[]>([]);

  const loadData = async () => {
    try {
      // On lance les deux appels en parallèle pour plus d'efficacite
      const [docsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}`),
        fetch(`${API_URL}/stats`)
      ]);

      const docsData = await docsRes.json();
      const statsData = await statsRes.json();

      setDocuments(docsData);
      setStats(statsData);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDocument({ fileName, pageCount: Number(pageCount), metadata: { source: 'manual' } });
    setFileName('');
    setPageCount(0);
    loadData(); // Rafraichir la liste apres l'ajout
  };

    const handleToggleStatus = async (id: number, currentStatus: DocumentStatusType) => {
    const nextStatus = currentStatus === 'PENDING' ? 'PROCESSED' : 'ARCHIVED';
    
    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus }),
    });
    
    loadData(); // On rafraichit tout (liste + stats)
  };

return (
  <div className="container">
    <h1>Dashboard</h1>

    {/* Section Statistiques */}
    <div className="stats-bar" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
      {stats.map((s) => (
        <div key={s.status} className={`status-badge ${s.status}`}>
          {s.status} : {s.total_pages} pages
        </div>
      ))}
    </div>
    
    <form onSubmit={handleSubmit} className="form-container">
      <input 
        placeholder="Nom du fichier..." 
        value={fileName} 
        onChange={(e) => setFileName(e.target.value)} 
        required 
        style={{ flex: 2 }}
      />
      <input 
        type="number" 
        placeholder="Pages" 
        value={pageCount || ''} 
        onChange={(e) => setPageCount(Number(e.target.value))} 
        required 
        style={{ flex: 1 }}
      />
      <button type="submit">Ajouter le document</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Fichier</th>
          <th>Pages</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc: Document) => (
          <tr key={doc.id}>
            <td style={{ fontWeight: 500 }}>{doc.fileName}</td>
            <td>{doc.pageCount}</td>
            <td>
              <span className={`status-badge ${doc.status}`}>{doc.status}</span>
            </td>
            <td>
              {doc.status !== 'ARCHIVED' && (
                <button 
                  onClick={() => handleToggleStatus(doc.id, doc.status)}
                  style={{ height: '32px', padding: '0 12px', fontSize: '12px', backgroundColor: '#6c757d' }}
                >
                  Suivant
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default App
