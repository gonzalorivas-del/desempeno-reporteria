import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import EmpresaDashboard from './pages/EmpresaDashboard';
import AgrupacionView from './pages/AgrupacionView';
import EquipoView from './pages/EquipoView';
import ColaboradorView from './pages/ColaboradorView';
import HistoricoView from './pages/HistoricoView';
import { EMPRESAS, getEmpresaById } from './data/mockData';

function AppRoutes() {
  const defaultEmpresa = EMPRESAS[0]; // 'all'
  const [empresaId, setEmpresaId] = useState(defaultEmpresa.id);
  const [periodo, setPeriodo] = useState(() => {
    const periodos = defaultEmpresa.periodos;
    return periodos[periodos.length - 1];
  });
  const [compare, setCompare] = useState(false);

  function handleEmpresaChange(id: string) {
    setEmpresaId(id);
    const empresa = getEmpresaById(id);
    const periodos = empresa.periodos;
    setPeriodo(periodos[periodos.length - 1]);
  }

  const layoutProps = {
    compareEnabled: compare,
    onCompareToggle: setCompare,
    periodo,
    onPeriodoChange: setPeriodo,
    empresaId,
    onEmpresaChange: handleEmpresaChange,
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/resultados/empresa" replace />} />
      <Route
        path="/resultados/empresa"
        element={
          <AppLayout {...layoutProps} breadcrumbs={[]}>
            <EmpresaDashboard periodo={periodo} compare={compare} empresaId={empresaId} />
          </AppLayout>
        }
      />
      <Route
        path="/resultados/agrupacion/:id"
        element={
          <AppLayout {...layoutProps} breadcrumbs={[]}>
            <AgrupacionView periodo={periodo} compare={compare} />
          </AppLayout>
        }
      />
      <Route
        path="/resultados/equipo/:id"
        element={
          <AppLayout {...layoutProps} breadcrumbs={[]}>
            <EquipoView periodo={periodo} compare={compare} />
          </AppLayout>
        }
      />
      <Route
        path="/resultados/colaborador/:id"
        element={
          <AppLayout {...layoutProps} breadcrumbs={[]}>
            <ColaboradorView periodo={periodo} compare={compare} />
          </AppLayout>
        }
      />
      <Route
        path="/resultados/historico"
        element={
          <AppLayout {...layoutProps} breadcrumbs={[]}>
            <HistoricoView empresaId={empresaId} />
          </AppLayout>
        }
      />
      <Route path="*" element={<Navigate to="/resultados/empresa" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
