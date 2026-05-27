import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import EmpresaDashboard from './pages/EmpresaDashboard';
import AgrupacionView from './pages/AgrupacionView';
import EquipoView from './pages/EquipoView';
import ColaboradorView from './pages/ColaboradorView';
import { PERIODOS } from './data/mockData';

function AppRoutes() {
  const [periodo, setPeriodo] = useState(PERIODOS[2]);
  const [compare, setCompare] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/resultados/empresa" replace />} />
      <Route
        path="/resultados/empresa"
        element={
          <AppLayout
            breadcrumbs={[]}
            compareEnabled={compare}
            onCompareToggle={setCompare}
            periodo={periodo}
            onPeriodoChange={setPeriodo}
          >
            <EmpresaDashboard periodo={periodo} compare={compare} />
          </AppLayout>
        }
      />
      <Route
        path="/resultados/agrupacion/:id"
        element={
          <AppLayoutWrapper compare={compare} setCompare={setCompare} periodo={periodo} setPeriodo={setPeriodo}>
            <AgrupacionView periodo={periodo} compare={compare} />
          </AppLayoutWrapper>
        }
      />
      <Route
        path="/resultados/equipo/:id"
        element={
          <AppLayoutWrapper compare={compare} setCompare={setCompare} periodo={periodo} setPeriodo={setPeriodo}>
            <EquipoView periodo={periodo} compare={compare} />
          </AppLayoutWrapper>
        }
      />
      <Route
        path="/resultados/colaborador/:id"
        element={
          <AppLayoutWrapper compare={compare} setCompare={setCompare} periodo={periodo} setPeriodo={setPeriodo}>
            <ColaboradorView periodo={periodo} compare={compare} />
          </AppLayoutWrapper>
        }
      />
      <Route path="*" element={<Navigate to="/resultados/empresa" replace />} />
    </Routes>
  );
}

function AppLayoutWrapper({
  children,
  compare,
  setCompare,
  periodo,
  setPeriodo,
}: {
  children: React.ReactNode;
  compare: boolean;
  setCompare: (v: boolean) => void;
  periodo: string;
  setPeriodo: (p: string) => void;
}) {
  return (
    <AppLayout
      breadcrumbs={[]}
      compareEnabled={compare}
      onCompareToggle={setCompare}
      periodo={periodo}
      onPeriodoChange={setPeriodo}
    >
      {children}
    </AppLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
