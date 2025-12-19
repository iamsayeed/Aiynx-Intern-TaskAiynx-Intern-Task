import { http, HttpResponse, delay } from 'msw';

const apps = [
    { id: 'app-1', name: 'E-Commerce Platform', status: 'healthy', region: 'us-east-1' },
    { id: 'app-2', name: 'Analytics Dashboard', status: 'degraded', region: 'eu-west-1' },
    { id: 'app-3', name: 'User Management', status: 'healthy', region: 'us-west-2' },
];

const graphs: Record<string, any> = {
    'app-1': {
        nodes: [
            { id: '1', type: 'service', position: { x: 250, y: 5 }, data: { label: 'Gateway', status: 'healthy', cpu: 20, memory: 30, disk: 10, region: 'us-east-1' } },
            { id: '2', type: 'service', position: { x: 100, y: 200 }, data: { label: 'Auth', status: 'healthy', cpu: 15, memory: 40, disk: 20, region: 'us-east-1' } },
            { id: '3', type: 'service', position: { x: 400, y: 200 }, data: { label: 'Payment', status: 'healthy', cpu: 35, memory: 55, disk: 40, region: 'us-east-1' } },
            { id: '4', type: 'service', position: { x: 250, y: 400 }, data: { label: 'Database', status: 'healthy', cpu: 60, memory: 80, disk: 70, region: 'us-east-1' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e1-3', source: '1', target: '3', animated: true },
            { id: 'e2-4', source: '2', target: '4', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true },
        ]
    },
    'app-2': {
        nodes: [
            { id: '1', type: 'service', position: { x: 250, y: 100 }, data: { label: 'Data Ingest', status: 'degraded', cpu: 90, memory: 85, disk: 60, region: 'eu-west-1' } },
            { id: '2', type: 'service', position: { x: 250, y: 300 }, data: { label: 'Processing', status: 'healthy', cpu: 55, memory: 40, disk: 30, region: 'eu-west-1' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
        ]
    },
    'app-3': {
        nodes: [
            { id: '1', type: 'service', position: { x: 300, y: 200 }, data: { label: 'User API', status: 'healthy', cpu: 10, memory: 20, disk: 5, region: 'us-west-2' } },
        ],
        edges: []
    }
};

export const handlers = [
    http.get('/api/apps', async () => {
        await delay(800); // Simulate network latency
        return HttpResponse.json(apps);
    }),

    http.get('/api/apps/:appId/graph', async ({ params }) => {
        await delay(600);
        const { appId } = params;
        const graph = graphs[appId as string];

        if (!graph) {
            return new HttpResponse(null, { status: 404 });
        }

        return HttpResponse.json(graph);
    }),
];
