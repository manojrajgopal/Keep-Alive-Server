import { updateProject, deleteProject } from "../services/api";

export default function ProjectRow({ project, onUpdate }) {
  function getStatus() {
    if (!project.enabled) return "STOPPED";
    if (!project.last_ping_time) return "WAITING";
    if (project.last_status_code === 200) return "RUNNING";
    return "ERROR";
  }

  function getStatusColor() {
    const status = getStatus();
    switch (status) {
      case "RUNNING":
        return "#10b981";
      case "WAITING":
        return "#f59e0b";
      case "ERROR":
        return "#ef4444";
      case "STOPPED":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  }

  async function toggleEnabled() {
    await updateProject(project.id, {
      name: project.name,
      url: project.url,
      interval_seconds: project.interval_seconds,
      enabled: !project.enabled,
    });
    onUpdate();
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Delete project "${project.name}"?`
    );
    if (!confirmDelete) return;

    await deleteProject(project.id);
    onUpdate();
  }

  const status = getStatus();
  const statusColor = getStatusColor();

  return (
    <tr style={{
      backgroundColor: '#1e293b',
      borderBottom: '1px solid #334155',
      transition: 'background-color 0.2s',
    }}>
      <td style={{
        padding: '16px',
        color: '#f8fafc',
        fontWeight: '500',
      }}>{project.name}</td>
      <td style={{
        padding: '16px',
        color: '#cbd5e1',
        fontFamily: 'monospace',
        fontSize: '14px',
        maxWidth: '300px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>{project.url}</td>
      <td style={{
        padding: '16px',
        color: '#94a3b8',
        textAlign: 'center',
      }}>{project.interval_seconds}s</td>
      <td style={{
        padding: '16px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          borderRadius: '20px',
          backgroundColor: `${statusColor}20`,
          border: `1px solid ${statusColor}`,
          color: statusColor,
          fontSize: '14px',
          fontWeight: '600',
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: statusColor,
            animation: status === 'RUNNING' ? 'pulse 2s infinite' : 'none',
          }}></div>
          {status}
        </div>
      </td>
      <td style={{
        padding: '16px',
        textAlign: 'center',
      }}>
        <button 
          onClick={toggleEnabled}
          style={{
            padding: '8px 16px',
            backgroundColor: project.enabled ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s',
            minWidth: '80px',
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '0.9';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          {project.enabled ? "ACTIVE" : "INACTIVE"}
        </button>
      </td>
      <td style={{
        padding: '16px',
        textAlign: 'center',
      }}>
        <button 
          onClick={handleDelete}
          style={{
            padding: '8px 12px',
            backgroundColor: 'transparent',
            color: '#ef4444',
            border: '1px solid #ef4444',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#ef4444';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#ef4444';
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

// Add CSS animations for pulse effect
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;
document.head.appendChild(style);