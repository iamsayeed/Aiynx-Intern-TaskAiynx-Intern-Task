import { useQuery } from '@tanstack/react-query';
import { type Edge } from '@xyflow/react';
import { type ServiceNodeData } from '@/features/canvas/ServiceNode';

export interface AppInfo {
    id: string;
    name: string;
    status: 'healthy' | 'degraded' | 'down';
    region: string;
}

export interface GraphData {
    nodes: ServiceNodeData[];
    edges: Edge[];
}

export function useApps() {
    return useQuery<AppInfo[]>({
        queryKey: ['apps'],
        queryFn: async () => {
            const res = await fetch('/api/apps');
            if (!res.ok) throw new Error('Failed to fetch apps');
            return res.json();
        }
    });
}

export function useGraph(appId: string | null) {
    return useQuery<GraphData>({
        queryKey: ['graph', appId],
        queryFn: async () => {
            if (!appId) throw new Error('No app selected');
            const res = await fetch(`/api/apps/${appId}/graph`);
            if (!res.ok) throw new Error('Failed to fetch graph');
            return res.json();
        },
        enabled: !!appId,
    });
}
