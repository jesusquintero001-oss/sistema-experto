import { useState } from 'react';
import { knowledgeBase } from './knowledgeBase';

export default function App() {
  const [currentStep, setCurrentStep] = useState<string>('start');
  const [result, setResult] = useState<{ diagnosis?: string; solution?: string } | null>(null);

  const node = knowledgeBase[currentStep];

  const handleSelect = (option: typeof node.options[0]) => {
    if (option.diagnosis) {
      setResult({ diagnosis: option.diagnosis, solution: option.solution });
    } else if (option.nextStep) {
      setCurrentStep(option.nextStep);
    }
  };

  const handleReset = () => {
    setCurrentStep('start');
    setResult(null);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '500px', width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', color: '#60a5fa', marginBottom: '24px' }}>
          💻 Sistema Experto: Diagnóstico de PC
        </h1>

        {!result ? (
          <div>
            <p style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#cbd5e1' }}>{node?.symptom}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {node?.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(option)}
                  style={{ width: '100%', textAlign: 'left', padding: '14px', borderRadius: '10px', backgroundColor: '#334155', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px' }}>
              <h3 style={{ color: '#fbbf24', fontSize: '0.85rem', textTransform: 'uppercase', margin: 0 }}>Diagnóstico Detectado</h3>
              <p style={{ marginTop: '8px', marginBottom: 0, color: '#e2e8f0', fontWeight: '500' }}>{result.diagnosis}</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px' }}>
              <h3 style={{ color: '#34d399', fontSize: '0.85rem', textTransform: 'uppercase', margin: 0 }}>Solución Sugerida</h3>
              <p style={{ marginTop: '8px', marginBottom: 0, color: '#e2e8f0', fontWeight: '500' }}>{result.solution}</p>
            </div>
            <button
              onClick={handleReset}
              style={{ width: '100%', marginTop: '12px', padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
            >
              Iniciar Nuevo Diagnóstico
            </button>
          </div>
        )}
      </div>
    </div>
  );
}