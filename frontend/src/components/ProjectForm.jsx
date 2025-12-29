import { useState } from "react";
import { addProject } from "../services/api";

export default function ProjectForm({ onAdd }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [interval, setInterval] = useState(300);

  async function handleSubmit(e) {
    e.preventDefault();
    await addProject({
      name,
      url,
      interval_seconds: Number(interval),
    });
    setName("");
    setUrl("");
    setInterval(300);
    onAdd();
  }

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      maxWidth: '500px',
      margin: '0 auto',
    }}>
      <h3 style={{
        color: '#111827',
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '4px',
      }}>Add New Project</h3>
      <p style={{
        color: '#6b7280',
        fontSize: '14px',
        marginBottom: '24px',
      }}>
        Monitor your backend service with periodic health checks
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{
          marginBottom: '20px',
        }}>
          <label style={{
            display: 'block',
            color: '#374151',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '6px',
          }}>
            Project Name
          </label>
          <input
            placeholder="My Backend API"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: '#fff',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              color: '#111827',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.15s ease-in-out',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{
          marginBottom: '20px',
        }}>
          <label style={{
            display: 'block',
            color: '#374151',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '6px',
          }}>
            URL to Monitor
          </label>
          <input
            placeholder="https://example.com/health"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: '#fff',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              color: '#111827',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.15s ease-in-out',
              fontFamily: 'monospace',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{
          marginBottom: '24px',
        }}>
          <label style={{
            display: 'block',
            color: '#374151',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '6px',
          }}>
            Ping Interval (seconds)
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <input
              type="number"
              min="60"
              max="3600"
              step="60"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 12px',
                backgroundColor: '#fff',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                color: '#111827',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <span style={{
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: '500',
              minWidth: '40px',
            }}>
              {interval}s
            </span>
          </div>
          <p style={{
            color: '#6b7280',
            fontSize: '12px',
            marginTop: '6px',
            marginBottom: 0,
          }}>
            Recommended: 300 seconds (5 minutes)
          </p>
        </div>

        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '12px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#3b82f6';
          }}
        >
          Add Project
        </button>
      </form>

      <div style={{
        marginTop: '24px',
        paddingTop: '20px',
        borderTop: '1px solid #e5e7eb',
      }}>
        <h4 style={{
          color: '#111827',
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '8px',
        }}>💡 Tips</h4>
        <ul style={{
          color: '#6b7280',
          fontSize: '13px',
          paddingLeft: '18px',
          margin: 0,
          lineHeight: '1.5',
        }}>
          <li>Use dedicated health check endpoints</li>
          <li>Start with 5-minute intervals for testing</li>
          <li>Monitor critical API endpoints</li>
        </ul>
      </div>
    </div>
  );
}