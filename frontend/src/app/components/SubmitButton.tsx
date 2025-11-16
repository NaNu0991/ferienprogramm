import React from 'react';

const dotStyle: React.CSSProperties = {
    display: 'inline-block',
    margin: '0 2px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#666',
    animationName: 'bounce',
    animationDuration: '1.2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
};

const dotDelays = ['0s', '0.2s', '0.4s'];

export default function SubmitButton({ loading }: { loading: boolean }) {
    return (
        <button
            type="submit"
            style={{
                padding: '8px 16px',
                backgroundColor: loading ? '#ccc' : '#007bff',
                color: loading ? '#666' : 'white',
                border: 'none',
                borderRadius: 4,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s',
                display: 'flex',
                alignItems: 'center',
            }}
            disabled={loading}
        >
            {loading ? (
                <span style={{ display: 'flex', gap: 4 }}>
          {dotDelays.map((delay, i) => (
              <span key={i} style={{ ...dotStyle, animationDelay: delay }} />
          ))}
        </span>
            ) : (
                'Senden'
            )}
            <style>
                {`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: translateY(0);
              opacity: 0.3;
            }
            40% {
              transform: translateY(-6px);
              opacity: 1;
            }
          }
        `}
            </style>
        </button>
    );
}
