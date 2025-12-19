import { MainLayout } from '@/components/layout/MainLayout';
import { GraphCanvas } from '@/features/canvas/GraphCanvas';
import { ReactFlowProvider } from '@xyflow/react';
import { RightPanel } from '@/features/inspector/RightPanel';

function App() {
  return (
    <ReactFlowProvider>
      <MainLayout
        rightPanel={<RightPanel />}
      >
        <GraphCanvas />
      </MainLayout>
    </ReactFlowProvider>
  );
}

export default App;
