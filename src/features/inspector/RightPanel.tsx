import { useStore } from '@/store/useStore';
import { AppList } from '@/features/apps/AppList';
import { NodeInspector } from '@/features/inspector/NodeInspector';

export function RightPanel() {
    const selectedNodeId = useStore((state) => state.selectedNodeId);

    return (
        <div className="h-full flex flex-col bg-background">
            {selectedNodeId ? <NodeInspector nodeId={selectedNodeId} /> : <AppList />}
        </div>
    );
}
