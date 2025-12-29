import ProjectRow from "./ProjectRow";

export default function ProjectTable({ projects, onUpdate }) {
  return (
    <div style={{
      backgroundColor: '#0f172a',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    }}>
      <div style={{
        padding: '24px',
        borderBottom: '1px solid #334155',
      }}>
        <h2 style={{
          color: '#f8fafc',
          fontSize: '24px',
          fontWeight: '700',
          margin: 0,
        }}>Active Projects</h2>
        <p style={{
          color: '#94a3b8',
          fontSize: '14px',
          marginTop: '8px',
          marginBottom: 0,
        }}>
          Monitor and manage your KeepAlive projects
        </p>
      </div>
      
      <div style={{
        overflowX: 'auto',
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '800px',
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#1e293b',
              borderBottom: '2px solid #334155',
            }}>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: '#cbd5e1',
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>Project Name</th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: '#cbd5e1',
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>URL</th>
              <th style={{
                padding: '16px',
                textAlign: 'center',
                color: '#cbd5e1',
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>Interval</th>
              <th style={{
                padding: '16px',
                textAlign: 'center',
                color: '#cbd5e1',
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>Status</th>
              <th style={{
                padding: '16px',
                textAlign: 'center',
                color: '#cbd5e1',
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>Status Control</th>
              <th style={{
                padding: '16px',
                textAlign: 'center',
                color: '#cbd5e1',
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <ProjectRow key={p.id} project={p} onUpdate={onUpdate} />
            ))}
          </tbody>
        </table>
      </div>
      
      {projects.length === 0 && (
        <div style={{
          padding: '48px 24px',
          textAlign: 'center',
          color: '#94a3b8',
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
          }}>📊</div>
          <h3 style={{
            color: '#f8fafc',
            fontSize: '18px',
            marginBottom: '8px',
          }}>No Projects Yet</h3>
          <p style={{
            color: '#94a3b8',
            fontSize: '14px',
          }}>Add your first project to start monitoring</p>
        </div>
      )}
    </div>
  );
}