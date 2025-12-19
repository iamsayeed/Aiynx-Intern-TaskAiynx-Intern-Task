import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { Cpu, HardDrive, MemoryStick } from 'lucide-react';

export type ServiceNodeData = Node<{
    label: string;
    status: 'healthy' | 'degraded' | 'down';
    cpu: number;
    memory: number;
    disk: number;
    region: string;
    icon?: string;
}>;

export function ServiceNode({ data, selected }: NodeProps<ServiceNodeData>) {
    return (
        <div
            className={cn(
                "w-[280px] rounded-xl border bg-card text-card-foreground shadow-sm transition-all",
                selected ? "ring-2 ring-primary border-primary" : "border-border"
            )}
        >
            {/* Header */}
            <div className="flex items-center gap-3 p-3 border-b bg-muted/30">
                <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                    {/* Placeholder for dynamic icon */}
                    <div className="size-4 bg-current rounded-sm" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{data.label}</div>
                    <div className="text-xs text-muted-foreground capitalize">{data.status}</div>
                </div>
            </div>

            {/* Content */}
            <div className="p-3 space-y-3">
                <StatRow icon={<Cpu size={14} />} label="CPU" value={data.cpu} />
                <StatRow icon={<MemoryStick size={14} />} label="Memory" value={data.memory} />
                <StatRow icon={<HardDrive size={14} />} label="Disk" value={data.disk} />
            </div>

            {/* Footer */}
            <div className="p-2 px-3 border-t bg-muted/10 flex justify-between items-center text-xs text-muted-foreground">
                <span>{data.region}</span>
                <span className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-medium border",
                    data.status === 'healthy' ? "bg-green-500/10 text-green-600 border-green-500/20" :
                        data.status === 'degraded' ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" :
                            "bg-red-500/10 text-red-600 border-red-500/20"
                )}>
                    {data.status === 'healthy' ? 'Success' : 'Error'}
                </span>
            </div>

            <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-muted-foreground" />
            <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-muted-foreground" />
            <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-muted-foreground" />
            <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-muted-foreground" />
        </div>
    );
}

function StatRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
    return (
        <div className="flex items-center gap-2 text-xs">
            <div className="text-muted-foreground">{icon}</div>
            <div className="w-12 text-muted-foreground">{label}</div>
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${value}%` }} />
            </div>
            <div className="w-8 text-right font-mono">{value.toFixed(1)}</div>
        </div>
    )
}
