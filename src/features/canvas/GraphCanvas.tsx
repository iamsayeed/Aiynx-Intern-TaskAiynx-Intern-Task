import { useCallback, useEffect } from 'react';
import {
    ReactFlow, Background, Controls, BackgroundVariant,
    useNodesState, useEdgesState,
    type OnSelectionChangeParams,
    useReactFlow,
    type Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ServiceNode, type ServiceNodeData } from './ServiceNode';
import { useActions, useStore } from '@/store/useStore';
import { useGraph } from '@/hooks/useQueries';
import { Loader2 } from 'lucide-react';

const nodeTypes = {
    service: ServiceNode,
};

export function GraphCanvas() {
    const [nodes, setNodes, onNodesChange] = useNodesState<ServiceNodeData>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const selectedAppId = useStore((state) => state.selectedAppId);
    const { setSelectedNodeId } = useActions();
    const { data: graphData, isLoading } = useGraph(selectedAppId);
    const { } = useReactFlow();

    // Sync Graph Data
    useEffect(() => {
        if (graphData) {
            setNodes(graphData.nodes);
            setEdges(graphData.edges);
            // Fit view after a tick to allow rendering
            setTimeout(() => {
                // This is a bit hacky, normally fitView prop handles it on mount, 
                // but for dynamic updates we might need useReactFlow().fitView()
            }, 100);
        }
    }, [graphData, setNodes, setEdges]);

    // Sync Selection
    const onSelectionChange = useCallback(({ nodes }: OnSelectionChangeParams) => {
        if (nodes.length > 0) {
            setSelectedNodeId(nodes[0].id);
        } else {
            setSelectedNodeId(null);
        }
    }, [setSelectedNodeId]);

    if (isLoading) {
        return <div className="h-full w-full flex items-center justify-center bg-muted/5"><Loader2 className="animate-spin text-muted-foreground" /></div>;
    }

    if (!selectedAppId) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center bg-muted/5 text-muted-foreground">
                <p>Select an App from the Right Panel</p>
            </div>
        )
    }

    return (
        <div className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onSelectionChange={onSelectionChange}
                nodeTypes={nodeTypes}
                fitView
                className="bg-muted/5"
            >
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                <Controls />
            </ReactFlow>
        </div>
    );
}
