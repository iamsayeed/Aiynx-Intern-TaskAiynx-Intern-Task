import { useEffect, useState } from 'react';
import { useReactFlow, useNodes } from '@xyflow/react';
import { type ServiceNodeData } from '@/features/canvas/ServiceNode';
import { useActions } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trash2 } from 'lucide-react';

interface NodeInspectorProps {
    nodeId: string;
}

export function NodeInspector({ nodeId }: NodeInspectorProps) {
    const { setNodes, deleteElements } = useReactFlow();
    const nodes = useNodes();
    const { setSelectedNodeId } = useActions();

    const node = nodes.find((n) => n.id === nodeId) as ServiceNodeData | undefined;

    // Local state for immediate feedback before persisting to node data
    const [cpu, setCpu] = useState(0);

    useEffect(() => {
        if (node) {
            setCpu(node.data.cpu || 0);
        }
    }, [node?.data.cpu]); // dependent on node data

    if (!node) return <div className="p-4">Node not found</div>;

    const updateNodeData = (updates: Partial<ServiceNodeData['data']>) => {
        setNodes((nds) =>
            nds.map((n) =>
                n.id === nodeId ? { ...n, data: { ...n.data, ...updates } } : n
            )
        );
    };

    const handleCpuChange = (val: number[]) => {
        const newVal = val[0];
        setCpu(newVal);
        updateNodeData({ cpu: newVal });
    };

    const handleCpuInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setCpu(val);
        updateNodeData({ cpu: val });
    };

    const handleDelete = () => {
        deleteElements({ nodes: [{ id: nodeId }] });
        setSelectedNodeId(null);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedNodeId(null)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1 font-semibold">{node.data.label}</div>
                <Badge variant="outline" className="capitalize">{node.data.status}</Badge>
            </div>

            <div className="flex-1 overflow-auto">
                <Tabs defaultValue="config" className="w-full">
                    <TabsList className="w-full grid grid-cols-2 rounded-none border-b bg-muted/40 p-0 h-10">
                        <TabsTrigger value="config" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background">Config</TabsTrigger>
                        <TabsTrigger value="runtime" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background">Runtime</TabsTrigger>
                    </TabsList>

                    <div className="p-4 space-y-6">
                        <TabsContent value="config" className="space-y-4 m-0">
                            <div className="grid gap-2">
                                <Label>Node Name</Label>
                                <Input
                                    value={node.data.label}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateNodeData({ label: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Region</Label>
                                <Input value={node.data.region} disabled />
                            </div>

                            <div className="pt-4 border-t">
                                <Button variant="destructive" className="w-full gap-2" onClick={handleDelete}>
                                    <Trash2 size={16} /> Delete Node
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="runtime" className="space-y-6 m-0">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>CPU Usage (%)</Label>
                                    <Input
                                        type="number"
                                        className="w-20 h-8 text-right font-mono"
                                        value={cpu}
                                        onChange={handleCpuInputChange}
                                        min={0}
                                        max={100}
                                    />
                                </div>
                                <Slider
                                    value={[cpu]}
                                    onValueChange={handleCpuChange}
                                    max={100}
                                    step={1}
                                    className="py-2"
                                />
                            </div>

                            {/* Other simulated metrics */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Memory</span>
                                    <span className="font-mono">{node.data.memory}%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: `${node.data.memory}%` }} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Disk</span>
                                    <span className="font-mono">{node.data.disk}%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500" style={{ width: `${node.data.disk}%` }} />
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
