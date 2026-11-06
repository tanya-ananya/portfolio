import ShiftBackground from './components/ShiftBackground';

export default function App() {
  return (
    <>
      <ShiftBackground />
      <div className="grain" aria-hidden="true" />
      <main style={{ position: 'relative' }}>
        {/* your Hero, Projects, etc. */}
      </main>
    </>
  );
}